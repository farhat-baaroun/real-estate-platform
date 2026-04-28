import { buildServer } from './server';

const server = buildServer();

const resolvePort = (): number => {
  const rawPort = process.env.PORT;
  if (rawPort === undefined) {
    return 3001;
  }

  const parsedPort = Number.parseInt(rawPort, 10);
  const isValidPort = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535;

  if (!isValidPort) {
    console.error(`Invalid PORT value: "${rawPort}". Expected an integer between 1 and 65535.`);
    process.exit(1);
  }

  return parsedPort;
};

const port = resolvePort();

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
