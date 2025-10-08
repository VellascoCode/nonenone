import { randomUUID } from 'crypto';
import {
  Alert,
  AlertFilter,
  AlertStatus,
  AlertType,
  CreateAlertInput,
  RiskTier
} from '../domain/alerts.js';

export class AlertService {
  private readonly alerts = new Map<string, Alert>();

  create(payload: CreateAlertInput): Alert {
    const id = randomUUID();
    const alert: Alert = {
      ...payload,
      badges: payload.badges.map((badge) => ({ ...badge })),
      riskChecks: payload.riskChecks.map((check) => ({ ...check })),
      recommendedActions: [...payload.recommendedActions],
      sources: [...payload.sources],
      metrics: payload.metrics ? { ...payload.metrics } : undefined,
      gale: payload.gale ? { ...payload.gale } : undefined,
      id,
      status: AlertStatus.ACTIVE,
      triggeredAt: new Date(),
      trigger: { ...payload.trigger }
    };
    this.alerts.set(id, alert);
    return alert;
  }

  list(filter?: AlertFilter): Alert[] {
    const results: Alert[] = [];
    for (const alert of this.alerts.values()) {
      if (!this.matchesFilter(alert, filter)) {
        continue;
      }
      const cloned = this.getById(alert.id);
      if (cloned) {
        results.push(cloned);
      }
    }
    return results;
  }

  getById(id: string): Alert | undefined {
    const alert = this.alerts.get(id);
    if (!alert) {
      return undefined;
    }
    return {
      ...alert,
      trigger: { ...alert.trigger },
      badges: alert.badges.map((badge) => ({ ...badge })),
      riskChecks: alert.riskChecks.map((check) => ({ ...check })),
      recommendedActions: [...alert.recommendedActions],
      sources: [...alert.sources],
      metrics: alert.metrics ? { ...alert.metrics } : undefined,
      gale: alert.gale ? { ...alert.gale } : undefined
    };
  }

  updateStatus(id: string, status: AlertStatus): Alert {
    const existing = this.alerts.get(id);
    if (!existing) {
      throw new Error(`Alert ${id} not found`);
    }
    const updated: Alert = { ...existing, status };
    this.alerts.set(id, updated);
    const cloned = this.getById(id);
    if (!cloned) {
      throw new Error(`Alert ${id} not found`);
    }
    return cloned;
  }

  seedInitialAlerts(): void {
    if (this.alerts.size > 0) {
      return;
    }

    const baseTrigger = {
      module: 'WHITE_RABBIT' as const,
      description: 'Variação de preço detectada nas últimas 2 horas',
      detectedAt: new Date()
    };

    this.create({
      type: AlertType.GROW_ME,
      tier: 2 satisfies RiskTier,
      title: 'Poção Cresça-Me: Pump em WONDER/USDT',
      narrative:
        'O Coelho Branco encontrou uma alta acelerada de 12% em 30 minutos. O Gato de Cheshire validou fundamentos e a Rainha autorizou o aviso.',
      trigger: baseTrigger,
      badges: [
        { code: 'SMART_MONEY', label: 'Smart Money', description: 'Carteiras experientes comprando', emoji: '💰' },
        { code: 'VOLUME_SPIKE', label: 'Volume Spike', description: 'Volume 4x acima da média', emoji: '📈' }
      ],
      metrics: {
        price: 2.45,
        priceChangePercent: 12.1,
        volumeChangePercent: 310,
        scamScore: 18
      },
      riskChecks: [
        { guardian: 'QUEEN_OF_HEARTS', verdict: 'APPROVED', notes: 'Liquidez e SCAM Score dentro dos limites' }
      ],
      recommendedActions: [
        'Avaliar entrada escalonada',
        'Definir stop na retração de 4%',
        'Monitorar badge Smart Money por mais 15 minutos'
      ],
      gale: {
        enabled: true,
        currentRound: 0,
        maxRounds: 2,
        multiplier: 2
      },
      sources: ['https://wonderland.bot/alerts/wonder-usdt']
    });

    this.create({
      type: AlertType.QUEEN_ALERT,
      tier: 3 satisfies RiskTier,
      title: 'Rainha de Copas em ação: Bloqueio de token suspeito',
      narrative:
        'O Gato de Cheshire identificou SCAM Score 82 e liquidez travada. A Rainha ordenou cortar a cabeça do sinal.',
      trigger: {
        ...baseTrigger,
        module: 'CHESHIRE_CAT',
        description: 'Análise on-chain detectou riscos elevados'
      },
      badges: [
        { code: 'SCAM_RISK', label: 'SCAM Score Alto', description: 'Contrato com riscos críticos', emoji: '⚠️' }
      ],
      metrics: {
        liquidityChangePercent: -65,
        scamScore: 82
      },
      riskChecks: [
        { guardian: 'QUEEN_OF_HEARTS', verdict: 'BLOCKED', notes: 'Venda impedida enquanto contrato não provar solvência' }
      ],
      recommendedActions: [
        'Evitar interação com o contrato',
        'Monitorar canais oficiais por pronunciamento'
      ],
      gale: {
        enabled: false,
        currentRound: 0,
        maxRounds: 0,
        multiplier: 2
      },
      sources: ['https://wonderland.bot/alerts/queen']
    });
  }

  private matchesFilter(alert: Alert, filter?: AlertFilter): boolean {
    if (!filter) {
      return true;
    }
    if (filter.type && alert.type !== filter.type) {
      return false;
    }
    if (filter.status && alert.status !== filter.status) {
      return false;
    }
    if (filter.tier && alert.tier !== filter.tier) {
      return false;
    }
    return true;
  }
}

export const alertService = new AlertService();
