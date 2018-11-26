import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExerciseEntity } from './exercise.entity';
import { ExerciseDTO } from './exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private exerciseRepository: Repository<ExerciseEntity>,
  ) {}

  async getAll(): Promise<ExerciseDTO[]> {
    return await this.exerciseRepository.find();
  }

  async create(data: ExerciseDTO) {
    const idea = await this.exerciseRepository.create(data);
    await this.exerciseRepository.save(idea);
    return idea;
  }

  async read(id: string) {
    try {
      const exercise = await this.exerciseRepository.findOne({ where: { id } });
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.exerciseRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<ExerciseDTO>) {
    try {
      let exercise = await this.exerciseRepository.findOne({ where: { id } });
      await this.exerciseRepository.update({ id }, data);
      exercise = await this.exerciseRepository.findOne({ where: { id } });
      return exercise;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async destroy(id: string) {
    try {
      const exercise = await this.exerciseRepository.findOne({ where: { id } });
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.exerciseRepository.delete({ id });
    return { deleted: true };
  }
}
