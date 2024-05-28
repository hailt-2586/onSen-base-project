import { Module } from '@nestjs/common';
import { EthersService } from './ethers.service';
import { EthersController } from './ethers.controller';

@Module({
  exports: [EthersService],
  controllers: [EthersController],
  providers: [EthersService],
})
export class EthersModule {}
