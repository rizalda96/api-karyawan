import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateKaryawanDto {
  @ApiProperty({
    example: 'karyawan@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Alex',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Laki-laki',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Laki-laki', 'Perempuan'])
  jenis_kelamin: string;

  @ApiPropertyOptional({
    example: '08123456789',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  alamat: string;
}
