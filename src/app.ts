import http, { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import { Alert, AlertStatus } from './domain/alerts.js';
import { alertService } from './services/AlertService.js';
import { moduleStatusService } from './services/ModuleStatusService.js';
import { parseAlertFilter, parseCreateAlertPayload } from './utils/validation.js';

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8'
};

export const createServer = () => {
  alertService.seedInitialAlerts();

  return http.createServer(async (req, res) => {
    try {
      await routeRequest(req, res);
    } catch (error) {
      handleError(error, res);
    }
  });
};

const routeRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const method = req.method ?? 'GET';
  const requestUrl = req.url ?? '/';
  const url = new URL(requestUrl, 'http://localhost');
  const pathname = url.pathname;

  if (method === 'GET' && pathname === '/api/alerts') {
    const filters = parseAlertFilter(Object.fromEntries(url.searchParams.entries()));
    const alerts = alertService.list(filters).map(serializeAlert);
    return sendJson(res, 200, alerts);
  }

  if (method === 'POST' && pathname === '/api/alerts') {
    const body = await parseBody(req);
    const payload = parseCreateAlertPayload(body);
    const alert = alertService.create(payload);
    return sendJson(res, 201, serializeAlert(alert));
  }

  const alertIdMatch = pathname.match(/^\/api\/alerts\/(.+)$/);
  if (alertIdMatch) {
    const [, remainder] = alertIdMatch;
    if (method === 'GET') {
      const alert = alertService.getById(remainder);
      if (!alert) {
        return sendJson(res, 404, { message: 'Alerta não encontrado' });
      }
      return sendJson(res, 200, serializeAlert(alert));
    }

    if (method === 'POST' && remainder.endsWith('/acknowledge')) {
      const alertId = remainder.replace(/\/acknowledge$/, '');
      return sendJson(res, 200, serializeAlert(alertService.updateStatus(alertId, AlertStatus.ACKNOWLEDGED)));
    }

    if (method === 'POST' && remainder.endsWith('/resolve')) {
      const alertId = remainder.replace(/\/resolve$/, '');
      return sendJson(res, 200, serializeAlert(alertService.updateStatus(alertId, AlertStatus.RESOLVED)));
    }
  }

  if (method === 'GET' && pathname === '/api/modules/status') {
    const statuses = moduleStatusService.list().map((status) => ({
      ...status,
      heartbeatAt: status.heartbeatAt.toISOString()
    }));
    return sendJson(res, 200, statuses);
  }

  if (method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, { status: 'ok', checkedAt: new Date().toISOString() });
  }

  sendJson(res, 404, { message: 'Rota não encontrada' });
};

const parseBody = async (req: IncomingMessage): Promise<unknown> => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    if (typeof chunk === 'string') {
      chunks.push(Buffer.from(chunk));
    } else {
      chunks.push(chunk);
    }
  }
  if (chunks.length === 0) {
    return {};
  }
  const raw = Buffer.concat(chunks).toString('utf-8');
  if (raw.trim().length === 0) {
    return {};
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error('Não foi possível ler o corpo da requisição.');
  }
};

const serializeAlert = (alert: Alert) => ({
  ...alert,
  triggeredAt: alert.triggeredAt.toISOString(),
  trigger: {
    ...alert.trigger,
    detectedAt: alert.trigger.detectedAt.toISOString()
  }
});

const sendJson = (res: ServerResponse, status: number, payload: unknown) => {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, JSON_HEADERS);
  res.end(body);
};

const handleError = (error: unknown, res: ServerResponse) => {
  if (error instanceof Error) {
    const normalized = error.message.toLowerCase();
    const status = normalized.includes('não encontrado') || normalized.includes('not found') ? 404 : 400;
    sendJson(res, status, { message: error.message });
    return;
  }
  sendJson(res, 500, { message: 'Erro inesperado' });
};

export const startServer = (port: number) => {
  const server = createServer();
  server.listen(port);
  return server;
};

