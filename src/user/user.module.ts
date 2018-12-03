import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './../exercise/exercise.entity';
import { ExerciseService } from './../exercise/exercise.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { AdministrationModule } from './administration/administration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ExerciseEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, ExerciseService],
})
export class UserModule {}
