import { type getDictionary } from '../../../lib/dictionary';

export interface IAddProductFormProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}

type CategoryTypes = 'Headphones' | 'Smartwatch' | 'Watch';

export interface IAddProductForm {
  description: string;
  quantity?: number;
  category: CategoryTypes;
  name: string;
  price?: number;
  color: string;
  material: string;
  mark: string;
}
