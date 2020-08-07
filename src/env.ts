import { cleanEnv, host, num, port, str } from 'envalid';

export type Environments = 'production' | 'development' | 'test';

export type Env = Readonly<{
  isDev: boolean;
  isTest: boolean;
  isProd: boolean;

  NODE_ENV: Environments;

  WEB_CONCURRENCY: number;
  WEB_MEMORY: number;

  GQLHOST: string;
  GQLPORT: number;
  GQLPORT_SUBSCRIPTIONS: number;

  LOGS_PATH: string;

  DB_URI: string;
  DB_NAME: string;
  DB_CERTS: string;

  JWT_SECRET: string;

  LOG_LEVEL?: string;

  ENGINE_API_KEY?: string;

  MAX_SOCKETS?: number;
}>;

export const env: Env = cleanEnv(
  process.env,
  {
    NODE_ENV: str({
      choices: ['production', 'development', 'test'],
      default: 'development',
    }),

    WEB_CONCURRENCY: num({ default: 1 }),
    WEB_MEMORY: num({ default: 2048 }),
    GQLHOST: host({ default: 'localhost' }),
    GQLPORT: port({ default: 3000 }),
    GQLPORT_SUBSCRIPTIONS: port({ default: 3050 }),

    LOGS_PATH: str({ default: './tmp/logs' }),

    DB_URI: str({ default: 'https://a.free.lemar.ravendb.cloud' }),
    DB_NAME: str({ default: 'sampledatabase' }),
    DB_CERTS: str({
      default:
        '/free.lemar.client.certificate/free.lemar.client.certificate.pfx',
    }),

    JWT_SECRET: str({ default: 'default' }),

    LOG_LEVEL: str({
      choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
      default: 'debug',
    }),

    MAX_SOCKETS: num({ default: Infinity }),
  },
  { strict: true, dotEnvPath: __dirname + '/../.env' },
);
