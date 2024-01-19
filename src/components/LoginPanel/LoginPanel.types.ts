import { type getDictionary } from '../../../lib/dictionary';

export interface ILoginForm {
  login: string;
  password: string;
}

export interface ILoginPanel {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
