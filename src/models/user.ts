import Client from "../database";
import bcrypt from "bcrypt";

const pepper: string = process.env.BCRYPT_PW as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    password: string
}

export class UserStore {

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users;';

            const result = await conn.query(sql);

            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';

            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        }catch(err){
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User>{
        try{
            const conn = await Client.connect();
            const sql = "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *;";
            const hashedPassword = bcrypt.hashSync(user.password + pepper, saltRounds);

            const result = await conn.query(sql, [user.firstName, user.lastName, hashedPassword]);
            conn.release();

            return result.rows[0];
        }catch(err){
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async authenticate(loginUser: User): Promise<User | null> {
        try{
            const conn = await Client.connect();
            const sql = `SELECT * FROM users WHERE first_name = $1 and last_name = $2`;

            const result = await conn.query(sql,[loginUser.firstName, loginUser.lastName]);
            if(result.rows.length > 0){
                const user = result.rows[0];

                if(bcrypt.compareSync(loginUser.password + pepper, user.password)){
                    return user;
                }
            }
            return null;
        }catch(err){
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }


}
