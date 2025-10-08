import { ModuleStatus } from '../domain/alerts.js';

const moduleHeartbeats: ModuleStatus[] = [
  {
    module: 'WHITE_RABBIT',
    status: 'ONLINE',
    heartbeatAt: new Date(),
    notes: 'Scan de mercado executando a cada 30 segundos'
  },
  {
    module: 'CHESHIRE_CAT',
    status: 'ONLINE',
    heartbeatAt: new Date(),
    notes: 'Análises on-chain e SCAM Score atualizados'
  },
  {
    module: 'MAD_HATTER',
    status: 'DEGRADED',
    heartbeatAt: new Date(),
    notes: 'Execução de Gale limitada ao round 1 por manutenção'
  },
  {
    module: 'QUEEN_OF_HEARTS',
    status: 'ONLINE',
    heartbeatAt: new Date(),
    notes: 'Guardrails de risco com limites revisados nesta manhã'
  }
];

export class ModuleStatusService {
  list(): ModuleStatus[] {
    return moduleHeartbeats.map((status) => ({ ...status }));
  }
}

export const moduleStatusService = new ModuleStatusService();
