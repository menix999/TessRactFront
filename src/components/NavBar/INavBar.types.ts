import { type getDictionary } from '../../../lib/dictionary';

export interface INavBar {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
}
