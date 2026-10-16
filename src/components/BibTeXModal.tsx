import React, { useState } from 'react';
import { Copy, Check, X, FileText } from 'lucide-react';

interface BibTeXModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BibTeXModal: React.FC<BibTeXModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'bibtex' | 'apa' | null>(null);

  if (!isOpen) return null;

  const bibtexContent = `@article{imran2026earlywarning,
  title   = {An Early-Warning Queue for Organic Click Decline: Client-Grouped and Time-Forward Evaluation of a Decision-Support Ranker},
  author  = {Imran, Hassan Ali},
  journal = {FlyRank ML Internship, Applied Search Intelligence},
  year    = {2026},
  month   = {August},
  url     = {https://github.com/Hassan-tech-pro/ml-internship/tree/main/work/notebooks},
  note    = {Built on the FlyRank ML Internship dataset (https://flyrank.ai)}
}`;

  const apaContent = `Imran, H. A. (2026). An Early-Warning Queue for Organic Click Decline: Client-Grouped and Time-Forward Evaluation of a Decision-Support Ranker. FlyRank Applied Search Intelligence Research. https://flyrank.ai`;

  const copyToClipboard = async (text: string, type: 'bibtex' | 'apa') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cite-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF9F5] rounded-xl border border-stone-200 max-w-2xl w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-stone-700" />
            <h3 id="cite-modal-title" className="text-lg font-serif font-semibold text-stone-900">
              Cite This Paper
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close citation modal"
            className="p-1 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* BibTeX Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 font-sans">
                BibTeX Entry
              </span>
              <button
                onClick={() => copyToClipboard(bibtexContent, 'bibtex')}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-stone-800 text-stone-100 rounded-md hover:bg-stone-700 transition-colors"
              >
                {copiedType === 'bibtex' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied BibTeX
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy BibTeX
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-stone-100 text-stone-800 font-mono text-xs rounded-lg overflow-x-auto border border-stone-200 leading-relaxed">
              {bibtexContent}
            </pre>
          </div>

          {/* APA Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 font-sans">
                APA Format
              </span>
              <button
                onClick={() => copyToClipboard(apaContent, 'apa')}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border border-stone-300 text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
              >
                {copiedType === 'apa' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied APA
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy APA
                  </>
                )}
              </button>
            </div>
            <div className="p-3 bg-stone-100 text-stone-800 text-xs rounded-lg border border-stone-200 font-sans leading-relaxed">
              {apaContent}
            </div>
          </div>

          <div className="text-xs text-stone-500 pt-3 border-t border-stone-200">
            Data Attribution: Built on the{' '}
            <a
              href="https://flyrank.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 underline underline-offset-2 font-medium hover:text-stone-700"
            >
              FlyRank ML Internship dataset
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
