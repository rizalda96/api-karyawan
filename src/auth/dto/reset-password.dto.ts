import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-\\/:-@\\[-`{-~])[A-Za-z\d!-\\/:-@\\[-`{-~]{8,}$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    },
  )
  @ApiProperty({ example: '@@Test123' })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '@@Test123' })
  confirmPassword: string;
}
