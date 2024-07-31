import { type getDictionary } from '../../../lib/dictionary';

export interface IProductOpinionsProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  productId: string;
  opinions: IOpinionProduct[];
  firstName?: string;
  surname?: string;
}

export interface IOpinionProduct {
  opinionId: number;
  firstName: string;
  surname: string;
  commentContent: string;
  creationDate: string;
  rate: number;
}
