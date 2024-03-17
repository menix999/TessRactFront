import { type getDictionary } from '../../../lib/dictionary';

export interface IProductCardProps {
  photo: any;
  text: string;
  rate: number;
  price: string;
  translation: Awaited<ReturnType<typeof getDictionary>>;
  productId: string;
  locale: string;
}
