import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartnerRole } from '.';
import { IPartner } from '../interfaces';
import { PostRequest } from './post_request.entity';

@Entity({ name: 'partner' })
export class Partner extends BaseEntity implements IPartner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'username' })
  username!: string;

  @Column({ name: 'password' })
  password!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'phone' })
  phone!: string;

  @Column({ name: 'fullname' })
  fullname!: string;

  @Column({ name: 'create_date', type: Date })
  create_date!: Date;

  @Column({ name: 'update_date', type: Date })
  update_date!: Date;

  @OneToMany(() => PostRequest, (postRequest) => postRequest.author)
  @JoinColumn({ name: 'id', referencedColumnName: 'partner_id' })
  post_requests!: PostRequest[];

  @OneToMany(() => PartnerRole, (pr) => pr.partner)
  @JoinColumn({ name: 'id', referencedColumnName: 'partner_id' })
  partner_role!: PartnerRole;

  @BeforeInsert()
  initialDate() {
    this.create_date = new Date();
    this.update_date = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.update_date = new Date();
  }
}
