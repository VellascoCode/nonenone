import assert from 'node:assert/strict';
import { AddressInfo } from 'node:net';
import test from 'node:test';
import { createServer } from '../src/app.js';

test('Wonderland Trading Bot API fluxo completo', async (t) => {
  const server = createServer();
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  t.after(() => {
    server.close();
  });

  const listResponse = await fetch(`${baseUrl}/api/alerts`);
  assert.equal(listResponse.status, 200);
  const alerts = (await listResponse.json()) as unknown[];
  assert.ok(Array.isArray(alerts));
  assert.ok(alerts.length > 0);

  const payload = {
    type: 'RABBIT_HOLE',
    tier: 3,
    title: 'Nova toca detectada em token experimental',
    narrative: 'Rabbit encontrou liquidez recém criada, Cheshire recomenda cautela.',
    trigger: {
      module: 'WHITE_RABBIT',
      description: 'Token listado há menos de 10 minutos',
      detectedAt: new Date().toISOString()
    },
    badges: [
      {
        code: 'DISCOVERY',
        label: 'Descoberta',
        description: 'Novo contrato emergente',
        emoji: '🕳'
      }
    ],
    riskChecks: [
      {
        guardian: 'QUEEN_OF_HEARTS',
        verdict: 'NEEDS_ATTENTION',
        notes: 'Contrato sem auditoria, Gale bloqueado'
      }
    ],
    recommendedActions: ['Seguir o coelho com capital experimental'],
    sources: ['https://wonderland.bot/alerts/rabbit-hole']
  } satisfies Record<string, unknown>;

  const creationResponse = await fetch(`${baseUrl}/api/alerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  assert.equal(creationResponse.status, 201);
  const created = (await creationResponse.json()) as { id: string };
  assert.ok(created.id);

  const fetchResponse = await fetch(`${baseUrl}/api/alerts/${created.id}`);
  assert.equal(fetchResponse.status, 200);
  const fetched = (await fetchResponse.json()) as { id: string };
  assert.equal(fetched.id, created.id);

  const acknowledgeResponse = await fetch(`${baseUrl}/api/alerts/${created.id}/acknowledge`, {
    method: 'POST'
  });
  assert.equal(acknowledgeResponse.status, 200);

  const statusResponse = await fetch(`${baseUrl}/api/modules/status`);
  assert.equal(statusResponse.status, 200);
  const statuses = (await statusResponse.json()) as Array<{ module: string }>;
  assert.ok(statuses.some((status) => status.module === 'WHITE_RABBIT'));
});
