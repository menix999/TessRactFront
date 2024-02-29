import { type getDictionary } from '../../../lib/dictionary';

export interface IRecoverPasswordForm {
  email: string;
}

export interface IRecoverPasswordPageProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
