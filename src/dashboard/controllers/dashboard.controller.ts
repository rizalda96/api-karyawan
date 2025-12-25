import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { KaryawanService } from 'src/karyawan/services/karyawan.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('by-gender')
  async byGender(): Promise<{ jenis_kelamin: string; total: number }[]> {
    return await this.karyawanService.countByGender();
  }
}
