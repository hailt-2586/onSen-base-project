import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Pool } from '../../pools/entites/pool.entity';

@Entity('pool_details')
export class PoolDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  curator_name: string;

  @Column({ type: 'text', nullable: true })
  curator_comments: string;

  @Column({ type: 'timestamp', nullable: true })
  duration_start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  duration_end_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  token_vesting_start: Date;

  @Column({ type: 'timestamp', nullable: true })
  token_vesting_end: Date;

  @Column({ type: 'timestamp', nullable: true })
  cliff_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  cliff_end_date: Date;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  start_weight: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  end_weight: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  starting_balances: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  current_balances: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  project_token_release: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  swap_fee: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToOne(() => Pool, (pool) => pool.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'poolId' })
  pool: Pool;
}
