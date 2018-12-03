import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { AuthGuard } from './../shared/auth.guard';
import { ValidationPipe } from './../shared/validation.pipe';
import { User } from './user.decorator';
import { UserDTO, UserLoginDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  showAllUsers(@User() user, @Query('page') page: number) {
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
  login(@Body() data: UserLoginDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
