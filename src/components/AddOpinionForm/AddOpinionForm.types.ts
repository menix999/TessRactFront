import { type getDictionary } from '../../../lib/dictionary';
import { IOpinionProduct } from '../ProductOpinions/ProductOpinions.types';

export interface IAddOpionionProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  productId: string;
  setOpinionsData: React.Dispatch<React.SetStateAction<IOpinionProduct[]>>;
}

export interface IAddOpinionForm {
  commentContent: string;
  rate: number;
}
