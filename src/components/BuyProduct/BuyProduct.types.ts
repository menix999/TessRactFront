import { IProductProperties } from '@/constants/globalConstant.types';
import { type getDictionary } from '../../../lib/dictionary';

export interface IBuyProductProps {
  productData: IProductProperties;
  translation: Awaited<ReturnType<typeof getDictionary>>;
  quantity?: number;
}
