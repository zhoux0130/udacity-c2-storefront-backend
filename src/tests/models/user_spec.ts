import { User, UserStore } from "../../models/user";

const userStore = new UserStore;

describe('User Store Model',()=>{
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('index method should return a list of weaponse', async () => {
        const result = await userStore.index()
        expect(result).toHaveSize;
    })

    // it('auth the user: Lily and correct password', async () => {
    //     const user: User= {
    //         firstName: 'Lily',
    //         lastName: 'Choo',
    //         password: '123'
    //     }
    //     const createQuery = await userStore.create(user);
    //     const result = await userStore.authenticate(user);
    //     expect(result).toHaveSize;
    // })

    it('auth the user: Lily and incorrect password', async () => {
        const user= {
            firstName: 'Lily',
            lastName: 'Choo',
            password: '1234'
        }
        const result = await userStore.authenticate(user);
        expect(result).toBeNull;
    })

    it('show the user info', async () => {
        const id: string = '2';
        const user: User = await userStore.show(id);
        expect(user.id).toEqual(parseInt(id));
    })

})