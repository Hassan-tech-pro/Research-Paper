import React, { useState } from 'react';
import { PlaybookSimulationInput, PlaybookSimulationResult } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Eye, HelpCircle } from 'lucide-react';

const PRESETS: Record<string, PlaybookSimulationInput> = {
  'spiked-reversion': {
    m1Clicks: 80,
    m2Clicks: 140,
    m3Clicks: 360, // 4.5x spike (in 3.3-7x sweet spot)
    m1Impressions: 4200,
    m3Impressions: 12500,
    averagePosition: 6.4,
    isNewPage: false,
  },
  'durable-momentum': {
    m1Clicks: 50,
    m2Clicks: 110, // 2.2x momentum
    m3Clicks: 175, // continued climb
    m1Impressions: 3000,
    m3Impressions: 7800,
    averagePosition: 8.2,
    isNewPage: false,
  },
  'flat-silent-drop': {
    m1Clicks: 120,
    m2Clicks: 118,
    m3Clicks: 115, // flat history, sudden drop incoming
    m1Impressions: 5500,
    m3Impressions: 5200,
    averagePosition: 4.8,
    isNewPage: false,
  },
  'stable-evergreen': {
    m1Clicks: 210,
    m2Clicks: 215,
    m3Clicks: 208,
    m1Impressions: 9000,
    m3Impressions: 8900,
    averagePosition: 3.2,
    isNewPage: false,
  },
};

