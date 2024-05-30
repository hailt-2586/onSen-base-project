import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Pool } from '../../pools/entites/pool.entity';

@Entity('trades')
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  trade_type: string;

  @Column({ type: 'numeric', precision: 20, scale: 10 })
  trade_amount: number;

  @Column({ type: 'numeric', precision: 20, scale: 10 })
  trade_price: number;

  @Column({ type: 'timestamp' })
  trade_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Pool, (pool) => pool.trades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'poolId' })
  pool: Pool;
}
