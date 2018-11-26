import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { ValidationPipe } from './../shared/validation.pipe';
import { ExerciseDTO } from './exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}
  private logger = new Logger('ExerciseController');

  @Get('all')
  getAll(): Promise<ExerciseDTO[]> {
    return this.exerciseService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ExerciseDTO> {
    return this.exerciseService.read(id);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() data: ExerciseDTO): Promise<ExerciseDTO> {
    this.logger.log(JSON.stringify(data));
    return this.exerciseService.create(data);
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() data: Partial<ExerciseDTO>,
  ): Promise<ExerciseDTO> {
    this.logger.log(JSON.stringify(data));
    return this.exerciseService.update(id, data);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Object {
    return this.exerciseService.destroy(id);
  }
}
