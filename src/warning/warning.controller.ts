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
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'user/user.decorator';

import { WarningDTO } from './warning.dto';
import { WarningService } from './warning.service';

@Controller('api/warning')
export class WarningController {
  private logger = new Logger('Exercise Controller');

  constructor(private warningService: WarningService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
    options.id && this.logger.log('WARNING ', JSON.stringify(options.warning));
  }

  @Get('exercises')
  allWarnings(@Query('page') page: number) {
    return this.warningService.showAll(page);
  }

  @Get(':title')
  getOneWarning(@Param('title') title: string) {
    this.logData({ title });
    return this.warningService.read(title);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createExercise(@User('id') user, @Body() body: WarningDTO) {
    this.logData({ user, body });
    return this.warningService.create(user, body);
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  updateWarning(
    @Param('id') id: string,
    @Body() body: Partial<WarningDTO>,
    @User('id') user,
  ) {
    this.logData({ id, user });
    return this.warningService.update(id, user, body);
  }

  @Delete('delete/:id')
  destroyExercise(@Param('id') id: string, @User('id') user) {
    this.logData({ id, user });
    return this.warningService.destroy(id, user);
  }
}
