export interface AppConfig {
  readonly environment: 'development' | 'test' | 'production';
  readonly port: number;
  readonly logLevel: 'debug' | 'info' | 'warn' | 'error';
}

function parsePort(raw: string | undefined): number {
  const port = Number(raw ?? '3000');
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer from 1 to 65535');
  }
  return port;
}

export function loadConfig(env: NodeJS.ProcessEnv): AppConfig {
  const environment = env.NODE_ENV ?? 'development';
  if (!['development', 'test', 'production'].includes(environment)) {
    throw new Error('NODE_ENV must be development, test, or production');
  }

  const logLevel = env.LOG_LEVEL ?? 'info';
  if (!['debug', 'info', 'warn', 'error'].includes(logLevel)) {
    throw new Error('LOG_LEVEL must be debug, info, warn, or error');
  }

  return {
    environment: environment as AppConfig['environment'],
    port: parsePort(env.PORT),
    logLevel: logLevel as AppConfig['logLevel'],
  };
}
