import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entites/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  exports: [TransactionsService],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
