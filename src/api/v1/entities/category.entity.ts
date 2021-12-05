import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { PostCategory } from './post_category.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'slug' })
  slug!: string;

  @Column({ name: 'parent_id' })
  parent_id!: number;

  @Column({ name: 'create_date', type: Date })
  create_date!: Date;

  @Column({ name: 'update_date', type: Date })
  update_date!: Date;

  @OneToMany(() => PostCategory, (postCategory) => postCategory.category)
  @JoinColumn({ name: 'id', referencedColumnName: 'category_id' })
  postCategory!: PostCategory;
}
