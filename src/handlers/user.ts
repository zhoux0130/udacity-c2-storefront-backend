import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/verifyAuth';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index()

  res.json(users);
}

const show = async (_req: Request, res: Response) => {
  const id = _req.params.id;
  const user = await store.show(id);
  res.json(user);
}

const create = async (_req: Request, res: Response) => {
  const user: User = {
    firstName: _req.body.firstName,
    lastName: _req.body.lastName,
    password: _req.body.password
  }

  try{
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser}, process.env.TOKEN_SECRET!);

    res.json(token);
  }catch(err){
    res.status(404);
    res.send(err+ user);
  }
}

const user_routes = (app: express.Application) => {
  app.get('/users',verifyAuthToken, index);
  app.get('/users/:id',verifyAuthToken, show);

  app.post('/users', create);
}

export default user_routes;