import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ValidationPipe } from './../shared/validation.pipe';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from './../shared/auth.guard';
import { User } from './user.decorator';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Get(':username')
  showOneUser(@Param('username') username: string) {
    return this.userService.read(username);
  }

  @Get('whoami')
  @UseGuards(new AuthGuard())
  showMe(@User('username') username: string) {
    return this.userService.read(username);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
