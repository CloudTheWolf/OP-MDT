import {Hono} from "hono";
import {FetchFiveM} from "@server/helpers/opfw-fivem";

export const inmatesRoute = new Hono()

inmatesRoute.get('/', async (c) => {

    try {
        const inmatesRaw = await FetchFiveM('inmates', c);
        const inmates = await inmatesRaw.json();
        console.log(inmates);
        return c.json({ inmates });
    } catch (error: any) {
        return c.json({error: `${error.message}`},500)
    }
});