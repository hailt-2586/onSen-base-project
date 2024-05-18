import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PoolDetails } from '../../pool-details/entites/pool-details.entity';
import { Transaction } from '../../transactions/entites/transaction.entity';

@Entity('pools')
export class Pool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  ticker: string;

  @Column({ type: 'int' })
  participants: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  funds_raised: number;

  @Column({ type: 'timestamp', nullable: true })
  live_until: Date;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  opens_on: Date;

  @Column({ type: 'varchar', length: 50 })
  chain: string;

  @Column('timestamp', { nullable: true })
  start_date: Date;

  @Column('timestamp', { nullable: true })
  end_date: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  curator: string;

  @OneToMany(() => PoolDetails, (poolDetails) => poolDetails.pool)
  poolDetails: PoolDetails[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.pool)
  transactions: Transaction[];
}
