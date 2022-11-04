import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/verifyAuth';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try{
    const products = await store.index();
    res.send({products});
  }catch(err){
    res.status(400).send(err.message);
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const productId = req.params.id;
    const products = await store.show(productId);
    res.send(products);
  }catch(err){
    res.status(400).send(err.message);
  }
}

const create = async (req: Request, res: Response) => {
  try{
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };

    const newProduct = await store.create(product);
    res.send(newProduct);
  }catch(err){
    res.status(401);
    res.send(err)
  } 
}

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.post("/products", verifyAuthToken, create);
  app.get("/products/:id", show);
}

export default product_routes;