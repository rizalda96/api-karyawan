import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RequestLoginDto } from '../dto/request-login.dto';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import { VerifyMailDto } from '../dto/verify-mail.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'login user',
  })
  @Post('login')
  async login(@Body() request: RequestLoginDto): Promise<any> {
    const { email, password } = request;
    return await this.authService.login(email, password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'register user',
  })
  @Post('register')
  async register(@Body() request: RequestLoginDto): Promise<any> {
    const { email, password } = request;
    return await this.authService.register(email, password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'verify user',
  })
  @Post('verify')
  async verifyEmail(@Body() request: VerifyMailDto): Promise<any> {
    const { token, code } = request;
    return await this.authService.verifyMail(token, code);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'send notif email forget password',
  })
  @Post('forget-password')
  async forgetPassword(@Body() request: { email: string }): Promise<void> {
    const { email } = request;
    await this.authService.forgetPassword(email);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'reset password',
  })
  @Post('reset-password')
  async resetPassword(@Body() request: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(request);
  }
}
