import { getDictionary } from '../../../lib/dictionary';

export interface ICartSummaryProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
}
