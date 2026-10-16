import React, { useState } from 'react';
import { QueueDepthPoint } from '../types';

const DATA_POINTS: QueueDepthPoint[] = [
  { k: 10, modelPrecision: 0.52, rulePrecision: 0.38, baseRate: 0.416, modelDeclinersFound: 5.2, ruleDeclinersFound: 3.8, isMeasuredPoint: true },
  { k: 20, modelPrecision: 0.512, rulePrecision: 0.381, baseRate: 0.416, modelDeclinersFound: 10.2, ruleDeclinersFound: 7.6 },
  { k: 30, modelPrecision: 0.510, rulePrecision: 0.384, baseRate: 0.416, modelDeclinersFound: 15.3, ruleDeclinersFound: 11.5, isMeasuredPoint: true },
  { k: 50, modelPrecision: 0.504, rulePrecision: 0.384, baseRate: 0.416, modelDeclinersFound: 25.2, ruleDeclinersFound: 19.2, isMeasuredPoint: true },
  { k: 75, modelPrecision: 0.490, rulePrecision: 0.401, baseRate: 0.416, modelDeclinersFound: 36.8, ruleDeclinersFound: 30.1, isMeasuredPoint: true },
  { k: 100, modelPrecision: 0.470, rulePrecision: 0.450, baseRate: 0.416, modelDeclinersFound: 47.0, ruleDeclinersFound: 45.0, isMeasuredPoint: true },
  { k: 150, modelPrecision: 0.440, rulePrecision: 0.490, baseRate: 0.416, modelDeclinersFound: 66.0, ruleDeclinersFound: 73.5, isMeasuredPoint: true },
  { k: 200, modelPrecision: 0.430, rulePrecision: 0.480, baseRate: 0.416, modelDeclinersFound: 86.0, ruleDeclinersFound: 96.0, isMeasuredPoint: true },
];

