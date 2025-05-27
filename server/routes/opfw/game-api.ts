import {Hono} from 'hono'
import {FetchFiveM} from "@server/helpers/opfw-fivem";

export const GameApi = new Hono()
    .get('/public/:name', async (c) => {
    const name = c.req.param('name')
    return FetchFiveM(name, c)
    })
    .get('/private/:name', async (c) => {
        const name = c.req.param('name')
        return FetchFiveM(name, c)
    })