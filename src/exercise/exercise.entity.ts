import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { UserEntity } from './../user/user.entity';
import { QuestionsEntity } from './question.entity';

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

  @OneToMany((type) => QuestionsEntity, (questions) => questions.exercise)
  questions: QuestionsEntity[];

  @ManyToOne((type) => UserEntity, (author) => author.exercises)
  author: UserEntity;
}
