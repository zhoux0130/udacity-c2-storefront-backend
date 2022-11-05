import { Order, OrderStore } from '../../models/order'
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';

const store = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

let testUserId: number;

describe('Order Store Model', () => {

  beforeAll(async() => {
    const user = {
      firstName:'Ada05',
      lastName:'Choo05',
      password:'12305'
    }
    const userResult = await userStore.create(user);
    testUserId = userResult.id!;

    const product = {
      name: 'Apple',
      price: 0.59,
      category: 4
    }
    const productResut = await productStore.create(product);
    const productId:number = productResut.id!;

    const order: Order = {
      quantity: 1,
      status: 'active',
      userId: testUserId,
      productId
    }
    const orderResult = await store.createOrder(order) // 并且创建好了关联关系
  })

  it('should have an getUserOrders method', async () => {
    expect(store.getUserOrders).toBeDefined();
  });

  it('should get test users orders', async () => {
    const orders = await store.getUserOrders(testUserId.toString());
    expect(orders).toHaveSize;
  });
})