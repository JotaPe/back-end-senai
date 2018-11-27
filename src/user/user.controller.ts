import { UserService } from './user.service';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserDTO } from './user.dto';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all')
  showAllUsers() {
    this.userService.showAll();
  }

  @Post('login')
  login(@Body() data: UserDTO) {
    this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    this.userService.register(data);
  }
}
