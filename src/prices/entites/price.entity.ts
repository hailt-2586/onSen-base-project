import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pool } from '../../pools/entites/pool.entity';

@Entity('prices')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 20, scale: 10 })
  current_price: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  market_cap: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  liquidity: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  pool_value: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  fdv: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  volume: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Pool, (project) => project.prices, { onDelete: 'CASCADE' })
  pool: Pool;
}
