import supertest from "supertest";
import app from '../../server';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { idText } from "typescript";

dotenv.config();
const pepper: string = process.env.BCRYPT_PW as string;

const request = supertest(app);

describe("testing /users endpoint", () => {
  const lilyChoo: User = {
    firstName: 'Lily',
    lastName: 'Choo',
    password: '123'
  }

  let tokenLily: string;
  
  it("should create user Lily", async () => {
    const response = await request.post('/users').send(lilyChoo).expect(200)
  })

})