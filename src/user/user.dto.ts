import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

import { ExerciseRO } from './../exercise/exercise.dto';

export class UserDTO {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  exercises?: ExerciseRO[];
  token?: string;
}
