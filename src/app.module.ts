import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from '@config/env.config';
import { NODE_ENV_DEV } from '@shared/constants/common.constant';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EthersModule } from './ethers/ethers.module';
import { PoolsModule } from '@src/pools/pools.module';
import { LoggerModule } from '@src/logger/logger.module';
import { MorganMiddleware } from '@src/logger/morgan.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === NODE_ENV_DEV ? '.env' : undefined,
      load: [envConfig],
    }),
    LoggerModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    EthersModule,
    PoolsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
