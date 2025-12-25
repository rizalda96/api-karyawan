import { Module } from '@nestjs/common';
import { KaryawanModule } from 'src/karyawan/karyawan.module';
import { DashboardController } from './controllers/dashboard.controller';

@Module({
  imports: [KaryawanModule],
  controllers: [DashboardController],
  providers: [],
  exports: [],
})
export class DashboardModule {}
