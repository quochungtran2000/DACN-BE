import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { IPostRequest } from '../interfaces';
import { Partner } from './partner.entity';

@Entity({ name: 'post_request' })
export class PostRequest extends BaseEntity implements IPostRequest {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'partner_id' })
  partner_id!: number;

  @Column({ name: 'content' })
  content!: string;

  @Column({ name: 'create_date', type: Date })
  create_date!: Date;

  @Column({ name: 'update_date', type: Date })
  update_date!: Date;

  @ManyToOne(() => Partner, (partner) => partner.post_requests)
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  author!: Partner;

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
