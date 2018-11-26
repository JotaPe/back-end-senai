import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class ExerciseDTO {
  @IsString()
  @ApiModelPropertyOptional({
    type: String,
    description: 'Title of an exercise',
  })
  title: string;

  @IsString()
  @ApiModelPropertyOptional()
  description: string;

  @IsArray()
  @ApiModelPropertyOptional({
    isArray: true,
    type: String,
    description: 'Question Names',
  })
  questions: string[];
}
