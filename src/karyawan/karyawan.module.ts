import { Module } from '@nestjs/common';
import { KaryawanController } from './controllers/karyawan.controller';
import { KaryawanEntity } from './entities/karyawan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KaryawanService } from './services/karyawan.service';

@Module({
  imports: [TypeOrmModule.forFeature([KaryawanEntity])],
  controllers: [KaryawanController],
  providers: [KaryawanService],
  exports: [KaryawanService],
})
export class KaryawanModule {}
