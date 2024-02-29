import { type getDictionary } from '../../../lib/dictionary';

export interface IAccountTooltipProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}
