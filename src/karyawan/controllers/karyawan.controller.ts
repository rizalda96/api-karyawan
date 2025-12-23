import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { QueryKaryawanDto } from '../dto/query-karyawan.dto';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { pagination } from 'src/utils/pagination';
import { KaryawanService } from '../services/karyawan.service';
import { ResponseKaryawanDatatableDto } from '../dto/response-karyawan-dt.dto';
import { plainToInstance } from 'class-transformer';
import { KaryawanEntity } from '../entities/karyawan.entity';
import { CreateKaryawanDto } from '../dto/create-karyawan.dto';
import { UpdateKaryawanDto } from '../dto/update-karyawan.dto';

@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(
    @Query() dto: QueryKaryawanDto,
  ): Promise<PaginationResponseDto<ResponseKaryawanDatatableDto>> {
    const { page, limit } = dto;
    const { data, totalItems } =
      await this.karyawanService.getAllDatatable(dto);

    const mapped = plainToInstance(ResponseKaryawanDatatableDto, data, {
      excludeExtraneousValues: true,
    });

    return pagination(mapped, {
      totalItems: totalItems,
      itemsPerPage: limit,
      currentPage: page,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiParam({ name: 'id' })
  async findById(
    @Param('id') id: KaryawanEntity['id'],
  ): Promise<KaryawanEntity | null> {
    return await this.karyawanService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() dto: CreateKaryawanDto): Promise<void> {
    await this.karyawanService.store(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id/update')
  @ApiParam({ name: 'id' })
  async edit(
    @Param('id') id: KaryawanEntity['id'],
    @Body() dto: UpdateKaryawanDto,
  ): Promise<void> {
    await this.karyawanService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id/delete')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: KaryawanEntity['id']): Promise<void> {
    await this.karyawanService.remove(id);
  }
}
