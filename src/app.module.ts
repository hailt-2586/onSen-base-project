import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from '@config/env.config';
import { NODE_ENV_DEV } from '@shared/constants/common.constant';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EthersModule } from './ethers/ethers.module';
import { PricesModule } from './prices/prices.module';
import { LoggerModule } from './logger/logger.module';
import { PoolsModule } from './pools/pools.module';
import { MorganMiddleware } from './logger/morgan.middleware';
import { PriceHistoryModule } from './price_history/price_history.module';
import { TeamMembersModule } from './team_members/team_members.module';
import { EcosystemsModule } from './ecosystems/ecosystems.module';

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
    PricesModule,
    PriceHistoryModule,
    TeamMembersModule,
    EcosystemsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
