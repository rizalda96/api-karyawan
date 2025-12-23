import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryKaryawanDto {
  @ApiProperty({
    example: 1,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    example: 15,
  })
  @Transform(({ value }) => (value ? Number(value) : 15))
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    example: 'created_at',
  })
  @Transform(({ value }) => (value ? String(value) : 'created_at'))
  @IsString()
  @IsNotEmpty()
  sort_by: string;

  @ApiProperty({
    example: 'desc',
  })
  @Transform(({ value }) => (value ? String(value) : 'desc'))
  @IsString()
  @IsNotEmpty()
  sort_direction: string;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? String(value) : ''))
  @IsString()
  @IsOptional()
  search?: string;
}
