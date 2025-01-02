export interface Orders {
  _id: string;
  items: {
    _id: string;
    product: {
      _id: string;
      name: string;
      cover: string;
    };
    price: number;
    quantity: number;
  }[],
  payment: string;
  isDelivered: boolean;
  deliveredAt: Date;
  isPaid: boolean;
  paidAt: Date;
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
