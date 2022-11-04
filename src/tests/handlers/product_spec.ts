import supertest from 'supertest';
import { Product } from '../../models/product';
import app from '../../server';


const request = supertest(app);


describe("testing /product endpoint", () => {

  const book: Product = {
    name: 'book',
    price: 1.99,
    category: 5
  }
  let token: string;
  let productId: number;

  beforeAll(async () => {
    const response = await request.post('/users').send({
      first_name:'Lily',
      last_name: 'Choo',
      password: '123'
    })

    token = response.body;
  })

  it("should create product Book", async () => {
    const response = await request.post('/products').set("Authorization", "bearer " + token)
        .send(book).expect(200);
        
    productId = response.body.id;
    expect(response.body.name).toEqual('book');
  })

  
  it("should get product Book just created", async () => {
    const response = await request.get('/products/'+ productId).expect(200);
    expect(response.body.name).toEqual('book');
  })

  it("index all the products", async () => {
    const response = await request.get('/products').expect(200);
    expect(response.body.products).toHaveSize;
  })


})