import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { IDistrict } from '../interfaces';
import { City } from './city.entity';
import { Job } from './job.entity';
import { Ward } from './ward.entity';

@Entity({ name: 'district' })
export class District extends BaseEntity implements IDistrict {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'city_id' })
  city_id!: number;

  @ManyToOne(() => City, (city) => city.districts)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city!: City;

  @OneToMany(() => Ward, (ward) => ward.district)
  @JoinColumn({ name: 'id', referencedColumnName: 'district_id' })
  wards!: Ward[];

  @OneToOne(() => Job, (job) => job.district)
  @JoinColumn({ name: 'id', referencedColumnName: 'district_id' })
  job!: Job;
}
