import {
  AlertFilter,
  AlertType,
  AlertMetrics,
  Badge,
  CreateAlertInput,
  GaleConfig,
  RiskCheck,
  RiskTier,
  TriggerInfo
} from '../domain/alerts.js';

interface UnknownRecord {
  [key: string]: unknown;
}

const alertTypeValues = new Set(Object.values(AlertType));
const guardianValues = new Set(['QUEEN_OF_HEARTS', 'CHESHIRE_CAT', 'WHITE_RABBIT']);
const guardianVerdicts = new Set(['APPROVED', 'BLOCKED', 'NEEDS_ATTENTION']);
const triggerModules = new Set(['WHITE_RABBIT', 'CHESHIRE_CAT', 'MAD_HATTER', 'EXTERNAL_FEED']);

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isRiskTier = (value: unknown): value is RiskTier => value === 1 || value === 2 || value === 3;

export const parseAlertFilter = (query: UnknownRecord): AlertFilter => {
  const filter: AlertFilter = {};
  if (typeof query.type === 'string' && alertTypeValues.has(query.type as AlertType)) {
    filter.type = query.type as AlertType;
  }
  if (typeof query.status === 'string' && (query.status === 'ACTIVE' || query.status === 'ACKNOWLEDGED' || query.status === 'RESOLVED')) {
    filter.status = query.status as AlertFilter['status'];
  }
  if (typeof query.tier !== 'undefined') {
    const tierNumber = Number(query.tier);
    if (isRiskTier(tierNumber)) {
      filter.tier = tierNumber;
    }
  }
  return filter;
};

export const parseCreateAlertPayload = (body: unknown): CreateAlertInput => {
  if (!isRecord(body)) {
    throw new Error('Payload inválido. Envie um objeto JSON.');
  }

  const {
    type,
    tier,
    title,
    narrative,
    trigger,
    badges,
    metrics,
    riskChecks,
    recommendedActions,
    gale,
    sources
  } = body;

  if (typeof type !== 'string' || !alertTypeValues.has(type as AlertType)) {
    throw new Error('Tipo de alerta inválido.');
  }
  if (!isRiskTier(tier)) {
    throw new Error('Tier de risco inválido.');
  }
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('Título obrigatório.');
  }
  if (typeof narrative !== 'string' || narrative.trim().length === 0) {
    throw new Error('Narrativa obrigatória.');
  }
  const parsedTrigger = parseTrigger(trigger);
  const parsedBadges = parseBadges(badges);
  const parsedRiskChecks = parseRiskChecks(riskChecks);
  const parsedRecommendedActions = parseRecommendedActions(recommendedActions);
  const parsedMetrics = parseMetrics(metrics);
  const parsedGale = parseGale(gale);
  const parsedSources = parseSources(sources);

  return {
    type: type as AlertType,
    tier,
    title,
    narrative,
    trigger: parsedTrigger,
    badges: parsedBadges,
    metrics: parsedMetrics,
    riskChecks: parsedRiskChecks,
    recommendedActions: parsedRecommendedActions,
    gale: parsedGale,
    sources: parsedSources
  };
};

const parseTrigger = (trigger: unknown): TriggerInfo => {
  if (!isRecord(trigger)) {
    throw new Error('Trigger inválido.');
  }
  const { module, description, detectedAt } = trigger;
  if (typeof module !== 'string' || !triggerModules.has(module)) {
    throw new Error('Trigger.module inválido.');
  }
  if (typeof description !== 'string' || description.trim().length === 0) {
    throw new Error('Trigger.description inválido.');
  }
  const detectedDate = parseDate(detectedAt);
  return {
    module: module as TriggerInfo['module'],
    description,
    detectedAt: detectedDate
  };
};

