import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

import { UserRO } from './../user/user.dto';

export class ExerciseDTO {
  @ApiModelProperty()
  @IsString()
  readonly title: string;

  @ApiModelProperty()
  @IsString()
  readonly description: string;

  @ApiModelPropertyOptional()
  @IsArray({ always: false })
  readonly questions: string[];
}

export class ExerciseRO {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  questionTitles: string[];
  questions: string[];
  author: UserRO;
}
