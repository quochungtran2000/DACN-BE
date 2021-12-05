import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'post_tags' })
export class PostTag extends BaseEntity {
  @PrimaryColumn()
  post_id!: number;

  @PrimaryColumn()
  tag_id!: number;

  @ManyToOne(() => Post, (post) => post.postTag)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post!: Post;

  @ManyToOne(() => Tag, (tag) => tag.postTag)
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
  tag!: Tag;
}
