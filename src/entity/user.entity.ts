import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'res_partner' })
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'username' })
  username!: string;

  @Column({ name: 'password' })
  password!: string;

  @Column({ name: 'public' })
  publish?: boolean;
}
