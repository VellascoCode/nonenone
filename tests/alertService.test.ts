import assert from 'node:assert/strict';
import test from 'node:test';
import { AlertStatus, AlertType, RiskTier } from '../src/domain/alerts.js';
import { AlertService } from '../src/services/AlertService.js';

test('AlertService cria e retorna alertas com tipos fortes', () => {
  const service = new AlertService();
  const alert = service.create({
    type: AlertType.MAD_TEA_PARTY,
    tier: 1 satisfies RiskTier,
    title: 'Confluência encantada',
    narrative: 'Rabbit, Cheshire e Smart Money concordam com a festa.',
    trigger: {
      module: 'WHITE_RABBIT',
      description: 'Duas confirmações de momentum e badge Smart Money',
      detectedAt: new Date()
    },
    badges: [
      { code: 'CONFLUENCE', label: 'Confluência', description: 'Múltiplos sinais alinhados', emoji: '🎉' }
    ],
    metrics: {
      price: 1.23,
      priceChangePercent: 4.5
    },
    riskChecks: [
      { guardian: 'QUEEN_OF_HEARTS', verdict: 'APPROVED', notes: 'Risco dentro do Tier1' }
    ],
    recommendedActions: ['Executar entrada parcial'],
    gale: {
      enabled: true,
      currentRound: 0,
      maxRounds: 1,
      multiplier: 2
    },
    sources: ['https://wonderland.bot/alerts/mad-tea-party']
  });

  assert.match(alert.id, /[0-9a-f\-]{36}/i);
  assert.equal(alert.type, AlertType.MAD_TEA_PARTY);
  assert.equal(alert.status, AlertStatus.ACTIVE);
  assert.equal(service.list().length, 1);
});

test('AlertService atualiza status mantendo histórico', () => {
  const service = new AlertService();
  const alert = service.create({
    type: AlertType.SHRINK_ME,
    tier: 2 satisfies RiskTier,
    title: 'Poção Encolha-Me',
    narrative: 'Dump acelerado detectado pelo Coelho Branco.',
    trigger: {
      module: 'WHITE_RABBIT',
      description: 'Queda de 8% em 10 minutos',
      detectedAt: new Date()
    },
    badges: [
      { code: 'VOLATILITY', label: 'Volatilidade', description: 'Mercado instável', emoji: '🌪️' }
    ],
    riskChecks: [
      { guardian: 'CHESHIRE_CAT', verdict: 'NEEDS_ATTENTION', notes: 'SCAM Score elevado' }
    ],
    recommendedActions: ['Avaliar hedge imediato'],
    sources: ['https://wonderland.bot/alerts/shrink']
  });

  const acknowledged = service.updateStatus(alert.id, AlertStatus.ACKNOWLEDGED);
  assert.equal(acknowledged.status, AlertStatus.ACKNOWLEDGED);
  const resolved = service.updateStatus(alert.id, AlertStatus.RESOLVED);
  assert.equal(resolved.status, AlertStatus.RESOLVED);
});
