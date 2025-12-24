import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';
import { MailerService } from '../mailer/mailer.service';
import path from 'path';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async userSignUp(
    mailData: MailData<{ hash: string; num: number }>,
  ): Promise<void> {
    const url = new URL(
      `${process.env.FRONTEND_DOMAIN}/auth/${mailData.data.hash}/verification`,
    );

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Confirm email',
      text: `${url.toString()} Confirm email`,
      templatePath: path.join(
        process.cwd(),
        'src',
        'mail',
        'mail-templates',
        'activation.hbs',
      ),
      context: {
        title: 'Confirm email',
        url: url.toString(),
        actionTitle: 'Confirm email',
        app_name: 'My App',
        text1: 'Hey!',
        text2: 'You’re almost ready to start enjoying',
        text3: `This is your verification code: ${mailData.data.num}`,
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
    const url = new URL(
      `${process.env.FRONTEND_DOMAIN}/auth/${mailData.data.hash}/reset-password`,
    );

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Reset password',
      text: `${url.toString()} Reset password`,
      templatePath: path.join(
        process.cwd(),
        'src',
        'mail',
        'mail-templates',
        'reset-password.hbs',
      ),
      context: {
        title: 'Reset password',
        url: url.toString(),
        actionTitle: 'Reset password',
        app_name: 'My App',
        text1: 'Trouble signing in?',
        text2: 'Resetting your password is easy.',
        text3:
          'Just press the button below and follow the instructions. We’ll have you up and running in no time.',
        text4:
          'If you did not make this request then please ignore this email.',
      },
    });
  }
}
