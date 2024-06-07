export type CategoryType = 'Watch' | 'Headphones' | 'Smartwatch';

export interface IProductProperties {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  material: string;
  mark: string;
  category: CategoryType;
  ratesAmount: number;
  averageRate: number;
  base64Image: string;
  quantity: number;
}
