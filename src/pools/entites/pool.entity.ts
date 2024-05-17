import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pools' })
export class Pool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_name: string;

  @Column({ unique: true })
  contract_address: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('int', { default: 0 })
  participants: number;

  @Column('decimal', { precision: 20, scale: 8, default: 0 })
  funds_raised: number;

  @Column()
  status: string;

  @Column('timestamp', { nullable: true })
  start_date: Date;

  @Column('timestamp', { nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  chain: string;

  @Column({ nullable: true })
  curator: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
