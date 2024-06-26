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

@Entity('price_history')
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'numeric', precision: 20, scale: 10 })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Pool, (pool) => pool.price_histories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'poolId' })
  pool: Pool;
}
