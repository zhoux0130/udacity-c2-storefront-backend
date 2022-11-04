import supertest from "supertest";
import app from '../../server';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const pepper: string = process.env.BCRYPT_PW as string;

const request = supertest(app);

describe("testing /user endpoint", () => {
  const lilyChoo: User = {
    firstName: 'Lily',
    lastName: 'Choo',
    password: '123'
  }

  let tokenLily: string;
  let userIdLily: number;
  
  it("should create user Lily", async () => {
    const response = await request.post('/users').send(lilyChoo).expect(200);
    tokenLily = response.body;

    const decoded:any = jwt.verify(tokenLily, process.env.TOKEN_SECRET as jwt.Secret);
    userIdLily = decoded.user.id;
  })

  it("show the user-Lily created before", async () => {
    const path = '/users/' + userIdLily; 
    const response = await request.get(path).set("Authorization", "bearer " + tokenLily).expect(200);
  })

  it("index all the users created before", async () => {
    const response = await request.get('/users').set("Authorization", "bearer " + tokenLily).expect(200);
  })

})