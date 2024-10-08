interface IUserOrderPositions {
  productName: string;
  base64Image: string;
  price: number;
  quantity: number;
}

export interface IUserOrders {
  id: number;
  orderDate: string;
  status: string;
  totalPrice: number;
  finalPrice: number;
  positions: IUserOrderPositions[];
}
