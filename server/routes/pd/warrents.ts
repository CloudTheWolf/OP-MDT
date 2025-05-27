import {Hono} from "hono";
import {db} from "@server/helpers/database-helper";
import {asc, eq} from "drizzle-orm";
import {characters, characterWarrantsBolos} from "@server/drizzle/schema";
import {alias} from "drizzle-orm/mysql-core";

export const warrantsRoute = new Hono()

warrantsRoute.get('/', async (c) => {

    try {
        const now = new Date()
        const character = alias(characters, 'character');
        const officer = alias(characters, 'officer');
        const result = await db
            .select({
                id: characterWarrantsBolos.id,
                characterId: characterWarrantsBolos.characterId,
                officerId: characterWarrantsBolos.officerId,
                details: characterWarrantsBolos.details,
                served: characterWarrantsBolos.served,
                createdAt: characterWarrantsBolos.createdAt,
                characterFirstName: character.firstName,
                characterLastName: character.lastName,
                officerFirstName: officer.firstName,
                officerLastName: officer.lastName,
            })
            .from(characterWarrantsBolos)
            .leftJoin(character, eq(characterWarrantsBolos.characterId, character.characterId))
            .leftJoin(officer, eq(characterWarrantsBolos.officerId, officer.characterId))
            .where(eq(characterWarrantsBolos.served,0))
            .orderBy(asc(characterWarrantsBolos.createdAt))
            .execute()
        return c.json(JSON.parse(JSON.stringify(result)))
    } catch (error: any) {
        return c.json({error: `${error.message}`},500)
    }
});