import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';

import { ExerciseService } from './exercise.service';
import { ExerciseDTO } from './exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get('all')
  getAll(): Promise<ExerciseDTO[]> {
    return this.exerciseService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ExerciseDTO> {
    return this.exerciseService.read(id);
  }

  @Post('create')
  create(@Body() data: ExerciseDTO): Promise<ExerciseDTO> {
    return this.exerciseService.create(data);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() data: ExerciseDTO,
  ): Promise<ExerciseDTO> {
    return this.exerciseService.update(id, data);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Object {
    return this.exerciseService.destroy(id);
  }
}
