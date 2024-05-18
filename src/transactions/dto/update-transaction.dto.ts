import { PartialType } from '@nestjs/mapped-types';
import { StoreTransactionDto } from './store-transaction.dto';

export class UpdateTransactionDto extends PartialType(StoreTransactionDto) {}
