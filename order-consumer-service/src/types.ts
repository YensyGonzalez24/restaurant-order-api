export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  value: number;
  items: OrderItem[];
  createdAt: string;
}
