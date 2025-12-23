import { Injectable } from '@nestjs/common';
import { KaryawanEntity } from '../entities/karyawan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KaryawanService {
  constructor(
    @InjectRepository(KaryawanEntity)
    private readonly karyawanRepo: Repository<KaryawanEntity>,
  ) {}

  async findById(id: KaryawanEntity['id']): Promise<KaryawanEntity | null> {
    return await this.karyawanRepo.findOneBy({ id });
  }
}
