import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Printer,
  ChevronRight,
  BookOpen,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { TopNav } from './components/TopNav';
import { BibTeXModal } from './components/BibTeXModal';
import { Figure1Interactive } from './components/Figure1Interactive';
import { Figure2Interactive } from './components/Figure2Interactive';
import { LeakageExperiment } from './components/LeakageExperiment';
import { Table1Folds } from './components/Table1Folds';
import { PlaybookSimulator } from './components/PlaybookSimulator';

export default function App() {
  const [isCiteModalOpen, setIsCiteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'paper' | 'executive' | 'tools'>('paper');

  const printPaper = () => {
    window.print();
  };

  const handleNavSection = (hash: string) => {
    setActiveTab('paper');
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans selection:bg-stone-800 selection:text-stone-50">
      {/* Top Navigation */}
      <TopNav
        onOpenCiteModal={() => setIsCiteModalOpen(true)}
        onNavigateToPaperSection={handleNavSection}
      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Academic Masthead */}
        <header id="masthead" className="pb-8 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 font-sans mb-3">
            <span>Research Paper</span>
            <span aria-hidden="true">·</span>
            <span>Applied Search Intelligence</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-700">
              <Calendar className="w-3.5 h-3.5" /> August 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-bold text-stone-950 leading-[1.2] tracking-tight max-w-4xl">
            An Early-Warning Queue for Organic Click Decline: Client-Grouped and Time-Forward Evaluation of a Decision-Support Ranker
          </h1>

          {/* Author & Affiliation */}
          <div className="mt-6 flex flex-wrap items-baseline gap-y-2 gap-x-6 text-sm">
            <div>
              <span className="font-serif font-bold text-stone-900 text-base">Hassan Ali Imran</span>
              <span className="text-stone-500 block text-xs mt-0.5">
                FlyRank ML Internship, Applied Search Intelligence
              </span>
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-3">
              <span className="bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-md text-stone-700 font-medium">
                Decision Support Systems
              </span>
              <span>Peer-Audited ML Workflow</span>
            </div>
          </div>

          {/* Action Ribbon & Navigation Toolbar */}
          <div className="mt-6 pt-5 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 no-print">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
              <button
                onClick={() => setActiveTab('paper')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'paper'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Full Academic Paper</span>
              </button>
              <button
                onClick={() => setActiveTab('executive')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'executive'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Executive Brief</span>
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'tools'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Visual Lab</span>
              </button>
            </div>

            {/* Quick External Links */}
            <div className="flex items-center gap-3 text-xs">
              <a
                href="https://github.com/Hassan-tech-pro/ml-internship/tree/main/work/notebooks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Notebooks &amp; Code</span>
                <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </a>

              <a
                href="https://flyrank.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>FlyRank Dataset</span>
                <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </a>

              <button
                onClick={printPaper}
                className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium transition-colors cursor-pointer"
                aria-label="Print or save paper as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>
        </header>

        {/* Layout Grid: Sidebar Navigation + Main Content */}
        {activeTab === 'tools' ? (
          /* INTERACTIVE VISUAL LAB VIEW */
          <div className="space-y-10 mt-8">
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 font-sans mb-1">
                <Sliders className="w-4 h-4" />
                <span>Interactive Visual Lab &amp; Decision Simulators</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Explore Models, Queue Horizons &amp; Triage Rules Hands-On
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
                Interact with the paper&apos;s empirical models, inspect queue depth trade-offs across K,
                test the data leakage boundary effect, and simulate content triage routing for live URLs.
              </p>
            </div>

            {/* Tool 1: Playbook Simulator */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">1</span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Operational Triage &amp; Routing Engine (Section 7)
                </h3>
              </div>
              <PlaybookSimulator />
            </div>

            {/* Tool 2: Figure 1 Precision@K Depth Explorer */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">2</span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Queue Horizon Precision@K Inspector (Figure 1)
                </h3>
              </div>
              <Figure1Interactive />
            </div>

            {/* Tool 3: Leakage Visualizer */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">3</span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Row-Level Random Split vs Client-Grouped Leakage Demonstrator (Section 5.2)
                </h3>
              </div>
              <LeakageExperiment />
            </div>

            {/* Tool 4: Figure 2 Sealed Month Drift Guard */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">4</span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Sealed June 2026 Month Holdout &amp; Automated Drift Guard (Figure 2)
                </h3>
              </div>
              <Figure2Interactive />
            </div>
          </div>
        ) : activeTab === 'executive' ? (
          /* EXECUTIVE BRIEF VIEW */
          <div className="space-y-10 mt-8 max-w-4xl mx-auto">
            <div className="p-6 sm:p-8 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-sans block">
                Executive Synthesis · 3-Minute Briefing
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                Prioritizing Human Content Inspection Under Finite Budgets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100 text-xs font-sans">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-stone-500 font-medium">Core Problem</div>
                  <div className="text-stone-900 font-semibold text-sm mt-1">
                    Silent Organic Click Loss
                  </div>
                  <p className="text-stone-600 mt-2 leading-relaxed">
                    Central content teams cannot review thousands of URLs. With a fixed monthly budget of 50 reviews, ranking quality at the head matters more than generic accuracy.
                  </p>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-stone-500 font-medium">Recommended Solution</div>
                  <div className="text-emerald-800 font-semibold text-sm mt-1">
                    HistGradientBoosting (K ≤ 75)
                  </div>
                  <p className="text-stone-600 mt-2 leading-relaxed">
                    Achieves 0.504 precision@50 vs 0.384 for the spike rule, capturing ~25 true decliners out of 50 reviews.
                  </p>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="text-stone-500 font-medium">Operational Mandate</div>
                  <div className="text-amber-800 font-semibold text-sm mt-1">
                    Drift Guard Circuit Breaker
                  </div>
                  <p className="text-stone-600 mt-2 leading-relaxed">
                    Halt releases when monthly baseline rates shift by &gt; ±0.10, preventing misallocation of editorial staff.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Comparison Table */}
            <Table1Folds />

            {/* Precision@K Curve */}
            <Figure1Interactive />

            {/* Action Playbook */}
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4">
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Action Playbook Summary
              </h3>
              <div className="space-y-3 text-xs font-sans">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <strong className="text-red-900 block">1. Refresh Spiked Content (3.3x–7.0x):</strong>
                  <span className="text-red-800">
                    Highest empirical decline rate (68.9%). Assign top priority in monthly 50-slot queue.
                  </span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <strong className="text-blue-900 block">2. Protect Durable Rising Content:</strong>
                  <span className="text-blue-800">
                    Pages with sustained Month 2 momentum (≥1.5x) must NOT be rewritten. Prohibit changes to avoid ranking drops.
                  </span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <strong className="text-amber-900 block">3. Investigate Flat Anomalies:</strong>
                  <span className="text-amber-800">
                    Pages declining from flat baselines are missed by spike heuristics; route to technical SEO audits.
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Tool in Executive View */}
            <PlaybookSimulator />
          </div>
        ) : (
          /* STANDARD FULL ACADEMIC PAPER VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
          {/* Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 no-print">
            <div className="sticky top-20 space-y-6">
              <div className="p-4 bg-white/70 border border-stone-200/90 rounded-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans block mb-3">
                  Contents
                </span>
                <nav className="space-y-1 text-xs text-stone-600 font-sans">
                  <a
                    href="#abstract"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> Abstract &amp; Claims
                  </a>
                  <a
                    href="#introduction"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 1. Introduction
                  </a>
                  <a
                    href="#related-work"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 2. Related Work
                  </a>
                  <a
                    href="#data-definition"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 3. Data &amp; Task Definition
                  </a>
                  <a
                    href="#methodology"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 4. Methods
                  </a>
                  <a
                    href="#results"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 5. Empirical Results
                  </a>
                  <a
                    href="#limitations"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 6. Discussion &amp; Limitations
                  </a>
                  <a
                    href="#playbook"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors font-medium text-stone-900"
                  >
                    <ChevronRight className="w-3 h-3 text-blue-600" /> 7. Action Playbook
                  </a>
                  <a
                    href="#reproducibility"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> Reproducibility
                  </a>
                  <a
                    href="#acknowledgments"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> Acknowledgments
                  </a>
                  <a
                    href="#references"
                    className="flex items-center gap-1.5 py-1 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400" /> References
                  </a>
                </nav>
              </div>

              {/* Research Summary Card */}
              <div className="p-4 bg-stone-100/70 border border-stone-200 rounded-xl text-xs space-y-2.5">
                <span className="font-semibold text-stone-800 uppercase tracking-wide text-[11px] block">
                  Key Metrics At A Glance
                </span>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-500">Warehouse Volume:</span>
                  <span className="font-mono font-bold text-stone-900">78.8M rows</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-500">Dev Cohort:</span>
                  <span className="font-mono font-bold text-stone-900">16,513 items</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-500">Primary Metric:</span>
                  <span className="font-mono font-bold text-stone-900">Precision@50</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-500">HGB Precision@50:</span>
                  <span className="font-mono font-bold text-emerald-700">0.504 ± 0.211</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-500">Spike Rule Precision:</span>
                  <span className="font-mono font-bold text-stone-700">0.384 ± 0.182</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-500">Dev Base Rate:</span>
                  <span className="font-mono font-medium text-stone-700">0.4162</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-200">
                  <span className="text-stone-500">Sealed Holdout:</span>
                  <span className="font-mono font-bold text-stone-900">0.740 (June 2026)</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Paper Text & Figures */}
          <article className="lg:col-span-9 space-y-12 max-w-3xl">
            {/* ABSTRACT SECTION */}
            <section
              id="abstract"
              className="p-6 sm:p-8 bg-white border border-stone-200 rounded-2xl shadow-xs"
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 font-sans mb-3">
                Abstract
              </h2>
              <div className="paper-prose text-stone-800 leading-relaxed font-serif text-[1.0625rem]">
                <p>
                  Content teams with limited review capacity must decide which pages to inspect first
                  when organic search traffic declines. We frame this as a ranking problem under a
                  fixed monthly budget of fifty reviews and adopt precision@50, specified before
                  training, as the primary metric. Using a pseudonymized warehouse of 78,835,655 daily
                  search-performance records, we construct a development frame of 16,513 eligible
                  content items across 36 clients and compare an audited rule baseline against
                  logistic regression, random forest, and an eleven-feature{' '}
                  <code className="text-sm font-mono bg-stone-100 px-1 py-0.5 rounded">
                    HistGradientBoosting
                  </code>{' '}
                  classifier on identical client-grouped folds. HistGradientBoosting achieves the
                  highest mean precision@50 (0.504 ± 0.211 across five folds) compared with the rule
                  (0.384 ± 0.182), although it outperforms the rule in only three of five folds. A
                  time-forward holdout reaches 0.62. A separate experiment shows that row-level random
                  splitting inflates precision@50 from 0.496 to 0.996, underscoring the importance of
                  grouping by client. On a sealed evaluation month (June 2026; 19,432 items, 37
                  clients), the base rate shifts from 0.416 to 0.655; the model scores 0.740, the rule
                  0.380, and a naive heuristic 0.780. These results support using the ranker to order
                  human attention, but not to automate actions, and make no causal claim about the
                  effect of content refreshes.
                </p>
              </div>

              {/* Keywords */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-600 font-sans">
                <span className="font-semibold text-stone-800">Keywords:</span>
                <span>search engine optimization</span>
                <span>·</span>
                <span>ranking</span>
                <span>·</span>
                <span>precision@K</span>
                <span>·</span>
                <span>grouped cross-validation</span>
                <span>·</span>
                <span>data leakage</span>
                <span>·</span>
                <span>distribution shift</span>
                <span>·</span>
                <span>decision support</span>
              </div>

              {/* Core Claims Grid */}
              <div className="mt-6 pt-5 border-t border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 font-sans block mb-3">
                  Core Scientific Claims
                </span>
                <div className="space-y-3 text-xs font-sans">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <strong className="text-stone-900 block mb-1">
                      Claim 1 (C1 · Queue Depth Horizon):
                    </strong>
                    <span className="text-stone-700 leading-relaxed">
                      Across five client-grouped folds, HistGradientBoosting has a higher mean
                      precision than the audited rule for queue depths K ≤ 75, but not beyond K ≈ 100;
                      at K = 50 it outperforms the rule in three folds and underperforms in two
                      (Section 5.1).
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <strong className="text-stone-900 block mb-1">
                      Claim 2 (C2 · Leakage Boundary):
                    </strong>
                    <span className="text-stone-700 leading-relaxed">
                      The evaluation boundary materially affects reported performance: a random
                      row-level split yields precision@50 of 0.996, while client grouping yields 0.496
                      (Section 5.2).
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <strong className="text-stone-900 block mb-1">
                      Claim 3 (C3 · Distribution Drift Circuit Breaker):
                    </strong>
                    <span className="text-stone-700 leading-relaxed">
                      A sealed evaluation month exhibits a substantially different label distribution
                      (+0.239 base rate jump), which a proposed post-label monitoring check would detect
                      and use to pause the next release (Section 5.4).
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: INTRODUCTION */}
            <section id="introduction" className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                <span className="text-stone-400 font-mono text-lg font-normal">1.</span>
                <span>Introduction &amp; Problem Statement</span>
              </h2>

              <div className="paper-prose">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
                  A web page that loses organic search clicks often does so silently, and the lost
                  traffic accumulates until someone notices. For a central content team overseeing
                  many client portfolios, the practical question is not whether a given page will
                  decline in the abstract, but which fifty pages should be reviewed first in a given
                  month. This makes the task a ranking problem constrained by human capacity, rather
                  than a generic classification problem.
                </p>
                <p>
                  In this paper we develop and evaluate a decision-support ranker for this review
                  queue. Our evaluation mirrors the conditions under which the system would be used:
                  models are validated with folds grouped by client, tested walk-forward in time, and
                  finally assessed once on a sealed month held out from all development.
                </p>
                <p>
                  Our primary contributions are fourfold:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-stone-800 font-serif my-4">
                  <li>
                    <strong>Leakage-controlled feature frame and outcome label:</strong> Explicit
                    separation of feature and outcome observation windows to prevent future leakage.
                  </li>
                  <li>
                    <strong>Audited rule baseline:</strong> A strong domain-informed heuristic based
                    on post-spike traffic regression, providing a meaningful standard of comparison.
                  </li>
                  <li>
                    <strong>Three-tier evaluation design:</strong> Combining client-grouped
                    cross-validation, walk-forward temporal evaluation, and single-pass sealed-month
                    holdout testing.
                  </li>
                  <li>
                    <strong>Operational error translation:</strong> Analysis of high-confidence false
                    positives and false negatives directly translated into actionable editorial
                    routing policies.
                  </li>
                </ol>
                <p className="text-stone-600 italic">
                  We do not claim methodological novelty in the learning algorithms themselves.
                </p>
              </div>
            </section>

            {/* SECTION 2: RELATED WORK */}
            <section id="related-work" className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                <span className="text-stone-400 font-mono text-lg font-normal">2.</span>
                <span>Related Work</span>
              </h2>

              <div className="paper-prose">
                <p>
                  Rule-based systems are a common first solution in applied machine learning because
                  they encode domain judgment transparently; practitioner guidance recommends
                  establishing such baselines before introducing learned models [1]. Our baseline
                  follows this approach and was audited on held-out data before any model was trained.
                </p>
                <p>
                  For the learned comparator we use gradient-boosted decision trees as implemented in
                  scikit-learn&apos;s{' '}
                  <code className="text-sm font-mono bg-stone-100 px-1 py-0.5 rounded">
                    HistGradientBoostingClassifier
                  </code>{' '}
                  [3], using predicted probabilities as a ranking score rather than a dedicated
                  learning-to-rank objective, since the decision requires only an ordering.
                </p>
                <p>
                  To prevent information from the same client appearing in both training and test data,
                  we use group-aware cross-validation (<code>GroupKFold</code>) [2]. Reporting practices
                  follow the NeurIPS paper checklist [4], in particular regarding uncertainty,
                  limitations, and reproducibility.
                </p>
              </div>
            </section>

            {/* SECTION 3: DATA & TASK DEFINITION */}
            <section id="data-definition" className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                <span className="text-stone-400 font-mono text-lg font-normal">3.</span>
                <span>Data and Task Definition</span>
              </h2>

              <div className="paper-prose">
                <h3 className="text-lg font-bold text-stone-900 font-sans mt-4 mb-2">
                  3.1 Data Source &amp; Warehouse Inventory
                </h3>
                <p>
                  The data come from a pseudonymized warehouse release provided through the{' '}
                  <a
                    href="https://flyrank.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-900 underline underline-offset-2 font-medium hover:text-stone-700"
                  >
                    FlyRank ML Internship
                  </a>
                  , containing <strong>78,835,655</strong> daily performance records from 27 January
                  2025 to 30 June 2026. The warehouse inventory lists 104 client records and 519,606
                  content records; the daily fact table covers 70 clients and 427,292 content items.
                  The unit of observation is one content item for one client at a monthly decision
                  point. Client and content identifiers are pseudonymous hashes used only for grouping
                  and joining, never as model features.
                </p>

                <h3 className="text-lg font-bold text-stone-900 font-sans mt-6 mb-2">
                  3.2 Outcome Label Definition
                </h3>
                <p>
                  An item is labelled as declined if its clicks in the outcome month fall below 80% of
                  its clicks in the preceding month (for development, May versus April 2026). The
                  outcome window lies strictly after all feature windows, and the columns used to
                  compute the label are excluded from the feature frame. The development base rate is{' '}
                  <strong>0.4162</strong>.
                </p>

                <h3 className="text-lg font-bold text-stone-900 font-sans mt-6 mb-2">
                  3.3 Eligibility Criteria &amp; Explicit Exclusions
                </h3>
                <p>
                  Items are eligible if they record at least 1,000 impressions across the three feature
                  months and at least 10 clicks in the final feature month; these thresholds keep the
                  relative-decline label meaningful. After filtering, the development frame contains{' '}
                  <strong>16,513 items across 36 clients</strong>.
                </p>
                <p>
                  To guarantee safety and prevent data leakage, we explicitly excluded:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-stone-800 font-serif my-3">
                  <li>
                    <strong>Sparse engagement and AI-related columns:</strong> Zeroed or noisy
                    experimental telemetry.
                  </li>
                  <li>
                    <strong>Raw position-sum field:</strong> Replaced by impression-weighted average
                    position to prevent volume confounding.
                  </li>
                  <li>
                    <strong>Partition keys and last-optimized date:</strong> Reflects prior human
                    decisions and interventions.
                  </li>
                  <li>
                    <strong>Starter dataset label derivatives:</strong> Fields derived from the label
                    such as trend direction and trend percentage were strictly purged.
                  </li>
                </ul>

                <h3 className="text-lg font-bold text-stone-900 font-sans mt-6 mb-2">
                  3.4 Three Leakage Controls
                </h3>
                <p>
                  Three structural boundaries are enforced and continuously tested in code:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4 font-sans text-xs">
                  <div className="p-3 bg-white border border-stone-200 rounded-lg">
                    <strong className="text-stone-900 block mb-1">1. Temporal Fence</strong>
                    <span className="text-stone-600">
                      Feature observation windows end strictly before the label window begins. No
                      future lookahead.
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded-lg">
                    <strong className="text-stone-900 block mb-1">2. Client Isolation</strong>
                    <span className="text-stone-600">
                      No client identifier appears in more than one fold. Evaluates zero-shot
                      cross-client transfer.
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded-lg">
                    <strong className="text-stone-900 block mb-1">3. Sealed Month</strong>
                    <span className="text-stone-600">
                      The sealed June 2026 month was touched exactly once after all models and
                      hyperparameters were frozen.
                    </span>
                  </div>
                </div>
                <p className="text-stone-600 text-sm">
                  A deliberately leaky client-derived feature is retained as a test fixture, and the
                  automated test suite verifies that the production feature pipeline rejects it.
                </p>
              </div>
            </section>

            {/* SECTION 4: METHODS */}
            <section id="methodology" className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                <span className="text-stone-400 font-mono text-lg font-normal">4.</span>
                <span>Methods</span>
              </h2>

              <div className="paper-prose">
                <h3 className="text-lg font-bold text-stone-900 font-sans mt-4 mb-2">
                  4.1 Baselines: The Audited Spike Rule and the Anti-Baseline
                </h3>
                <p>
                  The operational baseline is a frozen rule derived from a signal audit performed
                  before modelling. Established pages whose final feature month had 3.3–7 times the
                  clicks of the first feature month declined at a rate of <strong>0.689</strong>,
                  compared with the base rate of 0.416; beyond 7 times, the rate was 0.503. The rule
                  assigns:
                </p>
                <div className="p-3.5 bg-stone-100/70 border border-stone-200 rounded-lg font-sans text-xs space-y-1.5 my-3">
                  <div className="flex justify-between font-mono">
                    <span className="text-stone-800">Spike Ratio 3.3x–7.0x:</span>
                    <span className="font-bold text-stone-900">+3 points (Decline rate: 0.689)</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-stone-800">Extreme Spike &gt;7.0x:</span>
                    <span className="font-bold text-stone-900">+2 points (Decline rate: 0.503)</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-stone-800">Rising Trend (Month 3 &gt; Month 1):</span>
                    <span className="font-bold text-stone-900">+1 point</span>
                  </div>
                  <div className="text-stone-500 pt-1 text-[11px]">
                    Tie-breaker: Final-month clicks descending.
                  </div>
                </div>
                <p>
                  The audit also identified an intuitive but ineffective heuristic: a watchlist of
                  pages that were <em>already declining</em> had a decline rate of only{' '}
                  <strong>0.332</strong>, well below the base rate, consistent with month-to-month mean
                  reversion. We report this anti-baseline for transparency.
                </p>

                <h3 className="text-lg font-bold text-stone-900 font-sans mt-6 mb-2">
                  4.2 Features and Models
                </h3>
                <p>
                  Eleven features, all strictly available at the decision time, are used:
                </p>
                <div className="p-3 bg-white border border-stone-200 rounded-lg font-mono text-xs text-stone-700 leading-relaxed my-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>• 90-day impressions &amp; clicks</div>
                  <div>• Final-month impressions &amp; clicks</div>
                  <div>• First- &amp; middle-month clicks</div>
                  <div>• Momentum (Month 2 / Month 1)</div>
                  <div>• 90-day click-through rate (CTR)</div>
                  <div>• Impression-weighted avg position</div>
                  <div>• Active days in window</div>
                  <div>• New-page indicator</div>
                </div>
                <p>
                  We compare logistic regression, random forest, and HistGradientBoosting
                  classifiers with fixed configurations. All stochastic components use random seed 42.
                </p>

                <h3 className="text-lg font-bold text-stone-900 font-sans mt-6 mb-2">
                  4.3 Evaluation Protocol &amp; Rank-Normalization
                </h3>
                <p>
                  The primary metric is <strong>precision@50</strong>, fixed before training to match
                  the editorial team&apos;s monthly review capacity. Secondary metrics include
                  precision@K for K between 10 and 200 and per-client medians. We use three evaluation
                  settings:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-stone-800 font-serif my-3">
                  <li>
                    <strong>Five-fold GroupKFold cross-validation by client:</strong> Reporting the
                    mean and standard deviation of per-fold precision@50.
                  </li>
                  <li>
                    <strong>Time-forward holdout:</strong> Trained at 1 April 2026 decision point and
                    evaluated unchanged at 1 May 2026.
                  </li>
                  <li>
                    <strong>Single evaluation on the sealed June 2026 month.</strong>
                  </li>
                </ul>
                <p>
                  When pooling predictions across folds, probabilities are <em>rank-normalized</em>{' '}
                  within each fold, since pooling raw probabilities reversed an empirical conclusion in
                  an earlier exploratory analysis.
                </p>
              </div>
            </section>

            {/* SECTION 5: RESULTS */}
            <section id="results" className="space-y-6 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                <span className="text-stone-400 font-mono text-lg font-normal">5.</span>
                <span>Results</span>
              </h2>

              <div className="paper-prose">
                <h3 className="text-lg font-bold text-stone-900 font-sans mt-4 mb-2">
                  5.1 Main Comparison on Client-Grouped Folds
                </h3>
                <p>
                  Table 1 reports precision@50 for each method on identical client-grouped folds.
                  HistGradientBoosting achieves the highest mean, followed closely by random forest;
                  both tree models exceed the base rate of 0.416, whereas the frozen rule and logistic
                  regression do not. However, variation across folds is large: the proposed
                  model&apos;s per-fold precision ranges from 0.16 to 0.70, and it exceeds the rule in
                  only three of five folds.
                </p>
              </div>

              {/* TABLE 1 COMPONENT */}
              <Table1Folds />

              <div className="paper-prose">
                <p>
                  Figure 1 inspects the queue horizon by plotting mean precision across K between 10
                  and 200. HistGradientBoosting maintains a consistent advantage in the shallow queue
                  regime (K ≤ 75), which directly corresponds to the operational budget of human
                  editorial review.
                </p>
              </div>

              {/* FIGURE 1 INTERACTIVE */}
              <Figure1Interactive />

              {/* SECTION 5.2 DATA LEAKAGE EXPERIMENT */}
              <div className="paper-prose mt-8">
                <h3 className="text-lg font-bold text-stone-900 font-sans mb-2">
                  5.2 Effect of the Evaluation Boundary
                </h3>
                <p>
                  In a separate experiment using a nine-feature random forest, changing only the split
                  strategy moved precision@50 from 0.996 under random row-level splitting to 0.496
                  under client grouping. This demonstrates that row-level splits leak client-specific
                  information and substantially overstate performance. Because this experiment uses a
                  different feature set, it is reported as evidence for the importance of grouping
                  rather than as a result for the main model.
                </p>
              </div>

              {/* LEAKAGE EXPERIMENT VISUALIZER */}
              <LeakageExperiment />

              {/* SECTION 5.3 ERROR ANALYSIS */}
              <div className="paper-prose mt-8">
                <h3 className="text-lg font-bold text-stone-900 font-sans mb-2">
                  5.3 Error Analysis &amp; Routing Policy Synthesis
                </h3>
                <p>
                  High-confidence false positives are concentrated among pages on a durable upward trend
                  (middle-month clicks already at least 1.5 times first-month clicks), which show
                  momentum without subsequent reversion. High-confidence false negatives are pages with
                  flat histories that decline without warning.
                </p>
                <p>
                  These findings were translated into explicit routing policies:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 font-sans text-xs">
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
                    <strong className="text-blue-900 block mb-1">Rising Momentum Policy:</strong>
                    <span className="text-blue-800">
                      Rising pages are routed to ongoing monitoring rather than content rewrites,
                      preventing unneeded intervention on surging assets.
                    </span>
                  </div>
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <strong className="text-amber-900 block mb-1">Flat History Policy:</strong>
                    <span className="text-amber-800">
                      Flat-history pages, for which the spike rule provides no rationale, are routed
                      to human qualitative judgment and technical SEO audits.
                    </span>
                  </div>
                </div>
                <p>
                  Average search position showed little separation for this label (a spread of 0.04
                  across position bands), a negative result that rules out a plausible feature
                  hypothesis.
                </p>
              </div>

              {/* SECTION 5.4 TEMPORAL EVALUATION & SEALED MONTH */}
              <div className="paper-prose mt-8">
                <h3 className="text-lg font-bold text-stone-900 font-sans mb-2">
                  5.4 Temporal Evaluation and Sealed Month Holdout
                </h3>
                <p>
                  In the time-forward holdout, the model trained at 1 April 2026 achieved precision@50
                  of <strong>0.62</strong> when evaluated unchanged at 1 May 2026. On the sealed June
                  2026 month (19,432 eligible items across 37 clients), the base rate rose to 0.655
                  from 0.416 during development. The dev-trained model achieved <strong>0.740</strong>,
                  0.085 above the new base rate but below the naive &quot;already declining&quot;
                  heuristic (0.780); the frozen rule scored 0.380, well below the base rate.
                </p>
                <p>
                  Once June outcomes became available, the proposed drift check, which flags base rates
                  outside 0.416 ± 0.10, would have triggered at a deviation of{' '}
                  <span className="font-mono font-semibold text-amber-800">+0.239</span> and paused
                  the next release for review.
                </p>
              </div>

              {/* FIGURE 2 INTERACTIVE */}
              <Figure2Interactive />
            </section>

            {/* SECTION 6: DISCUSSION & LIMITATIONS */}
            <section id="limitations" className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                <span className="text-stone-400 font-mono text-lg font-normal">6.</span>
                <span>Discussion &amp; Limitations</span>
              </h2>

              <div className="paper-prose">
                <p>
                  The results indicate that a small gradient-boosted model can improve the ordering of
                  the head of a review queue relative to a transparent rule, but the advantage is
                  modest, inconsistent across clients, and confined to shallow queue depths. The large
                  gap between random and grouped splits shows that the choice of evaluation boundary can
                  matter more than the choice of model. The sealed month reveals a substantial shift in
                  the label distribution, under which the rule&apos;s advantage disappears and even a
                  naive heuristic performs best; this motivates outcome monitoring before each release.
                </p>
                <p>
                  The ranker runs as a monthly batch job with negligible inference cost relative to the
                  editorial hours it allocates. Monthly refitting and periodic review of the rule&apos;s
                  thresholds are proposed policies that remain to be validated.
                </p>

                <h3 className="text-lg font-bold text-stone-900 font-sans mt-6 mb-3">
                  6.1 Limitations &amp; Honest Framing
                </h3>
                <div className="space-y-3 font-sans text-xs">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2.5">
                    <span className="font-mono font-bold text-stone-500 mt-0.5">L1</span>
                    <div className="text-stone-700 leading-relaxed">
                      <strong>Temporal Evidence Scope:</strong> Temporal evidence is limited to one
                      walk-forward month (May 2026) and one sealed month (June 2026); a longer
                      multi-window backtest is the most important missing experiment.
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2.5">
                    <span className="font-mono font-bold text-stone-500 mt-0.5">L2</span>
                    <div className="text-stone-700 leading-relaxed">
                      <strong>High Cross-Client Variance:</strong> Performance varies widely across
                      client folds (precision@50 from 0.16 to 0.70); five folds do not establish
                      reliable superiority over the rule across all enterprise domains.
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2.5">
                    <span className="font-mono font-bold text-stone-500 mt-0.5">L3</span>
                    <div className="text-stone-700 leading-relaxed">
                      <strong>Survivorship Censoring:</strong> Restricting evaluation to clients active
                      in the outcome month censors churned clients, so empirical results describe
                      surviving portfolios rather than deteriorating tenant relationships.
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2.5">
                    <span className="font-mono font-bold text-stone-500 mt-0.5">L4</span>
                    <div className="text-stone-700 leading-relaxed">
                      <strong>Eligibility Threshold Bias:</strong> Only pages visible in search console
                      data and meeting the volume filter (≥1,000 impr, ≥10 clicks) are covered;
                      absence from the queue is not evidence of page health.
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2.5">
                    <span className="font-mono font-bold text-stone-500 mt-0.5">L5</span>
                    <div className="text-stone-700 leading-relaxed">
                      <strong>Zero Causal Claims:</strong> No causal claim is made: we do not show
                      that refreshing a flagged page changes its outcome, which would require a
                      randomized controlled trial.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: ACTION PLAYBOOK & RANKED RECOMMENDATIONS */}
            <section id="playbook" className="space-y-6 pt-4 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                  <span className="text-blue-600 font-mono text-lg font-normal">7.</span>
                  <span>Ranked Recommendations (Action Playbook)</span>
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full font-sans w-fit">
                  Operational Guidelines
                </span>
              </div>

              <div className="paper-prose">
                <p>
                  To bridge machine learning research into editorial operations, we synthesize the
                  paper&apos;s empirical findings into a ranked five-tier decision protocol. Content
                  teams should prioritize human review hours according to this explicit rubric:
                </p>
              </div>

              {/* 5 Ranked Playbook Tiers */}
              <div className="space-y-3 font-sans text-xs">
                <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">
                        1
                      </span>
                      Priority 1: High-Confidence Spiked Pages (Consensus Flag)
                    </span>
                    <span className="font-mono font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                      Deep Content Refresh
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-7">
                    Pages with a 3.3–7.0x click spike in Month 3 and high model probability. These
                    suffer a 68.9% historical decline rate due to transient search intent expiration.
                    Assign to Senior Content Strategist for comprehensive angle rework and internal
                    linking updates.
                  </p>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">
                        2
                      </span>
                      Priority 2: Durable Upward Momentum (False-Positive Suppression)
                    </span>
                    <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Monitoring Only (Do Not Touch)
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-7">
                    Pages whose Month 2 clicks are already ≥ 1.5x Month 1 clicks and sustain upward
                    growth. Error analysis proved these represent compound organic momentum rather than
                    mean reversion. <em>Prohibit rewriting</em> to avoid disrupting search crawler
                    re-indexing.
                  </p>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">
                        3
                      </span>
                      Priority 3: Flat History Drops (False-Negative Protection)
                    </span>
                    <span className="font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Human Editorial / Technical SEO Audit
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-7">
                    Pages with steady historical baseline that begin losing clicks quietly. The spike
                    rule misses 100% of these cases (+0 pts). Dispatch to technical SEO to inspect
                    schema decay, keyword cannibalization, or core web vitals regressions.
                  </p>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">
                        4
                      </span>
                      Priority 4: Strict Queue Budget Boundary (Cap at K ≤ 50–75)
                    </span>
                    <span className="font-mono font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                      Enforce K ≤ 50 Review Limit
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-7">
                    Figure 1 proves that HistGradientBoosting outperforms the rule only for K ≤ 75.
                    Never expand model queues beyond 75 items without reverting to the rule or hybrid
                    blending, as precision degrades toward the base rate.
                  </p>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">
                        5
                      </span>
                      Priority 5: Automated Distribution Drift Circuit Breaker
                    </span>
                    <span className="font-mono font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Pause Release if Shift &gt; ±0.10
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-7">
                    Figure 2 demonstrated a massive +0.239 base rate jump in June 2026. If post-label
                    monitoring observes a cohort base rate outside 0.416 ± 0.10, immediately pause
                    automated dispatch and perform a manual macro-environment inspection.
                  </p>
                </div>
              </div>

              {/* INTERACTIVE PLAYBOOK SIMULATOR */}
              <PlaybookSimulator />
            </section>

            {/* SECTION 8: REPRODUCIBILITY STATEMENT */}
            <section id="reproducibility" className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-serif font-bold text-stone-950 flex items-baseline gap-2">
                <span className="text-stone-400 font-mono text-lg font-normal">8.</span>
                <span>Reproducibility Statement</span>
              </h2>

              <div className="paper-prose">
                <p>
                  All empirical experiments were conducted using <strong>Python 3.13</strong>,{' '}
                  <strong>scikit-learn 1.9.0</strong>, <strong>pandas 3.0.3</strong>, and{' '}
                  <strong>DuckDB 1.5.4</strong>, with random seed <code>42</code> fixed for all
                  stochastic components. The warehouse data release is strictly revision-pinned.
                </p>

                <div className="p-4 bg-stone-100/70 border border-stone-200 rounded-xl font-mono text-xs text-stone-800 space-y-2.5 my-4">
                  <div className="font-bold text-stone-900 font-sans uppercase tracking-wider text-[11px]">
                    Sequential Notebook Execution Order:
                  </div>
                  <div className="pl-3 border-l-2 border-stone-400 space-y-1.5">
                    <div>
                      <code>w03_data.ipynb</code> — Warehouse ingest, schema verification, and eligibility
                      filtering.
                    </div>
                    <div>
                      <code>w04_features.ipynb</code> — 11-feature pipeline assembly &amp; leakage
                      boundary verification.
                    </div>
                    <div>
                      <code>w05_model.ipynb</code> — Generates Table 1 (GroupKFold model comparison).
                    </div>
                    <div>
                      <code>w06_evaluation.ipynb</code> — Walk-forward temporal evaluation &amp; rank
                      normalization.
                    </div>
                    <div>
                      <code>w07_action_playbook.ipynb</code> — Generates Figure 1 (Precision@K curve)
                      &amp; routing rules.
                    </div>
                    <div>
                      <code>capstone.ipynb</code> — Sealed-month cell executed exactly once to produce
                      Figure 2.
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-stone-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-sans block">
                      Source Code &amp; Notebooks Repository
                    </span>
                    <a
                      href="https://github.com/Hassan-tech-pro/ml-internship/tree/main/work/notebooks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-stone-900 hover:underline break-all mt-0.5 inline-block"
                    >
                      github.com/Hassan-tech-pro/ml-internship/tree/main/work/notebooks
                    </a>
                  </div>

                  <a
                    href="https://github.com/Hassan-tech-pro/ml-internship/tree/main/work/notebooks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-stone-100 text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors shrink-0"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Notebooks</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 9: ACKNOWLEDGMENTS & DATA CREDIT */}
            <section
              id="acknowledgments"
              className="p-6 bg-stone-100/70 border border-stone-200 rounded-2xl space-y-3"
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600 font-sans">
                Acknowledgments &amp; Data Credit
              </h2>
              <p className="paper-prose text-stone-800 leading-relaxed font-serif text-[1.0625rem]">
                Built on the{' '}
                <a
                  href="https://flyrank.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-950 font-bold underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900 transition-colors"
                >
                  FlyRank ML Internship dataset
                </a>
                .
              </p>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Crediting your data source is standard research practice. The author thanks the
                FlyRank engineering and research team for curating the 78.8M row pseudonymized search
                intelligence warehouse, providing compute infrastructure, and auditing cross-validation
                boundaries.
              </p>
            </section>

            {/* SECTION 10: REFERENCES */}
            <section id="references" className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-xl font-serif font-bold text-stone-950">References</h2>
              <div className="space-y-3 font-serif text-xs text-stone-700 leading-relaxed pl-2">
                <div>
                  <span className="font-mono font-bold text-stone-900 mr-2">[1]</span>
                  <span>
                    M. Zinkevich. <em>Rules of Machine Learning: Best Practices for ML Engineering</em>
                    . Google, 2017.
                  </span>
                </div>
                <div>
                  <span className="font-mono font-bold text-stone-900 mr-2">[2]</span>
                  <span>
                    scikit-learn developers.{' '}
                    <code>sklearn.model_selection.GroupKFold</code>. scikit-learn documentation.
                  </span>
                </div>
                <div>
                  <span className="font-mono font-bold text-stone-900 mr-2">[3]</span>
                  <span>
                    scikit-learn developers.{' '}
                    <code>sklearn.ensemble.HistGradientBoostingClassifier</code>. scikit-learn
                    documentation.
                  </span>
                </div>
                <div>
                  <span className="font-mono font-bold text-stone-900 mr-2">[4]</span>
                  <span>
                    NeurIPS. <em>NeurIPS Paper Checklist Guidelines</em>. Conference on Neural
                    Information Processing Systems.
                  </span>
                </div>
              </div>
            </section>
          </article>
        </div>
      )}

        {/* Paper Footer */}
        <footer className="mt-16 pt-8 border-t border-stone-200 text-xs text-stone-500 font-sans flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <div>
            <span>© 2026 Hassan Ali Imran. All rights reserved.</span>
            <span className="mx-2">·</span>
            <span>FlyRank ML Internship Research Artifact</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://flyrank.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 hover:text-stone-950 font-medium underline underline-offset-2"
            >
              flyrank.ai
            </a>
            <a
              href="https://github.com/Hassan-tech-pro/ml-internship/tree/main/work/notebooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 hover:text-stone-950 font-medium underline underline-offset-2"
            >
              GitHub Notebooks
            </a>
            <button
              onClick={() => setIsCiteModalOpen(true)}
              className="text-stone-700 hover:text-stone-950 font-medium underline underline-offset-2 cursor-pointer"
            >
              Cite
            </button>
          </div>
        </footer>
      </div>

      {/* BibTeX Citation Modal */}
      <BibTeXModal isOpen={isCiteModalOpen} onClose={() => setIsCiteModalOpen(false)} />
    </div>
  );
}
