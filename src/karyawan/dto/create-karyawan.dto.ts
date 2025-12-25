import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
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
    example: '1995-01-01',
  })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  tanggal_lahir?: Date;

  @ApiProperty({
    example: 'bandung',
  })
  @IsString()
  @Transform(({ value }) => value.toUpperCase() as string)
  @IsNotEmpty()
  kota: string;

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
