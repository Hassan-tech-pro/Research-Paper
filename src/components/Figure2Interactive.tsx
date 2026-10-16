import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface BarItem {
  id: string;
  label: string;
  sublabel: string;
  value: number;
  category: 'base' | 'heuristic' | 'rule' | 'model';
  color: string;
  description: string;
}

const BARS: BarItem[] = [
  {
    id: 'base-may',
    label: 'Base rate',
    sublabel: 'May (dev)',
    value: 0.416,
    category: 'base',
    color: '#D1D5DB', // light gray
    description: 'Historical baseline decline rate during model training and cross-validation across 16,513 items.',
  },
  {
    id: 'base-june',
    label: 'Base rate',
    sublabel: 'June (sealed)',
    value: 0.655,
    category: 'base',
    color: '#9CA3AF', // medium gray
    description: 'Drastic upward shift in natural click decline (+23.9 percentage points) across 19,432 items.',
  },
  {
    id: 'naive',
    label: 'Naive "dipping"',
    sublabel: 'heuristic',
    value: 0.780,
    category: 'heuristic',
    color: '#4B5563', // dark gray
    description: 'Pages already dipping in feature months continued falling under the June market-wide decline wave.',
  },
  {
    id: 'rule',
    label: 'Frozen rule',
    sublabel: '(audited spike)',
    value: 0.380,
    category: 'rule',
    color: '#6B7280', // muted gray
    description: 'The spike rule collapsed to 0.380 (27.5 points below the shifted base rate) because prior spikes did not predict this widespread decline.',
  },
  {
    id: 'model',
    label: 'Model',
    sublabel: '(dev-trained HGB)',
    value: 0.740,
    category: 'model',
    color: '#18181B', // deep black
    description: 'HistGradientBoosting achieved 0.740 (+8.5 points above the shifted base rate), demonstrating positive rank discrimination under severe drift.',
  },
];

