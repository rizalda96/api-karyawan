import { Injectable, NotFoundException } from '@nestjs/common';
import { KaryawanEntity } from '../entities/karyawan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { QueryKaryawanDto } from '../dto/query-karyawan.dto';
import { CreateKaryawanDto } from '../dto/create-karyawan.dto';
import { UpdateKaryawanDto } from '../dto/update-karyawan.dto';

@Injectable()
export class KaryawanService {
  constructor(
    @InjectRepository(KaryawanEntity)
    private readonly karyawanRepo: Repository<KaryawanEntity>,
  ) {}

  async findById(id: KaryawanEntity['id']): Promise<KaryawanEntity | null> {
    return await this.karyawanRepo.findOneBy({ id });
  }

  async getAllDatatable(
    params: QueryKaryawanDto,
  ): Promise<{ data: KaryawanEntity[]; totalItems: number }> {
    const { page, limit, search, sort_direction, sort_by } = params;
    const skip = (page - 1) * limit;
    const take = limit;

    const searchableFields = [
      'email',
      'name',
      'phone',
      'alamat',
      'jenis_kelamin',
    ];

    let whereClause: Array<object> | undefined = undefined;
    if (search) {
      whereClause = searchableFields.map((field) => ({
        [field]: ILike(`%${search}%`),
      }));
    }

    const [data, totalItems] = await this.karyawanRepo.findAndCount({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        alamat: true,
        jenis_kelamin: true,
        created_at: true,
      },
      where: whereClause,
      order: {
        [sort_by || 'created_at']:
          sort_direction?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      },
      skip,
      take,
    });

    return { data, totalItems };
  }

  async store(dto: CreateKaryawanDto): Promise<void> {
    const payload = this.karyawanRepo.create({
      email: dto.email,
      name: dto.name,
      phone: dto.phone,
      alamat: dto.alamat,
      jenis_kelamin: dto.jenis_kelamin,
    });
    await this.karyawanRepo.save(payload);
  }

  async update(
    id: KaryawanEntity['id'],
    dto: UpdateKaryawanDto,
  ): Promise<void> {
    if (!id) throw new NotFoundException('Karyawan not found');
    const karyawan = await this.karyawanRepo.findOneBy({ id });
    if (!karyawan) throw new NotFoundException('Karyawan not found');

    const payload = this.karyawanRepo.create({
      id,
      email: dto.email ?? karyawan.email,
      name: dto.name ?? karyawan.name,
      phone: dto.phone ?? karyawan.phone,
      alamat: dto.alamat ?? karyawan.alamat,
      jenis_kelamin: dto.jenis_kelamin ?? karyawan.jenis_kelamin,
    });

    await this.karyawanRepo.save(payload);
  }

  async remove(id: KaryawanEntity['id']): Promise<void> {
    if (!id) throw new NotFoundException('Karyawan not found');
    const karyawan = await this.karyawanRepo.findOneBy({ id });
    if (!karyawan) throw new NotFoundException('Karyawan not found');
    await this.karyawanRepo.remove(karyawan);
  }
}