export const PlaybookSimulator: React.FC = () => {
  const [input, setInput] = useState<PlaybookSimulationInput>(PRESETS['spiked-reversion']);
  const [activePreset, setActivePreset] = useState<string>('spiked-reversion');

  // Compute metrics based on paper's exact logic
  const spikeRatio = input.m1Clicks > 0 ? input.m3Clicks / input.m1Clicks : 0;
  const momentum = input.m1Clicks > 0 ? input.m2Clicks / input.m1Clicks : 0;
  const totalClicks90d = input.m1Clicks + input.m2Clicks + input.m3Clicks;
  const totalImpr90d = input.m1Impressions + (input.m1Impressions + input.m3Impressions) / 2 + input.m3Impressions;
  const ctr90d = totalImpr90d > 0 ? totalClicks90d / totalImpr90d : 0;

  // Audited Rule logic from paper Section 4.1:
  // Spike in 3.3-7x -> +3 points (decline rate 0.689)
  // Extreme spike > 7x -> +2 points (decline rate 0.503)
  // Rising trend (m3 > m1) -> +1 point
  let rulePoints = 0;
  let ruleTier = 'No Rule Trigger';

  if (spikeRatio >= 3.3 && spikeRatio <= 7.0) {
    rulePoints += 3;
    ruleTier = 'Spike Range (3.3x–7x)';
  } else if (spikeRatio > 7.0) {
    rulePoints += 2;
    ruleTier = 'Extreme Spike (>7x)';
  }

  if (input.m3Clicks > input.m1Clicks) {
    rulePoints += 1;
  }

  // Model probability simulation (approximating HistGradientBoosting learned boundaries)
  let rawScore = 0.416; // base rate anchor

  if (spikeRatio >= 3.3 && spikeRatio <= 7.0) {
    rawScore += 0.28;
  } else if (spikeRatio > 7.0) {
    rawScore += 0.12;
  }

  // Durable upward momentum dampening (Section 5.3 Error Analysis finding:
  // pages with m2 >= 1.5 * m1 show momentum without subsequent reversion)
  const isDurableMomentum = momentum >= 1.5 && input.m3Clicks >= input.m2Clicks;
  if (isDurableMomentum) {
    rawScore -= 0.18;
  }

  // Flat history penalty/risk check
  const isFlatHistory = Math.abs(input.m3Clicks - input.m1Clicks) / Math.max(1, input.m1Clicks) < 0.15;

  const modelProbability = Math.max(0.12, Math.min(0.89, rawScore));

  // Determine Playbook routing policy (Section 5.3 & Section 7)
  let result: PlaybookSimulationResult;

  if (isDurableMomentum) {
    result = {
      spikeRatio,
      momentum,
      ctr90d,
      rulePoints,
      ruleTier,
      modelProbability,
      recommendedAction: 'ROUTE TO MONITORING (DO NOT REWRITE)',
      actionQueue: 'Monitoring Only (Do Not Rewrite)',
      actionReason:
        'Error Analysis finding: Middle-month clicks already ≥ 1.5x first-month clicks indicate organic momentum rather than transient spike reversion. Rewriting risks degrading search engine rankings.',
      confidenceScore: 'High',
    };
  } else if (rulePoints >= 3 || modelProbability >= 0.65) {
    result = {
      spikeRatio,
      momentum,
      ctr90d,
      rulePoints,
      ruleTier,
      modelProbability,
      recommendedAction: 'DISPATCH TO TOP-50 CONTENT REFRESH QUEUE',
      actionQueue: 'Deep Content Refresh',
      actionReason:
        'High probability of severe mean-reversion decline (>68% empirical rate). Final-month click volume was inflated by a temporary spike. Prioritize in editorial triage budget.',
      confidenceScore: 'High',
    };
  } else if (isFlatHistory && input.m3Clicks < input.m1Clicks) {
    result = {
      spikeRatio,
      momentum,
      ctr90d,
      rulePoints,
      ruleTier,
      modelProbability,
      recommendedAction: 'ROUTE TO HUMAN QUALITATIVE / TECHNICAL SEO AUDIT',
      actionQueue: 'Editorial Qualitative Audit',
      actionReason:
        'High-confidence false negative profile: Flat history with quiet decline. The rule assigns zero points, but search cannibalization or technical indexing issues may be present.',
      confidenceScore: 'Medium',
    };
  } else {
    result = {
      spikeRatio,
      momentum,
      ctr90d,
      rulePoints,
      ruleTier,
      modelProbability,
      recommendedAction: 'RETAIN IN STANDARD MONITORING',
      actionQueue: 'Standard Low Priority',
      actionReason:
        'Decline risk is near or below base rate (0.416). Does not warrant spending one of the 50 monthly manual review slots.',
      confidenceScore: 'Low',
    };
  }

  const loadPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    setInput(PRESETS[presetKey]);
  };

  return (
    <div className="my-8 bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
            Interactive Playbook Simulator · Section 7
          </span>
          <h4 className="text-base font-serif font-semibold text-stone-900 mt-0.5">
            Operational Triage & Decision Routing Engine
          </h4>
        </div>

        {/* Preset scenario picker */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => loadPreset('spiked-reversion')}
            className={`px-2.5 py-1 text-xs font-sans font-medium rounded-md transition-colors ${
              activePreset === 'spiked-reversion'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Spike Reversion
          </button>
          <button
            onClick={() => loadPreset('durable-momentum')}
            className={`px-2.5 py-1 text-xs font-sans font-medium rounded-md transition-colors ${
              activePreset === 'durable-momentum'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Durable Rise
          </button>
          <button
            onClick={() => loadPreset('flat-silent-drop')}
            className={`px-2.5 py-1 text-xs font-sans font-medium rounded-md transition-colors ${
              activePreset === 'flat-silent-drop'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Flat Anomaly
          </button>
          <button
            onClick={() => loadPreset('stable-evergreen')}
            className={`px-2.5 py-1 text-xs font-sans font-medium rounded-md transition-colors ${
              activePreset === 'stable-evergreen'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Evergreen
          </button>
        </div>
      </div>

      {/* Simulator Inputs & Calculations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Input Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Page Historical Metrics (Feature Window)
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Month 1 Clicks
              </label>
              <input
                type="number"
                min="0"
                value={input.m1Clicks}
                onChange={(e) => {
                  setActivePreset('');
                  setInput({ ...input, m1Clicks: Number(e.target.value) || 0 });
                }}
                className="w-full px-2.5 py-1.5 text-xs font-mono border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Month 2 Clicks
              </label>
              <input
                type="number"
                min="0"
                value={input.m2Clicks}
                onChange={(e) => {
                  setActivePreset('');
                  setInput({ ...input, m2Clicks: Number(e.target.value) || 0 });
                }}
                className="w-full px-2.5 py-1.5 text-xs font-mono border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Month 3 Clicks
              </label>
              <input
                type="number"
                min="0"
                value={input.m3Clicks}
                onChange={(e) => {
                  setActivePreset('');
                  setInput({ ...input, m3Clicks: Number(e.target.value) || 0 });
                }}
                className="w-full px-2.5 py-1.5 text-xs font-mono border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Month 3 Impressions
              </label>
              <input
                type="number"
                min="0"
                value={input.m3Impressions}
                onChange={(e) => {
                  setActivePreset('');
                  setInput({ ...input, m3Impressions: Number(e.target.value) || 0 });
                }}
                className="w-full px-2.5 py-1.5 text-xs font-mono border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Average Position
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="100"
                value={input.averagePosition}
                onChange={(e) => {
                  setActivePreset('');
                  setInput({ ...input, averagePosition: Number(e.target.value) || 1 });
                }}
                className="w-full px-2.5 py-1.5 text-xs font-mono border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-stone-800"
              />
            </div>
          </div>

          {/* Derived Features Strip */}
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-600">
              <span>Spike Ratio (M3 / M1):</span>
              <span className="font-mono font-semibold text-stone-900 tabular-nums">
                {spikeRatio.toFixed(2)}x
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>Momentum Ratio (M2 / M1):</span>
              <span className="font-mono font-semibold text-stone-900 tabular-nums">
                {momentum.toFixed(2)}x
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>Audited Rule Score:</span>
              <span className="font-mono font-semibold text-stone-900 tabular-nums">
                +{rulePoints} pts ({ruleTier})
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>HistGradientBoosting Prob:</span>
              <span className="font-mono font-bold text-stone-900 tabular-nums">
                {(modelProbability * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Playbook Triage Routing Result (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 bg-[#FBF9F5] border border-stone-200 rounded-xl">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans">
                Automated Routing Policy
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded font-sans ${
                  result.actionQueue === 'Deep Content Refresh'
                    ? 'bg-red-100 text-red-800'
                    : result.actionQueue === 'Monitoring Only (Do Not Rewrite)'
                    ? 'bg-blue-100 text-blue-800'
                    : result.actionQueue === 'Editorial Qualitative Audit'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-stone-200 text-stone-700'
                }`}
              >
                {result.actionQueue}
              </span>
            </div>

            <h5 className="text-base font-serif font-bold text-stone-900 mt-2 flex items-center gap-2">
              {result.actionQueue === 'Deep Content Refresh' && (
                <Sparkles className="w-5 h-5 text-red-600 shrink-0" />
              )}
              {result.actionQueue === 'Monitoring Only (Do Not Rewrite)' && (
                <Eye className="w-5 h-5 text-blue-600 shrink-0" />
              )}
              {result.actionQueue === 'Editorial Qualitative Audit' && (
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              {result.actionQueue === 'Standard Low Priority' && (
                <CheckCircle2 className="w-5 h-5 text-stone-500 shrink-0" />
              )}
              <span>{result.recommendedAction}</span>
            </h5>

            <div className="mt-3 p-3.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-700 leading-relaxed font-sans">
              <strong className="text-stone-900 block mb-1">Paper Empirical Rationale:</strong>
              {result.actionReason}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Human Review Slot: 1 of 50 monthly budget</span>
            <span className="flex items-center gap-1 font-medium text-stone-800">
              Rule + Model Synthesis <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
