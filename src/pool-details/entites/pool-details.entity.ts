import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pool } from '../../pools/entites/pool.entity';

@Entity('pool_details')
export class PoolDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pool, (pool) => pool.id)
  @JoinColumn({ name: 'pool_id' })
  pool: Pool;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  price: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  volume: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  liquidity: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  raise: number;

  @Column({ type: 'json', nullable: true })
  token_vesting: any;

  @Column({ type: 'json', nullable: true })
  token_cliff: any;

  @Column({ type: 'json', nullable: true })
  token_weightings: any;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ type: 'json', nullable: true })
  team: any;

  @Column({ type: 'json', nullable: true })
  ecosystem: any;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
