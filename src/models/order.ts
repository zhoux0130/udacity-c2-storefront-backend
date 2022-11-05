import Client from '../database';
import { OrderProduct, OrderProductStore } from './order_product';

const orderProductStore = new OrderProductStore();

export type Order = {
  id?: number,
  quantity: number,
  status: string,
  userId: number,
  productId: number
}

export class OrderStore {
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT order_id, name, price, quantity, status, user_id FROM orders 
          INNER JOIN order_products ON id(orders)=order_id 
          INNER JOIN products ON product_id=id(products) 
          INNER JOIN users ON user_id=id(users) 
          WHERE user_id=${userId};`


      const result = await conn.query(sql);
      conn.release()

      return result.rows
    } catch (err) {
        throw new Error(`Could not find order ${userId}. Error: ${err}`)
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const orderResult = await this.create(order);

      order.id = orderResult.id;
      const result = await orderProductStore.createOrderProduct(order);   
      
      conn.release();
      return order;
    } catch (err) {
        throw new Error(`Could not add new order from user ${order.userId}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;';
      
      const result = await conn
          .query(sql, [order.userId, order.status]);
      
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Could not add new order from user ${order.userId}. Error: ${err}`);
    }
  }
}

