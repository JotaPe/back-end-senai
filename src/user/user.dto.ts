import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UserDTO {
  @ApiModelPropertyOptional({
    type: String,
    description: 'Username of User',
    maxLength: 64,
    minLength: 4,
  })
  @IsNotEmpty()
  @Length(4, 64)
  username: string;

  @ApiModelPropertyOptional({
    type: String,
    description: 'Password of User',
    maxLength: 256,
    minLength: 8,
  })
  @Length(8, 256)
  @IsNotEmpty()
  password: string;
}
