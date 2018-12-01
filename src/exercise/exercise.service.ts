import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './../user/user.entity';
import { ExerciseDTO, ExerciseRO } from './exercise.dto';
import { ExerciseEntity } from './exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private exerciseRepository: Repository<ExerciseEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private exerciseToResponseObject(exercise: ExerciseEntity): ExerciseRO {
    const responseObject: any = {
      ...exercise,
      author: exercise.author ? exercise.author.toResponseObject(false) : null,
    };
    return responseObject;
  }

  private ensureOwnership(exercise: ExerciseEntity, userId: string) {
    if (exercise.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(page: number = 1): Promise<ExerciseRO[]> {
    const exercises = await this.exerciseRepository.find({
      relations: ['author'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return exercises.map((exercise) => this.exerciseToResponseObject(exercise));
  }

  async read(id: string): Promise<ExerciseRO> {
    const exercise = await this.exerciseRepository.findOne({ where: { id } });
    if (!exercise) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.exerciseToResponseObject(exercise);
  }

  async create(userId: string, data: ExerciseDTO): Promise<ExerciseRO> {
    const user = await this.exerciseRepository.findOne({ where: { userId } });
    const exercise = await this.exerciseRepository.create({
      ...data,
      author: user,
    });
    await this.exerciseRepository.save(exercise);
    return this.exerciseToResponseObject(exercise);
  }

  async update(
    id: string,
    userId: string,
    data: Partial<ExerciseDTO>,
  ): Promise<ExerciseRO> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    Logger.log(`Exercise ${exercise}`, 'Exercise');
    if (!exercise) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    this.ensureOwnership(exercise, userId);
    this.exerciseRepository.update({ id }, data);
    return this.exerciseToResponseObject(exercise);
  }

  async destroy(id: string, userId: string): Promise<ExerciseRO> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!exercise) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    this.ensureOwnership(exercise, userId);
    await this.exerciseRepository.remove(exercise);
    return this.exerciseToResponseObject(exercise);
  }
}
