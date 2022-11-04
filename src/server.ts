import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import  user_routes from './handlers/user'
import product_routes from './handlers/product';
import order_routes from './handlers/order';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

user_routes(app);
product_routes(app);
order_routes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app;