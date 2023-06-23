import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test' })
  readonly login: string;

  @ApiProperty({ example: '123' })
  readonly password: string;
}
