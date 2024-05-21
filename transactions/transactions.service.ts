import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entites/transaction.entity';
import { StoreTransactionDto } from './dto/store-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async create(storeTransactionDto: StoreTransactionDto) {
    const transaction = this.transactionsRepository.create(storeTransactionDto);
    return this.transactionsRepository.save(transaction);
  }

  async findAll() {
    return this.transactionsRepository.find({ relations: ['user', 'pool'] });
  }

  async findOne(id: number) {
    return this.transactionsRepository.findOne({ where: { id }, relations: ['user', 'pool'] });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await this.transactionsRepository.update(id, updateTransactionDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.transactionsRepository.delete(id);
  }
}
