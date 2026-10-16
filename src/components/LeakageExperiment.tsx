import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Split, Database } from 'lucide-react';

export const LeakageExperiment: React.FC = () => {
  const [selectedSplit, setSelectedSplit] = useState<'grouped' | 'random'>('grouped');

  return (
    <div className="my-8 bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
            Methodological Deep Dive · Section 5.2
          </span>
          <h4 className="text-base font-serif font-semibold text-stone-900 mt-0.5">
            The Evaluation Boundary Effect: Row-Level Leakage vs Client Grouping
          </h4>
        </div>

        {/* Strategy Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg shrink-0">
          <button
            onClick={() => setSelectedSplit('grouped')}
            className={`px-3 py-1.5 text-xs font-sans font-medium rounded-md transition-colors ${
              selectedSplit === 'grouped'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Client Grouping (Production)
          </button>
          <button
            onClick={() => setSelectedSplit('random')}
            className={`px-3 py-1.5 text-xs font-sans font-medium rounded-md transition-colors ${
              selectedSplit === 'random'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Random Row Split (Leaky)
          </button>
        </div>
      </div>

      {/* Side by side metric delta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* Row level random */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            selectedSplit === 'random'
              ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300'
              : 'bg-stone-50 border-stone-200 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Naïve Row-Level Split
            </span>
            <span className="text-xs font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">
              FLAWED
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-amber-900 tabular-nums">0.996</span>
            <span className="text-xs text-amber-800 font-sans">Precision@50 (99.6%)</span>
          </div>
          <p className="mt-2 text-xs text-stone-600 leading-relaxed">
            Content items from the <em>same client portfolio</em> appear simultaneously in both train
            and test sets. The model trivially memorizes client-specific domain authority, crawl
            frequency, and site-wide click scales.
          </p>
          <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center gap-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Severe optimistic bias: creates an illusion of near-perfect ranking.</span>
          </div>
        </div>

        {/* Client grouped */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            selectedSplit === 'grouped'
              ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400'
              : 'bg-stone-50 border-stone-200 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Client-Grouped Cross-Validation
            </span>
            <span className="text-xs font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-semibold">
              SOUND
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-stone-900 tabular-nums">0.496</span>
            <span className="text-xs text-stone-600 font-sans">Precision@50 (49.6%)</span>
          </div>
          <p className="mt-2 text-xs text-stone-600 leading-relaxed">
            Using <code className="bg-stone-200/70 px-1 py-0.5 rounded text-[11px]">GroupKFold</code>,
            entire clients are held out completely from training. The ranker must generalize to novel
            content portfolios without prior client signature exposure.
          </p>
          <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Reflects real deployment reality: 50.0 percentage point honest correction.</span>
          </div>
        </div>
      </div>

      {/* Interactive Visual Architecture diagram */}
      <div className="mt-5 p-4 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Split className="w-4 h-4 text-stone-700" />
          <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
            Data Flow Boundary Architecture
          </span>
        </div>

        {selectedSplit === 'random' ? (
          <div className="space-y-2 text-xs text-stone-700 font-sans">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="w-full sm:w-1/3 bg-amber-100/80 border border-amber-300 p-2.5 rounded-lg">
                <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" /> Client A (e.g. 1,200 URLs)
                </div>
                <div className="text-[11px] text-amber-800 mt-1">Split randomly 80/20 across rows</div>
              </div>
              <div className="hidden sm:block text-stone-400 font-mono">→</div>
              <div className="w-full sm:w-2/3 grid grid-cols-2 gap-2">
                <div className="bg-amber-50 border border-amber-200 p-2 rounded-lg">
                  <strong className="text-amber-900">Train Fold:</strong> 960 URLs from Client A
                </div>
                <div className="bg-amber-50 border border-amber-200 p-2 rounded-lg">
                  <strong className="text-amber-900">Test Fold:</strong> 240 URLs from Client A
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 italic mt-2">
              Result: The decision tree splits on feature combinations unique to Client A&apos;s
              server response codes, authority tier, and seasonality, inflating precision to 0.996.
            </p>
          </div>
        ) : (
          <div className="space-y-2 text-xs text-stone-700 font-sans">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="w-full sm:w-1/3 bg-emerald-100/80 border border-emerald-300 p-2.5 rounded-lg">
                <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" /> Client A (1,200 URLs)
                </div>
                <div className="text-[11px] text-emerald-800 mt-1">Bound to Fold 1 ONLY</div>
              </div>
              <div className="hidden sm:block text-stone-400 font-mono">→</div>
              <div className="w-full sm:w-2/3 grid grid-cols-2 gap-2">
                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                  <strong className="text-emerald-900">Train Set:</strong> Clients B, C, D, E
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                  <strong className="text-emerald-900">Test Set:</strong> Client A (Strictly zero overlap)
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 italic mt-2">
              Result: Zero client contamination. The ranker achieves an honest 0.496 precision@50,
              reflecting true performance on incoming unindexed client domains.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
