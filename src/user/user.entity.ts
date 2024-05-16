import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'public_address' })
  public_address: string;

  @Column({ name: 'nonce' })
  nonce: string;
}
