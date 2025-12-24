import { AppConfig } from './app/app-config.type';
import { MailConfig } from './mail/mail-config.type';

export type AllConfigType = {
  app: AppConfig;
  mail: MailConfig;
  // auth: AuthConfig;
};
