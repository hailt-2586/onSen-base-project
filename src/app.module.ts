import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from '@config/env.config';
import { NODE_ENV_DEV } from '@shared/constants/common.constant';
import { DatabaseModule } from './database/database.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === NODE_ENV_DEV ? '.env' : undefined,
      load: [envConfig],
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
