import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { IWard } from '../interfaces';
import { District } from './district.entity';
import { Job } from './job.entity';

@Entity({ name: 'ward' })
export class Ward extends BaseEntity implements IWard {
  @PrimaryColumn()
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'district_id' })
  district_id!: number;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'id', referencedColumnName: 'district_id' })
  district!: District;

  @OneToOne(() => Job, (job) => job.ward)
  @JoinColumn({ name: 'id', referencedColumnName: 'ward_id' })
  job!: Job;
}
