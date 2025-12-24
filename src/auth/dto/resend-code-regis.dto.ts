import { OmitType, PartialType } from '@nestjs/swagger';
import { VerifyMailDto } from './verify-mail.dto';

export class ResendCodeRegisDto extends PartialType(
  OmitType(VerifyMailDto, ['code']),
) {}
