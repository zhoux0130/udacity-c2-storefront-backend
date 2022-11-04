import { UserStore } from "../../models/user";

const userStore = new UserStore;

describe('User Store Model',()=>{
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('index method should return a list of weaponse', async () => {
        const result = await userStore.index()
        expect(result).toEqual([])
    })
})