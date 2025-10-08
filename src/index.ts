import { createServer } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const server = createServer();

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Wonderland Trading Bot API escutando na porta ${port}`);
});
