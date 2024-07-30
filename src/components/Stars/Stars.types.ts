import { type getDictionary } from '../../../lib/dictionary';

export interface IStarsProps {
  count: number;
  numberOfRates?: number;
  opinionDateTime?: string;
  translation?: Awaited<ReturnType<typeof getDictionary>>;
  readonly?: boolean;
  onChange?: (rate: number) => void;
}
