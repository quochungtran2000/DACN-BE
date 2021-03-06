import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { IPost } from '../interfaces/post.interface';
import { Comment } from './comment.entity';
import { Partner } from './partner.entity';
import { PostCategory } from './post_category.entity';
import { PostTag } from './post_tag.entity';

@Entity({ name: 'post' })
export class Post extends BaseEntity implements IPost {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'content' })
  content!: string;

  @Column({ name: 'author_id' })
  author_id!: number;

  @Column({ name: 'image_url' })
  image_url!: string;

  @Column({ name: 'slug' })
  slug!: string;

  @Column({ name: 'state' })
  state!: string;

  @Column({ name: 'is_public' })
  is_public!: boolean;

  @Column({ name: 'is_deleted' })
  is_deleted!: boolean;

  @Column({ name: 'create_date', type: Date })
  create_date!: Date;

  @Column({ name: 'update_date', type: Date })
  update_date!: Date;

  @ManyToOne(() => Partner, (partner) => partner.posts)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author!: Partner;

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinColumn({ name: 'id', referencedColumnName: 'partner_id' })
  comments!: Comment;

  @OneToMany(() => PostCategory, (postCategory) => postCategory.post)
  @JoinColumn({ name: 'id', referencedColumnName: 'post_id' })
  postCategory!: PostCategory;

  @OneToMany(() => PostTag, (postTag) => postTag.post)
  @JoinColumn({ name: 'id', referencedColumnName: 'post_id' })
  postTag!: PostTag;

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
