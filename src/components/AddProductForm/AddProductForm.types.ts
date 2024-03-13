import { type getDictionary } from '../../../lib/dictionary';

export interface IAddProductFormProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}

type CategoryNameTypes = 'Headphones' | 'Smartwatch' | 'Watch';

interface ICategory {
  id: number;
  name: CategoryNameTypes;
  nameValue: CategoryNameTypes;
}

export interface IAddProductForm {
  description: string;
  quantity?: number;
  category: ICategory;
  name: string;
  price?: string;
  color: string;
  material: string;
  mark: string;
}
