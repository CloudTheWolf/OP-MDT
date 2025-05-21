import {Hono} from "hono";
import {time} from '@server/drizzle/schema'
import {db} from "@server/helpers/database-helper";
import {eq} from "drizzle-orm";

export const timeRoute = new Hono();

timeRoute.get('/:characterId', async (c) => {
    const {characterId} = c.req.param();
    try{

        const result = await db
            .select({
                onDutyTime: time.onDutyTime,
            })
            .from(time)
            .where(eq(time.characterId, characterId))
            .execute()

        const raw = result?.[0]
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
        return c.json(parsed);
    } catch (error) {
        return c.json({error: `${error}`},400)
    }

})