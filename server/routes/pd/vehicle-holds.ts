import {Hono} from "hono";
import {FetchFiveM} from "@server/helpers/opfw-fivem";
import {db} from "@server/helpers/database-helper";
import {characters} from "@server/drizzle/schema";
import {inArray} from "drizzle-orm";

export const holdsRoute = new Hono()

holdsRoute.get('/', async (c) => {

    try {
        const holdsRaw = await FetchFiveM('holds', c);
        const vehiclesRaw = await FetchFiveM('vehicles', c);
        const holdsWrapper = await holdsRaw.json();
        const vehiclesWrapper = await vehiclesRaw.json();

        const holds = holdsWrapper.data;
        const vehicleEntries = Object.values(vehiclesWrapper.data) as {
            model: string;
            label: string;
        }[];

        const vehicleLabelMap = new Map<string, string>(
            vehicleEntries.map((v) => [v.model, v.label])
        );

        const characterIds = [...new Set(holds.map((entry: any) => entry.owner_cid))];
        const characterData = await db
            .select({
                character_id: characters.characterId,
                first_name: characters.firstName,
                last_name: characters.lastName,
            })
            .from(characters)
            // @ts-ignore
            .where(inArray(characters.characterId, characterIds));

        const characterMap = new Map<number, { first_name: string; last_name: string }>();
        for (const char of characterData) {
            characterMap.set(char.character_id, {
                // @ts-ignore
                first_name: char.first_name,
                // @ts-ignore
                last_name: char.last_name,
            });
        }
        const enrichedHolds = holds.map((entry: any) => {
            const label = vehicleLabelMap.get(entry.model_name) ?? entry.model_name;
            const nameInfo = characterMap.get(entry.owner_cid) ?? { first_name: '', last_name: '' };

            return {
                ...entry,
                label,
                first_name: nameInfo.first_name,
                last_name: nameInfo.last_name,
            };
        });
        return c.json({ holds: enrichedHolds });
    } catch (error: any) {
        return c.json({error: `${error.message}`},500)
    }
});