import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async create({
    email,
    password,
    is_active = false,
    is_verify = false,
    code = null,
  }: {
    email: string;
    password: string;
    is_active?: boolean;
    is_verify?: boolean;
    code?: number | null;
  }): Promise<UserEntity> {
    return await this.userRepository.save({
      email,
      password,
      is_active,
      is_verify,
      code,
    });
  }

  async updateToVerifyAndActive(id: string): Promise<UserEntity> {
    return await this.userRepository.save({
      id,
      is_active: true,
      is_verify: true,
      code: null,
    });
  }

  async updatePassword(id: string, password: string): Promise<UserEntity> {
    return await this.userRepository.save({
      id,
      password,
    });
  }
}
