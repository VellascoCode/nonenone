export enum AlertType {
  GROW_ME = 'GROW_ME',
  SHRINK_ME = 'SHRINK_ME',
  RABBIT_HOLE = 'RABBIT_HOLE',
  MAD_TEA_PARTY = 'MAD_TEA_PARTY',
  QUEEN_ALERT = 'QUEEN_ALERT',
  WHALE_WATCH = 'WHALE_WATCH',
  SMART_MONEY = 'SMART_MONEY',
  MEMPOOL_SURGE = 'MEMPOOL_SURGE'
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED'
}

export type RiskTier = 1 | 2 | 3;

export interface Badge {
  code: string;
  label: string;
  description: string;
  emoji: string;
}

export type Guardian = 'QUEEN_OF_HEARTS' | 'CHESHIRE_CAT' | 'WHITE_RABBIT';
export type GuardianVerdict = 'APPROVED' | 'BLOCKED' | 'NEEDS_ATTENTION';

export interface RiskCheck {
  guardian: Guardian;
  verdict: GuardianVerdict;
  notes: string;
}

export type TriggerModule = 'WHITE_RABBIT' | 'CHESHIRE_CAT' | 'MAD_HATTER' | 'EXTERNAL_FEED';

export interface TriggerInfo {
  module: TriggerModule;
  description: string;
  detectedAt: Date;
}

export interface GaleConfig {
  enabled: boolean;
  currentRound: number;
  maxRounds: number;
  multiplier: number;
}

export interface AlertMetrics {
  price?: number;
  priceChangePercent?: number;
  volumeChangePercent?: number;
  liquidityChangePercent?: number;
  scamScore?: number;
}

export interface Alert {
  id: string;
  type: AlertType;
  status: AlertStatus;
  tier: RiskTier;
  title: string;
  narrative: string;
  triggeredAt: Date;
  trigger: TriggerInfo;
  badges: Badge[];
  metrics?: AlertMetrics;
  riskChecks: RiskCheck[];
  recommendedActions: string[];
  gale?: GaleConfig;
  sources: string[];
}

export type CreateAlertInput = Omit<Alert, 'id' | 'status' | 'triggeredAt'>;

export interface AlertFilter {
  type?: AlertType;
  status?: AlertStatus;
  tier?: RiskTier;
}

export interface ModuleStatus {
  module: 'WHITE_RABBIT' | 'CHESHIRE_CAT' | 'MAD_HATTER' | 'QUEEN_OF_HEARTS';
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  heartbeatAt: Date;
  notes: string;
}
