export interface ModelResult {
  method: string;
  meanP50: number;
  sd: number;
  notes: string;
  foldScores?: number[];
  type: 'rule' | 'linear' | 'tree' | 'proposed';
}

export interface QueueDepthPoint {
  k: number;
  modelPrecision: number;
  rulePrecision: number;
  baseRate: number;
  modelDeclinersFound: number;
  ruleDeclinersFound: number;
  isMeasuredPoint?: boolean;
}

export interface PlaybookSimulationInput {
  m1Clicks: number;
  m2Clicks: number;
  m3Clicks: number; // final feature month
  m1Impressions: number;
  m3Impressions: number;
  averagePosition: number;
  isNewPage: boolean;
}

export interface PlaybookSimulationResult {
  spikeRatio: number;
  momentum: number;
  ctr90d: number;
  rulePoints: number;
  ruleTier: string;
  modelProbability: number;
  recommendedAction: string;
  actionQueue: 'Deep Content Refresh' | 'Monitoring Only (Do Not Rewrite)' | 'Editorial Qualitative Audit' | 'Standard Low Priority';
  actionReason: string;
  confidenceScore: 'High' | 'Medium' | 'Low';
}
