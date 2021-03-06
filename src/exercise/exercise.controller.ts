import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';

import { ValidationPipe } from './../shared/validation.pipe';
import { User } from './../user/user.decorator';
import { ExerciseDTO } from './exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('api/exercise')
export class ExerciseController {
  private logger = new Logger('ExerciseController');

  constructor(private exerciseService: ExerciseService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
    options.id && this.logger.log('EXERCISE ' + JSON.stringify(options.id));
  }

  @Get('all')
  allExercises(@Query('page') page: number) {
    return this.exerciseService.showAll(page);
  }

  @Get(':title')
  getOneExercise(@Param('title') title: string) {
    this.logData({ title });
    return this.exerciseService.read(title);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createExercise(@User('id') user, @Body() body: ExerciseDTO) {
    this.logData({ user, body });
    return this.exerciseService.create(user, body);
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  updateExercise(
    @Param('id') id: string,
    @Body() body: Partial<ExerciseDTO>,
    @User() user,
  ) {
    this.logData({ id, user, body });
    return this.exerciseService.update(id, user, body);
  }

  @Delete('delete/:id')
  destroyExercise(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.exerciseService.destroy(id, user);
  }
}
