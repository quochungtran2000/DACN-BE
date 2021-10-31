import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ICity } from '../interfaces';
import { District } from './district.entity';
import { Job } from './job.entity';

@Entity({ name: 'city' })
export class City extends BaseEntity implements ICity {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @OneToMany(() => District, (district) => district.city)
  @JoinColumn({ name: 'id', referencedColumnName: 'city_id' })
  districts!: District[];

  @OneToOne(() => Job, (job) => job.city)
  @JoinColumn({ name: 'id', referencedColumnName: 'city_id' })
  job!: Job;
}
