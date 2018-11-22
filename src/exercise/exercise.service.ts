import { Injectable } from '@nestjs/common';
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
    return await this.exerciseRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<ExerciseDTO>) {
    await this.exerciseRepository.update({ id }, data);
    return await this.exerciseRepository.findOne({ id });
  }

  async destroy(id: string) {
    await this.exerciseRepository.delete({ id });
    return { deleted: true };
  }
}
