import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('karyawan')
export class KaryawanController {
  constructor() {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getAll() {}
}
