import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';

import { ValidationPipe } from './../shared/validation.pipe';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    this.userService.register(data);
  }
}
