import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
export class ExerciseDTO {
  @ApiModelProperty()
  title: string;

  @ApiModelPropertyOptional()
  description: string;

  @ApiModelProperty()
  questions: string[];
}
