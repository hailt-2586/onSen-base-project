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
import { ISocialLink } from '../../pools/pool.interface';

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  position: string;

  @Column('jsonb', { nullable: true })
  social_links: ISocialLink[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Pool, (pool) => pool.team_members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'poolId' })
  pool: Pool;
}
