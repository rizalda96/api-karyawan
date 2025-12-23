import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RequestLoginDto } from '../dto/request-login.dto';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';

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
}
