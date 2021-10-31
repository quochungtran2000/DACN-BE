import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { PartnerRole } from '.';
import { IRole, Role as EnumRole } from '../interfaces';

@Entity({ name: 'role' })
export class Role extends BaseEntity implements IRole {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'role' })
  role!: EnumRole;

  @OneToMany(() => PartnerRole, (pr) => pr.role)
  @JoinColumn({ name: 'id', referencedColumnName: 'role_id' })
  partner_role!: PartnerRole;
}
