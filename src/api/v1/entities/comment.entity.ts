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

import { Partner } from '.';
import { IComment } from '../interfaces';
import { Post } from './post.entity';
@Entity({ name: 'comment' })
export class Comment extends BaseEntity implements IComment {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'comment' })
  comment!: string;

  @Column({ name: 'partner_id' })
  partner_id!: number;

  @Column({ name: 'post_id' })
  post_id!: number;

  @Column({ name: 'create_date', type: Date })
  create_date!: Date;

  @Column({ name: 'update_date', type: Date })
  update_date!: Date;

  @ManyToOne(() => Partner, (partner) => partner.comments)
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  author!: Partner;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post!: Post;

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
