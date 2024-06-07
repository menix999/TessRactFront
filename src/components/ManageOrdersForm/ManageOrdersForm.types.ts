import { type getDictionary } from '../../../lib/dictionary';

export interface IOrderPosition {
  produtID: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface IOrderList {
  id: number;
  firstName: string;
  surname: string;
  email: string;
  postalCode: string;
  street: string;
  city: string;
  apartmentNumber: string;
  orderDate: string;
  status: string;
  totalPrice: number;
  orderPositions: IOrderPosition[];
}

export interface IManageOrdersFormProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  ordersListData: IOrderList[];
}