export const Figure1Interactive: React.FC = () => {
  const [selectedK, setSelectedK] = useState<number>(50);

  const currentPoint =
    DATA_POINTS.find((p) => p.k === selectedK) ||
    DATA_POINTS.reduce((prev, curr) =>
      Math.abs(curr.k - selectedK) < Math.abs(prev.k - selectedK) ? curr : prev
    );

  // SVG dimensions
  const svgWidth = 620;
  const svgHeight = 280;
  const padding = { top: 30, right: 30, bottom: 45, left: 55 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Scales
  const minK = 10;
  const maxK = 200;
  const minP = 0.30;
  const maxP = 0.60;

  const scaleX = (k: number) => padding.left + ((k - minK) / (maxK - minK)) * graphWidth;
  const scaleY = (p: number) => padding.top + (1 - (p - minP) / (maxP - minP)) * graphHeight;

  // Build SVG paths
  const modelPath = DATA_POINTS.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.k)} ${scaleY(p.modelPrecision)}`
  ).join(' ');

  const rulePath = DATA_POINTS.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.k)} ${scaleY(p.rulePrecision)}`
  ).join(' ');

  const shadedWidth = scaleX(75) - scaleX(10);

  return (
    <figure className="my-8 bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
            Interactive Figure 1
          </span>
          <h4 className="text-base font-serif font-semibold text-stone-900 mt-0.5">
            Mean Precision@K Across Client-Grouped Folds
          </h4>
        </div>

        {/* Preset K selector */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0">
          {[10, 30, 50, 75, 100, 150, 200].map((kVal) => (
            <button
              key={kVal}
              onClick={() => setSelectedK(kVal)}
              className={`px-2.5 py-1 text-xs font-sans font-medium rounded-md transition-colors ${
                selectedK === kVal
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              K={kVal}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="w-full overflow-x-auto py-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[620px] mx-auto select-none"
          role="img"
          aria-label="Precision@K curve chart comparing HistGradientBoosting vs Frozen Rule"
        >
          {/* Shaded Region K <= 75 */}
          <rect
            x={scaleX(10)}
            y={padding.top}
            width={shadedWidth}
            height={graphHeight}
            fill="#F3F4F6"
            opacity="0.65"
          />
          <text
            x={scaleX(10) + shadedWidth / 2}
            y={padding.top + 16}
            textAnchor="middle"
            className="text-[11px] font-sans fill-stone-500 font-medium"
          >
            Model Advantage Zone (K ≤ 75)
          </text>

          {/* Grid lines and Y-axis ticks */}
          {[0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60].map((tick) => (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={scaleY(tick)}
                x2={svgWidth - padding.right}
                y2={scaleY(tick)}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray={tick === 0.416 ? '4,4' : undefined}
              />
              <text
                x={padding.left - 8}
                y={scaleY(tick) + 4}
                textAnchor="end"
                className="text-[11px] font-mono tabular-nums fill-stone-500"
              >
                {tick.toFixed(2)}
              </text>
            </g>
          ))}

          {/* Base rate reference line */}
          <line
            x1={padding.left}
            y1={scaleY(0.416)}
            x2={svgWidth - padding.right}
            y2={scaleY(0.416)}
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
          <text
            x={svgWidth - padding.right - 4}
            y={scaleY(0.416) - 5}
            textAnchor="end"
            className="text-[10px] font-mono fill-stone-600 font-semibold"
          >
            Base rate (0.416)
          </text>

          {/* X-axis ticks */}
          {[10, 30, 50, 75, 100, 150, 200].map((kVal) => (
            <g key={kVal}>
              <line
                x1={scaleX(kVal)}
                y1={padding.top + graphHeight}
                x2={scaleX(kVal)}
                y2={padding.top + graphHeight + 5}
                stroke="#9CA3AF"
                strokeWidth="1"
              />
              <text
                x={scaleX(kVal)}
                y={padding.top + graphHeight + 18}
                textAnchor="middle"
                className="text-[11px] font-mono tabular-nums fill-stone-600"
              >
                {kVal}
              </text>
            </g>
          ))}

          {/* Axis Labels */}
          <text
            x={padding.left + graphWidth / 2}
            y={svgHeight - 6}
            textAnchor="middle"
            className="text-[12px] font-sans fill-stone-700 font-medium"
          >
            Queue Depth K (Content rows reviewed per month)
          </text>
          <text
            x={-padding.top - graphHeight / 2}
            y={16}
            transform="rotate(-90)"
            textAnchor="middle"
            className="text-[12px] font-sans fill-stone-700 font-medium"
          >
            Precision@K
          </text>

          {/* Series Paths */}
          <path
            d={modelPath}
            fill="none"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={rulePath}
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeDasharray="5,4"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {DATA_POINTS.map((p) => {
            const isSelected = p.k === currentPoint.k;
            return (
              <g key={p.k} className="cursor-pointer" onClick={() => setSelectedK(p.k)}>
                {/* Model point (circle) */}
                <circle
                  cx={scaleX(p.k)}
                  cy={scaleY(p.modelPrecision)}
                  r={isSelected ? 6 : 4}
                  fill="#18181B"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                {/* Rule point (square) */}
                <rect
                  x={scaleX(p.k) - (isSelected ? 5 : 3.5)}
                  y={scaleY(p.rulePrecision) - (isSelected ? 5 : 3.5)}
                  width={isSelected ? 10 : 7}
                  height={isSelected ? 10 : 7}
                  fill="#6B7280"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Highlight indicator vertical line */}
          <line
            x1={scaleX(currentPoint.k)}
            y1={padding.top}
            x2={scaleX(currentPoint.k)}
            y2={padding.top + graphHeight}
            stroke="#2563EB"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        </svg>
      </div>

      {/* Legend & Current Depth Metric Inspector */}
      <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Model status */}
        <div className="bg-stone-50 rounded-lg p-3 border border-stone-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-stone-900 inline-block" />
            <span className="text-xs font-semibold text-stone-800">
              HistGradientBoosting (Learned)
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xs text-stone-500">Precision@{currentPoint.k}:</span>
            <span className="text-sm font-mono font-bold text-stone-900 tabular-nums">
              {(currentPoint.modelPrecision * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-baseline justify-between text-xs text-stone-600 mt-0.5">
            <span>Expected decliners caught:</span>
            <span className="font-mono font-medium text-stone-900 tabular-nums">
              {currentPoint.modelDeclinersFound.toFixed(1)} / {currentPoint.k}
            </span>
          </div>
        </div>

        {/* Rule status */}
        <div className="bg-stone-50 rounded-lg p-3 border border-stone-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-stone-500 inline-block" />
            <span className="text-xs font-semibold text-stone-800">
              Frozen Spike Rule (Baseline)
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xs text-stone-500">Precision@{currentPoint.k}:</span>
            <span className="text-sm font-mono font-bold text-stone-900 tabular-nums">
              {(currentPoint.rulePrecision * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-baseline justify-between text-xs text-stone-600 mt-0.5">
            <span>Expected decliners caught:</span>
            <span className="font-mono font-medium text-stone-900 tabular-nums">
              {currentPoint.ruleDeclinersFound.toFixed(1)} / {currentPoint.k}
            </span>
          </div>
        </div>

        {/* Operational Interpretation */}
        <div className="bg-stone-50 rounded-lg p-3 border border-stone-200 flex flex-col justify-center">
          <span className="text-xs font-semibold text-stone-700">Operational Triage Verdict</span>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            {currentPoint.k <= 75 ? (
              <>
                <strong className="text-stone-900 font-semibold">Model Advantage: </strong>
                HistGradientBoosting delivers higher precision (+
                {((currentPoint.modelPrecision - currentPoint.rulePrecision) * 100).toFixed(1)}
                %) under human review budgets K ≤ 75.
              </>
            ) : currentPoint.k <= 100 ? (
              <>
                <strong className="text-stone-900 font-semibold">Crossover Zone: </strong>
                At K ≈ 100, the model and rule converge (0.47 vs 0.45). Advantage narrows.
              </>
            ) : (
              <>
                <strong className="text-stone-900 font-semibold">Rule Advantage: </strong>
                Beyond K &gt; 100, the frozen spike rule out-ranks the model (0.49 vs 0.44 at
                K=150). Do not use model for large queue depths.
              </>
            )}
          </p>
        </div>
      </div>

      <figcaption className="text-xs font-serif text-stone-600 mt-3 pt-2 border-t border-stone-100 leading-relaxed">
        <strong>Figure 1.</strong> Mean precision@K across client-grouped folds for
        HistGradientBoosting and the frozen rule. The shaded region (K ≤ 75) marks where the model&apos;s
        mean exceeds the rule&apos;s (0.52 vs. 0.38 at K = 10); beyond K ≈ 100 the rule is higher (0.49
        vs. 0.44 at K = 150). The dotted line shows the development base rate (0.416).
      </figcaption>
    </figure>
  );
};
