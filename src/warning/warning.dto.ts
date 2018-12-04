import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserEntity } from 'user/user.entity';

export class WarningDTO {
  @ApiModelPropertyOptional()
  @IsString()
  readonly title: string;

  @ApiModelPropertyOptional()
  @IsString()
  readonly description: string;

  @ApiModelPropertyOptional()
  @IsString()
  readonly receiver: UserEntity[];
}

export class WarningRO {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    author: UserEntity;
    receiver: UserEntity[];
}