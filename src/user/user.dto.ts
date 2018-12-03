import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

import { ExerciseRO } from './../exercise/exercise.dto';

export class UserDTO {
  @ApiModelProperty()
  @IsEmail({}, { always: true })
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}

export class UserLoginDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  createdAt: Date;
  exercises?: ExerciseRO[];
  token?: string;
}
