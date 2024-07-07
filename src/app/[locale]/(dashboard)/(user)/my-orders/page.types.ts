interface IUserOrderPositions {
    productName: string;
    base64Image: string;
  }

export interface IUserOrders {
    id: number;
    orderDate: string;
    status: string;
    totalPrice: number;
    positions: IUserOrderPositions[]
  }