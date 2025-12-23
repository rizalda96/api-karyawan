import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestLoginDto {
  @ApiProperty({
    example: 'QY9Kl@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '@@Test123',
  })
  @IsNotEmpty()
  password: string;
}
