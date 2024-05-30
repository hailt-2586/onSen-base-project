import { NODE_ENV_DEV } from '@shared/constants/common.constant';

export const envConfig = () => ({
  // config env
  NODE_ENV: process.env.NODE_ENV || NODE_ENV_DEV,

  // config database
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,

  // config cors
  CORS_WHITELIST: process.env.CORS_WHITELIST,

  // ethers infura provider
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION,

  // redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  REDIS_TTL: parseInt(process.env.REDIS_TTL, 10) || 60000,
  REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX,
});