export const Figure2Interactive: React.FC = () => {
  const [activeBar, setActiveBar] = useState<BarItem>(BARS[4]); // default to model
  const [showDriftOverlay, setShowDriftOverlay] = useState<boolean>(true);

  // SVG Chart dimensions
  const svgWidth = 600;
  const svgHeight = 270;
  const padding = { top: 35, right: 30, bottom: 50, left: 50 };
  const chartHeight = svgHeight - padding.top - padding.bottom;
  const chartWidth = svgWidth - padding.left - padding.right;

  const barWidth = 62;
  const barGap = (chartWidth - barWidth * BARS.length) / (BARS.length + 1);

  const scaleY = (val: number) => padding.top + (1 - val / 1.0) * chartHeight;

  // Drift threshold: 0.416 ± 0.10 => [0.316, 0.516]
  const driftUpperY = scaleY(0.516);
  const driftLowerY = scaleY(0.316);

  return (
    <figure className="my-8 bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
            Interactive Figure 2
          </span>
          <h4 className="text-base font-serif font-semibold text-stone-900 mt-0.5">
            Precision@50 & Base Rates on Sealed June 2026 Month
          </h4>
        </div>

        <button
          onClick={() => setShowDriftOverlay(!showDriftOverlay)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            showDriftOverlay
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
          }`}
        >
          {showDriftOverlay ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Drift Guard Active (±0.10)</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Show Drift Guard</span>
            </>
          )}
        </button>
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto py-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[600px] mx-auto select-none"
          role="img"
          aria-label="Bar chart showing Precision@50 and base rates on sealed June 2026 month"
        >
          {/* Drift Guard Tolerance Band (0.316 to 0.516) */}
          {showDriftOverlay && (
            <g>
              <rect
                x={padding.left}
                y={driftUpperY}
                width={chartWidth}
                height={driftLowerY - driftUpperY}
                fill="#FEF3C7"
                opacity="0.45"
              />
              <line
                x1={padding.left}
                y1={driftUpperY}
                x2={padding.left + chartWidth}
                y2={driftUpperY}
                stroke="#D97706"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <line
                x1={padding.left}
                y1={driftLowerY}
                x2={padding.left + chartWidth}
                y2={driftLowerY}
                stroke="#D97706"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text
                x={padding.left + 8}
                y={driftUpperY - 4}
                className="text-[10px] font-sans font-medium fill-amber-800"
              >
                Safe Base Rate Zone (0.416 ± 0.10)
              </text>
            </g>
          )}

          {/* Grid lines and Y-axis ticks */}
          {[0.0, 0.2, 0.4, 0.6, 0.8, 1.0].map((tick) => (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={scaleY(tick)}
                x2={padding.left + chartWidth}
                y2={scaleY(tick)}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={scaleY(tick) + 4}
                textAnchor="end"
                className="text-[11px] font-mono tabular-nums fill-stone-500"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Y-axis Title */}
          <text
            x={-padding.top - chartHeight / 2}
            y={14}
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[11px] font-sans fill-stone-700 font-medium"
          >
            Precision@50 / Base Rate
          </text>

          {/* Bars */}
          {BARS.map((bar, idx) => {
            const barX = padding.left + barGap + idx * (barWidth + barGap);
            const barY = scaleY(bar.value);
            const bHeight = scaleY(0) - barY;
            const isSelected = activeBar.id === bar.id;

            return (
              <g
                key={bar.id}
                className="cursor-pointer transition-opacity hover:opacity-90"
                onClick={() => setActiveBar(bar)}
              >
                {/* Value on top of bar */}
                <text
                  x={barX + barWidth / 2}
                  y={barY - 7}
                  textAnchor="middle"
                  className="text-[11px] font-mono font-bold fill-stone-800 tabular-nums"
                >
                  {bar.value.toFixed(3)}
                </text>

                {/* Bar rectangle */}
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={bHeight}
                  fill={bar.color}
                  rx="3"
                  className={isSelected ? 'stroke-2 stroke-blue-600' : 'stroke-0'}
                />

                {/* X labels */}
                <text
                  x={barX + barWidth / 2}
                  y={padding.top + chartHeight + 15}
                  textAnchor="middle"
                  className="text-[10px] font-sans font-medium fill-stone-800"
                >
                  {bar.label}
                </text>
                <text
                  x={barX + barWidth / 2}
                  y={padding.top + chartHeight + 27}
                  textAnchor="middle"
                  className="text-[9.5px] font-sans fill-stone-500"
                >
                  {bar.sublabel}
                </text>
              </g>
            );
          })}

          {/* Baseline horizontal axis */}
          <line
            x1={padding.left}
            y1={scaleY(0)}
            x2={padding.left + chartWidth}
            y2={scaleY(0)}
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Selected Item Detail Card */}
      <div className="mt-3 p-3.5 bg-stone-50 border border-stone-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-xs inline-block"
              style={{ backgroundColor: activeBar.color }}
            />
            <span className="text-xs font-bold text-stone-900">
              {activeBar.label} {activeBar.sublabel}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
            {(activeBar.value * 100).toFixed(1)}% ({activeBar.value.toFixed(3)})
          </span>
        </div>
        <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{activeBar.description}</p>
      </div>

      {/* Drift Check Circuit Breaker Explanation */}
      <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Drift Guard Protocol In Action:</strong> The sealed June base rate (0.655) shifted
          by <span className="font-mono font-semibold">+0.239</span> away from the development base rate
          (0.416). Because this exceeded the proposed safety threshold of{' '}
          <span className="font-mono font-semibold">±0.10</span>, the automated pipeline would have
          halted production deployment and flagged the cohort for manual audit prior to dispatching
          recommendations to editorial teams.
        </div>
      </div>

      <figcaption className="text-xs font-serif text-stone-600 mt-3 pt-2 border-t border-stone-100 leading-relaxed">
        <strong>Figure 2.</strong> Precision@50 and base rates on the sealed June 2026 month (19,432
        eligible items across 37 clients), computed once after development was frozen. Precision values
        must be interpreted strictly relative to the shifted base rate.
      </figcaption>
    </figure>
  );
};
