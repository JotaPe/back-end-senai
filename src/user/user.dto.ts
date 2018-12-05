import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

import { ExerciseRO } from './../exercise/exercise.dto';
import { WarningEntity } from '../warning/warning.entity';

export class UserDTO {
  @ApiModelProperty()
  @IsEmail({}, { always: true })
  email: string;

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
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  name: string;
  createdAt: Date;
  exercises?: ExerciseRO[];
  token?: string;
  cpf: string;
  rg: string;
  gender: string;
  neighborhood: string;
  city: string;
  federativeUnity: string;
  phoneNumber: string;
  receivedWarnings: WarningEntity[];
  authorWarnings: WarningEntity;
}
