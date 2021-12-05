import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostTag } from './post_tag.entity';
@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'slug' })
  slug!: string;

  @Column({ name: 'create_date', type: Date })
  create_date!: Date;

  @Column({ name: 'update_date', type: Date })
  update_date!: Date;

  @OneToMany(() => PostTag, (postTag) => postTag.tag)
  @JoinColumn({ name: 'id', referencedColumnName: 'tag_id' })
  postTag!: PostTag;
}
