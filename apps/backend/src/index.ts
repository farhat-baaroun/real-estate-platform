import Fastify from 'fastify';

const server = Fastify();
const port = Number(process.env.PORT ?? 3001);

server.get('/health', async () => ({ status: 'ok' }));

const start = async () => {
  try {
    await server.listen({ port, host: '127.0.0.1' });
    console.log(`Backend listening on http://127.0.0.1:${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
