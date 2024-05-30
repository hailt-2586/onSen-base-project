import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ISocialLink } from '../pool.interface';
import { Price } from '../../prices/entites/price.entity';
import { PriceHistory } from '../../price_history/entites/price_history.entity';
import { TeamMember } from '../../team_members/entites/team-members.entity';
import { Ecosystem } from '../../ecosystems/entites/ecosystem.entity';
import { PoolDetails } from '../../pool_details/entites/pool-details.entity';
import { Trade } from '../../trades/entites/trade.entity';

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

  @Column('jsonb', { nullable: true })
  social_links: ISocialLink[];

  @Column({ type: 'boolean', nullable: true })
  token_vesting: boolean;

  @Column({ type: 'varchar', nullable: true })
  lbp_type: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Price, (price) => price.pool)
  prices: Price[];

  @OneToMany(() => PriceHistory, (price_history) => price_history.pool)
  price_histories: PriceHistory[];

  @OneToMany(() => TeamMember, (team_member) => team_member.pool)
  team_members: TeamMember[];

  @OneToMany(() => Ecosystem, (ecosystem) => ecosystem.pool)
  ecosystems: Ecosystem[];

  @OneToMany(() => PoolDetails, (poolDetails) => poolDetails.pool)
  details: PoolDetails[];

  @OneToMany(() => Trade, (trade) => trade.pool)
  trades: Trade[];
}
