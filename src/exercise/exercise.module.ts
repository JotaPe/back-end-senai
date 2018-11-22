import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseController } from './exercise.controller';
import { ExerciseEntity } from './exercise.entity';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity])],
  providers: [ExerciseService, ExerciseController],
  controllers: [ExerciseController],
  exports: [ExerciseService, ExerciseController],
})
export class ExerciseModule {}
