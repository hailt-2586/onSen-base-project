import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entites/user.entity';
import { Pool } from '../../pools/entites/pool.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Pool, (pool) => pool.transactions)
  @JoinColumn({ name: 'pool_id' })
  pool: Pool;

  @Column({ type: 'varchar', length: 255 })
  transaction_hash: string;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  amount: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
