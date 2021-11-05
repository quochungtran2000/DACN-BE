import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Partner } from '.';
import { IJob } from '../interfaces';
import { City } from './city.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';

@Entity({ name: 'job' })
export class Job extends BaseEntity implements IJob {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'content' })
  content!: string;

  @Column({ name: 'level' })
  level!: string;

  @Column({ name: 'is_public' })
  is_public!: boolean;

  @Column({ name: 'is_deleted' })
  is_deleted!: boolean;

  @Column({ name: 'slug' })
  slug!: string;

  @Column({ name: 'city_id' })
  city_id!: number;

  @Column({ name: 'district_id' })
  district_id!: number;

  @Column({ name: 'ward_id' })
  ward_id!: number;

  @Column({ name: 'street' })
  street!: string;

  @Column({ name: 'zip' })
  zip!: number;

  @Column({ name: 'author_id' })
  author_id!: number;

  @Column({ name: 'create_date', type: Date })
  create_date!: Date;

  @Column({ name: 'update_date', type: Date })
  update_date!: Date;

  @OneToOne(() => Ward, (ward) => ward.job)
  @JoinColumn({ name: 'ward_id', referencedColumnName: 'id' })
  ward!: Ward;

  @OneToOne(() => District, (district) => district.job)
  @JoinColumn({ name: 'district_id', referencedColumnName: 'id' })
  district!: District;

  @OneToOne(() => City, (city) => city.job)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city!: City;

  @ManyToOne(() => Partner, (partner) => partner.jobs)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author!: City;

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
