import Client from '../database';

export type Order = {
  id?: number,
  quantity: number,
  status: string,
  user_id: number,
  product_id: number
}

export class OrderStore {
  // async getOrders(userId: string): Promise<Order[]> {

  // }
}

