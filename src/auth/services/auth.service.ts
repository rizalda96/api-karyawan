/* eslint-disable @typescript-eslint/await-thenable */
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RequestLoginDto } from '../dto/request-login.dto';
import { UserService } from 'src/user/services/user.service';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(
    email: RequestLoginDto['email'],
    password: RequestLoginDto['password'],
  ): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.is_active) throw new UnauthorizedException('User not active');
    if (!user.is_verify) throw new UnauthorizedException('User not verify');

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
  ): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (user) throw new UnprocessableEntityException('User already exists');

    const code: number = this.createRandomNum();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      is_active: false,
      is_verify: false,
      code,
    });

    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: newUser.id,
      },
      {
        secret: process.env.AUTH_CONFIRM_MAIL_SECRET,
        expiresIn: '3d',
      },
    );

    await this.mailService.userSignUp({
      to: email,
      data: {
        hash,
        num: code,
      },
    });
  }

  async verifyMail(token: string, code: number): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.AUTH_CONFIRM_MAIL_SECRET,
      });

      const user = await this.userService.findById(
        payload.confirmEmailUserId.toString(),
      );
      if (!user) throw new UnauthorizedException('Invalid token');

      if (user.code !== code)
        throw new UnprocessableEntityException('Invalid code');

      await this.userService.updateToVerifyAndActive(user.id);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token sudah expired');
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token tidak valid');
      }

      throw error;
    }
  }

  async forgetPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id,
      },
      {
        secret: process.env.AUTH_FORGET_PASSWORD_SECRET,
        expiresIn: '3d',
      },
    );

    await this.mailService.forgotPassword({
      to: email,
      data: {
        hash,
      },
    });
  }

  async resetPassword(request: ResetPasswordDto): Promise<void> {
    const { token, password } = request;
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.AUTH_FORGET_PASSWORD_SECRET,
      });

      const user = await this.userService.findById(
        payload.confirmEmailUserId.toString(),
      );
      if (!user) throw new UnauthorizedException('Invalid token');

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userService.updatePassword(user.id, hashedPassword);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token sudah expired');
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token tidak valid');
      }

      throw error;
    }
  }

  private async getTokensData(data: {
    id: UserEntity['id'];
    email: UserEntity['email'];
  }): Promise<any> {
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
        },
        {
          secret: process.env.AUTH_SECRET || 'secret',
          expiresIn: '3d',
        },
      ),
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

  private createRandomNum(): number {
    // return number 4 digits
    return Math.floor(1000 + Math.random() * 9000);
  }
}
