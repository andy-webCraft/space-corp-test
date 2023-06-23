import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Andy' })
  readonly name: string;

  @ApiProperty({ example: 'test' })
  readonly login: string;

  @ApiProperty({ example: '123' })
  readonly password: string;
}
