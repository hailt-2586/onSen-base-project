import { redisStore } from 'cache-manager-redis-yet';
import { Module } from '@nestjs/common';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
          ttl: configService.get<number>('REDIS_TTL'),
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: CacheRedisModule,
      useExisting: CACHE_MANAGER,
    },
  ],
  exports: [CacheRedisModule],
})
export class CacheRedisModule {}
