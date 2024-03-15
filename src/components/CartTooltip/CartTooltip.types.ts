import { type getDictionary } from '../../../lib/dictionary';

export interface ICartTooltipProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
