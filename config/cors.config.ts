import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NODE_ENV_DEV } from '../shared/constants/common.constant';

export const corsConfig: CorsOptions = {
  origin: process.env.NODE_ENV === NODE_ENV_DEV ? true : [process.env.CORS_WHITELIST],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
