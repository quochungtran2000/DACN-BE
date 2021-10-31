import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { IPartnerRoles } from '../interfaces';
import { Partner } from './partner.entity';
import { Role } from './role.entity';

@Entity({ name: 'partner_roles' })
export class PartnerRole extends BaseEntity implements IPartnerRoles {
  @PrimaryColumn()
  partner_id!: number;

  @PrimaryColumn()
  role_id!: number;

  @ManyToOne(() => Role, (role) => role.partner_role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: Role;

  @ManyToOne(() => Partner, (partner) => partner.partner_role)
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  partner!: Role;
}
