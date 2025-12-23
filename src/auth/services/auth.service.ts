/* eslint-disable @typescript-eslint/await-thenable */
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RequestLoginDto } from '../dto/request-login.dto';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: RequestLoginDto['email'],
    password: RequestLoginDto['password'],
  ): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new UnprocessableEntityException('Invalid credentials');

    const { token, refreshToken } = await this.getTokensData({
      id: user.id,
      email: user.email,
    });

    const res = {
      token,
      refreshToken,
      user,
    };

    return res;
  }

  async register(
    email: RequestLoginDto['email'],
    password: RequestLoginDto['password'],
  ): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) throw new UnprocessableEntityException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
    });

    const { token, refreshToken } = await this.getTokensData({
      id: newUser.id,
      email: newUser.email,
    });

    const res = {
      token,
      refreshToken,
      user: newUser,
    };

    return res;
  }

  private async getTokensData(data: {
    id: UserEntity['id'];
    email: UserEntity['email'];
  }): Promise<any> {
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync({
        id: data.id,
      }),
      await this.jwtService.signAsync(
        {
          email: data.email,
        },
        {
          secret: process.env.AUTH_REFRESH_SECRET || 'refresh_secret',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }
}
