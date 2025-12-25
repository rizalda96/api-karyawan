import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ResponseKaryawanDatatableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  jenis_kelamin: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  kota: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Expose()
  tanggal_lahir: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  alamat: string;
}
