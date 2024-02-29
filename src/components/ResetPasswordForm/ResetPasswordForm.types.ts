import { type getDictionary } from '../../../lib/dictionary';

export interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordFormProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
