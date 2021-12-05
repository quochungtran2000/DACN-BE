import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Post } from './post.entity';

@Entity()
export class PostCategory extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id!:number;

  @PrimaryColumn()
  post_id!: number;

  @PrimaryColumn()
  category_id!: number;

  @ManyToOne(() => Category, (category) => category.postCategory)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category!: Category;

  @ManyToOne(() => Post, (post) => post.postCategory)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post!: Post;
}
