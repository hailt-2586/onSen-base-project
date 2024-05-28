import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pools')
export class Pool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  project_name: string;

  @Column({ type: 'varchar' })
  ticker: string;

  @Column({ type: 'int' })
  participants: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  funds_raised: number;

  @Column({ type: 'timestamp', nullable: true })
  live_until: Date;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  opens_on: Date;

  @Column({ type: 'varchar' })
  chain: string;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'varchar', nullable: true })
  curator: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @OneToMany(() => PoolDetails, (poolDetails) => poolDetails.pool)
  // poolDetails: PoolDetails[];

  // @OneToMany(() => Transaction, (transaction) => transaction.pool)
  // transactions: Transaction[];
}
