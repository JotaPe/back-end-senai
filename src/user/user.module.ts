import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseEntity } from '../exercise/exercise.entity';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ExerciseEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
