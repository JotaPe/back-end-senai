import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ExerciseEntity } from './exercise.entity';

@Entity('questions')
export class QuestionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  correctResponses: string;

  @Column()
  incorrectResponses: string;

  @ManyToOne((type) => ExerciseEntity, (exercise) => exercise.questions)
  exercise: ExerciseEntity;
}
