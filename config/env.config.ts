import { NODE_ENV_DEV } from '@shared/constants/common.constant';

export const envConfig = () => ({
  // config env
  NODE_ENV: process.env.NODE_ENV || NODE_ENV_DEV,

  // config database
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,

  // config cors
  CORS_WHITELIST: process.env.CORS_WHITELIST,

  // ethers infura provider
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
});