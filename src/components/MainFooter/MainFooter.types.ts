import { type getDictionary } from '../../../lib/dictionary';

export interface IMainFooterProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
