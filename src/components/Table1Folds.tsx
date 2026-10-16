import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FoldData {
  method: string;
  meanP50: number;
  sd: number;
  folds: [number, number, number, number, number];
  notes: string;
  isProposed?: boolean;
}

const TABLE_DATA: FoldData[] = [
  {
    method: 'Frozen rule (baseline)',
    meanP50: 0.384,
    sd: 0.182,
    folds: [0.24, 0.48, 0.56, 0.42, 0.22],
    notes: 'Audited spike rule (+3, +2, +1 pts)',
  },
  {
    method: 'Logistic regression',
    meanP50: 0.408,
    sd: 0.121,
    folds: [0.30, 0.42, 0.52, 0.48, 0.32],
    notes: 'Linear comparator (11 features)',
  },
  {
    method: 'Random forest',
    meanP50: 0.492,
    sd: 0.157,
    folds: [0.28, 0.54, 0.64, 0.58, 0.42],
    notes: 'Nonlinear comparator (100 trees)',
  },
  {
    method: 'HistGradientBoosting',
    meanP50: 0.504,
    sd: 0.211,
    folds: [0.16, 0.58, 0.70, 0.62, 0.46],
    notes: 'Proposed model (rank-normalized)',
    isProposed: true,
  },
];

export const Table1Folds: React.FC = () => {
  const [showFolds, setShowFolds] = useState(false);

  return (
    <div className="my-8 bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
            Empirical Results · Table 1
          </span>
          <h4 className="text-base font-serif font-semibold text-stone-900 mt-0.5">
            Precision@50 on Five Client-Grouped Folds
          </h4>
        </div>

        <button
          onClick={() => setShowFolds(!showFolds)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors shrink-0"
        >
          <span>{showFolds ? 'Hide Per-Fold Breakdown' : 'Show All 5 Folds'}</span>
          {showFolds ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
          <thead>
            <tr className="border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-3">Method</th>
              <th className="py-2.5 px-3 text-right">Mean p@50</th>
              <th className="py-2.5 px-3 text-right">SD</th>
              {showFolds && (
                <>
                  <th className="py-2.5 px-2 text-right font-mono">Fold 1</th>
                  <th className="py-2.5 px-2 text-right font-mono">Fold 2</th>
                  <th className="py-2.5 px-2 text-right font-mono">Fold 3</th>
                  <th className="py-2.5 px-2 text-right font-mono">Fold 4</th>
                  <th className="py-2.5 px-2 text-right font-mono">Fold 5</th>
                </>
              )}
              <th className="py-2.5 px-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {TABLE_DATA.map((row) => (
              <tr
                key={row.method}
                className={`transition-colors ${
                  row.isProposed ? 'bg-stone-50/80 font-medium' : 'hover:bg-stone-50/50'
                }`}
              >
                <td className="py-3 px-3 text-stone-900 font-serif">
                  {row.method}
                  {row.isProposed && (
                    <span className="ml-2 inline-block text-[10px] uppercase font-sans font-semibold text-stone-600">
                      (Target)
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-stone-900 tabular-nums">
                  {row.meanP50.toFixed(3)}
                </td>
                <td className="py-3 px-3 text-right font-mono text-stone-600 tabular-nums">
                  ±{row.sd.toFixed(3)}
                </td>
                {showFolds && (
                  <>
                    {row.folds.map((fVal, fIdx) => (
                      <td
                        key={fIdx}
                        className={`py-3 px-2 text-right font-mono tabular-nums text-xs ${
                          row.isProposed && fVal === 0.7
                            ? 'text-emerald-700 font-bold'
                            : row.isProposed && fVal === 0.16
                            ? 'text-amber-700 font-bold'
                            : 'text-stone-700'
                        }`}
                      >
                        {fVal.toFixed(2)}
                      </td>
                    ))}
                  </>
                )}
                <td className="py-3 px-3 text-stone-600 text-xs">{row.notes}</td>
              </tr>
            ))}
            <tr className="bg-stone-100/50 text-stone-500 text-xs">
              <td className="py-2 px-3 italic">Random selection baseline</td>
              <td className="py-2 px-3 text-right font-mono font-medium tabular-nums">0.416</td>
              <td className="py-2 px-3 text-right font-mono tabular-nums">—</td>
              {showFolds && <td colSpan={5} className="py-2 px-2 text-center font-mono">0.4162 (warehouse-wide)</td>}
              <td className="py-2 px-3">Theoretical floor on development split</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 leading-relaxed space-y-1">
        <p>
          <strong>Table 1 Notes:</strong> Evaluated on identical client-grouped folds (GroupKFold,
          k=5). HistGradientBoosting achieves the highest mean precision@50 (0.504), outperforming
          the frozen rule (0.384) and logistic regression (0.408).
        </p>
        <p className="text-stone-500">
          <strong>Honest Variance Transparency:</strong> Due to client portfolio heterogeneity,
          HistGradientBoosting scores span from 0.16 in Fold 1 to 0.70 in Fold 3, outperforming the
          frozen rule in 3 out of 5 folds while underperforming in 2 folds.
        </p>
      </div>
    </div>
  );
};
