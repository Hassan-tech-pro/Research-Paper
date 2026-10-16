import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface TopNavProps {
  onOpenCiteModal: () => void;
  onNavigateToPaperSection?: (hash: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenCiteModal, onNavigateToPaperSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (onNavigateToPaperSection) {
      e.preventDefault();
      onNavigateToPaperSection(hash);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors no-print">
      {/* Reading Progress Indicator */}
      <div
        className="h-0.5 bg-stone-800 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#masthead"
          onClick={(e) => handleLinkClick(e, '#masthead')}
          className="text-base font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          FlyRank Applied Research
        </a>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav
          aria-label="Paper navigation"
          className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-600"
        >
          <a
            href="#abstract"
            onClick={(e) => handleLinkClick(e, '#abstract')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Abstract
          </a>
          <a
            href="#data-definition"
            onClick={(e) => handleLinkClick(e, '#data-definition')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Data
          </a>
          <a
            href="#methodology"
            onClick={(e) => handleLinkClick(e, '#methodology')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Methods
          </a>
          <a
            href="#results"
            onClick={(e) => handleLinkClick(e, '#results')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Results
          </a>
          <a
            href="#playbook"
            onClick={(e) => handleLinkClick(e, '#playbook')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0"
          >
            Playbook
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCiteModal}
            aria-label="Open citation modal"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-100 bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Quote className="w-3.5 h-3.5 text-stone-300" />
            <span>Cite Paper</span>
          </button>
        </div>
      </div>
    </header>
  );
};
