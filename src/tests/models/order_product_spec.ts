import { Order, OrderStore } from '../../models/order';
import { OrderProductStore } from '../../models/order_product';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const store = new OrderProductStore();

describe('Order Product Store Model', () => {

    let testUserId: number;
    let productId: number;
    let order: Order;

    beforeAll(async () => {
        const user = {
            firstName:'Lily',
            lastName:'Choo',
            password:'123'
          }
          const userResult = await userStore.create(user);
          testUserId = userResult.id!;
      
          const product = {
            name: 'Apple',
            price: 0.59,
            category: 4
          }
          const productResut = await productStore.create(product);
          productId = productResut.id!;
      
          order = {
            quantity: 1,
            status: 'active',
            userId: testUserId,
            productId
          }
          const orderResult = await orderStore.create(order);
          order.id = orderResult.id!;
    })

    it('should creat a new order with orderProduct', async () => {
      const orderProduct = await store.createOrderProduct(order);
      console.log('tests orderProduct', orderProduct);

      expect(orderProduct.quantity).toEqual(1);
      expect(orderProduct.productId).toEqual(productId);
    });
})