const parseBadges = (badges: unknown): Badge[] => {
  if (!Array.isArray(badges) || badges.length === 0) {
    throw new Error('Badges obrigatórios.');
  }
  return badges.map((item) => {
    if (!isRecord(item)) {
      throw new Error('Badge inválido.');
    }
    const { code, label, description, emoji } = item;
    if (typeof code !== 'string' || typeof label !== 'string' || typeof description !== 'string') {
      throw new Error('Badge deve conter code, label e description.');
    }
    if (typeof emoji !== 'string' || [...emoji].length !== 1) {
      throw new Error('Badge emoji deve conter apenas um símbolo.');
    }
    return { code, label, description, emoji };
  });
};

const parseRiskChecks = (riskChecks: unknown): RiskCheck[] => {
  if (!Array.isArray(riskChecks) || riskChecks.length === 0) {
    return [];
  }
  return riskChecks.map((item) => {
    if (!isRecord(item)) {
      throw new Error('Risk check inválido.');
    }
    const { guardian, verdict, notes } = item;
    if (typeof guardian !== 'string' || !guardianValues.has(guardian)) {
      throw new Error('Risk check guardian inválido.');
    }
    if (typeof verdict !== 'string' || !guardianVerdicts.has(verdict)) {
      throw new Error('Risk check verdict inválido.');
    }
    if (typeof notes !== 'string' || notes.trim().length === 0) {
      throw new Error('Risk check notes inválido.');
    }
    return { guardian: guardian as RiskCheck['guardian'], verdict: verdict as RiskCheck['verdict'], notes };
  });
};

const parseRecommendedActions = (actions: unknown): string[] => {
  if (typeof actions === 'undefined') {
    return [];
  }
  if (!Array.isArray(actions)) {
    throw new Error('recommendedActions deve ser uma lista.');
  }
  actions.forEach((action) => {
    if (typeof action !== 'string' || action.trim().length === 0) {
      throw new Error('Cada recommendedAction deve ser texto.');
    }
  });
  return actions as string[];
};

const parseMetrics = (metrics: unknown): AlertMetrics | undefined => {
  if (typeof metrics === 'undefined') {
    return undefined;
  }
  if (!isRecord(metrics)) {
    throw new Error('Metrics inválido.');
  }
  const allowedKeys = ['price', 'priceChangePercent', 'volumeChangePercent', 'liquidityChangePercent', 'scamScore'];
  const parsed: AlertMetrics = {};
  for (const key of allowedKeys) {
    const value = metrics[key];
    if (typeof value === 'undefined') {
      continue;
    }
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new Error(`Metric ${key} deve ser numérica.`);
    }
    (parsed as Record<string, number>)[key] = value;
  }
  return parsed;
};

const parseGale = (gale: unknown): GaleConfig | undefined => {
  if (typeof gale === 'undefined') {
    return undefined;
  }
  if (!isRecord(gale)) {
    throw new Error('Gale inválido.');
  }
  const { enabled, currentRound, maxRounds, multiplier } = gale;
  if (typeof enabled !== 'boolean') {
    throw new Error('Gale.enabled inválido.');
  }
  if (typeof currentRound !== 'number' || currentRound < 0) {
    throw new Error('Gale.currentRound inválido.');
  }
  if (typeof maxRounds !== 'number' || maxRounds < 0) {
    throw new Error('Gale.maxRounds inválido.');
  }
  if (typeof multiplier !== 'number' || multiplier <= 0) {
    throw new Error('Gale.multiplier inválido.');
  }
  return { enabled, currentRound, maxRounds, multiplier };
};

const parseSources = (sources: unknown) => {
  if (typeof sources === 'undefined') {
    return [];
  }
  if (!Array.isArray(sources)) {
    throw new Error('Sources deve ser uma lista.');
  }
  sources.forEach((source) => {
    if (typeof source !== 'string' || !source.startsWith('http')) {
      throw new Error('Cada source deve ser uma URL.');
    }
  });
  return sources as string[];
};

const parseDate = (value: unknown): Date => {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new Error('Data inválida.');
    }
    return date;
  }
  throw new Error('Data inválida.');
};

