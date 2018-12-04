import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

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

  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiModelProperty()
  @IsNotEmpty()
  rg: string;

  @ApiModelProperty()
  @IsNotEmpty()
  gender: string;

  @ApiModelProperty()
  @IsNotEmpty()
  neighborhood: string;

  @ApiModelProperty()
  @IsNotEmpty()
  city: string;

  @ApiModelProperty()
  @IsNotEmpty()
  federativeUnity: string;

  @ApiModelProperty()
  @IsPhoneNumber('BR')
  phoneNumber: string;
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
