import { Application, Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import verifyAuthToken from "../middleware/verifyAuth";

const store = new OrderStore();

const getUserOrders = async (request: Request, response: Response) => {
  const { userId } = request.query;
  const orders = await store.getUserOrders(userId as string);
  response.send({ orders });
}

const createOrder = async (request: Request, response: Response) => {
  try{
    const orderModel: Order = {
      quantity: request.body.quantity,
      status: request.body.status,
      userId: request.body.userId,
      productId: request.body.productId
    };

    const order = await store.createOrder(orderModel);
    response.send({ order });
  }catch(err){
    response.status(401);
    response.send(err)
  } 
}

const order_routes = (app: Application) => {
  app.get('/orders', verifyAuthToken, getUserOrders);
  app.post('/orders', verifyAuthToken, createOrder);
}

export default order_routes;
