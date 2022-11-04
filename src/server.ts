import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { UserStore } from './models/user'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', async function (req: Request, res: Response) {
    const user = new UserStore();
    const result = await user.index()
    res.send(result)
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
