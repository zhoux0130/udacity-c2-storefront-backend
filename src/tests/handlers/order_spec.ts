import { Order } from "../../models/order"

import app from '../../server';
import supertest from "supertest";
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe("testing /order endpoint", () => {

  let token: string;
  let userId: number;

  beforeAll(async() => {
    const user = {
      firstName:'Lily',
      lastName:'Choo',
      password:'123'
    }
    const userResponse = await request.post('/users').send(user);
    token = userResponse.body;

    const decoded:any = jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
    userId = decoded.user.id;

    const product = {
      name: 'Apple',
      price: 0.59,
      category: 4
    }
    const productResponse = await request.post('/products').send(product);
    const productId:number = productResponse.body.id!;

    const order: Order = {
      quantity: 1,
      status: 'active',
      userId,
      productId
    }
    await request.post('/orders').send(order);
  })

  it('get the user order list', async () => {
    const response = await request.get('/orders?userId=' + userId).set("Authorization", "bearer " + token).expect(200);
    expect(response.body.orders).toHaveSize;
  })

})