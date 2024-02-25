import { type getDictionary } from '../../../lib/dictionary';

export interface IRegistrationForm {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAcceptedRules: boolean;
}

export interface IRegistration {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
