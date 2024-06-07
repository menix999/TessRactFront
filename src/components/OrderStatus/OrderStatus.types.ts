import { type getDictionary } from '../../../lib/dictionary';

export interface IOrderStatusProps {
  status: string;
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
