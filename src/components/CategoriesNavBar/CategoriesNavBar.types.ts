import { type getDictionary } from '../../../lib/dictionary';

export interface ICategoriesNavBarProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
}
