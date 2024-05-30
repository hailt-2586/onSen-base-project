import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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
  token_vesting_start: Date;

  @Column({ type: 'timestamp', nullable: true })
  token_vesting_end: Date;

  @Column({ type: 'timestamp', nullable: true })
  token_cliff: Date;

  @Column({ type: 'numeric', precision: 20, scale: 2, nullable: true })
  swap_fee: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Pool, (pool) => pool.details, { onDelete: 'CASCADE' })
  pool: Pool;
}
