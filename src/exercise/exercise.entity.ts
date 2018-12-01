import { UserEntity } from './../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('exercise')
export class ExerciseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  questionTitles: string[];

  @Column('simple-array')
  questions: string[];

  @ManyToOne((type) => UserEntity, (author) => author.exercises)
  author: UserEntity;
}
