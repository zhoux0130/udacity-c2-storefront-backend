import Client from '../database';

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
      const sql = `SELECT * FROM orders WHERE user_id=${userId};`;

      const result = await conn.query(sql);

      conn.release()
      return result.rows
    } catch (err) {
        throw new Error(`Could not find order ${userId}. Error: ${err}`)
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *;';
      
      const result = await conn
          .query(sql, [order.userId, order.status, order.productId, order.quantity]);
      
      conn.release();
      return result.rows[0];
    } catch (err) {
        throw new Error(`Could not add new order from user ${order.userId}. Error: ${err}`);
    }
  }
}

