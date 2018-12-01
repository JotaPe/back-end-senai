import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './../user/user.entity';
import { ExerciseController } from './exercise.controller';
import { ExerciseEntity } from './exercise.entity';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseEntity, UserEntity]),
    UserModule,
  ],
  providers: [ExerciseService],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
