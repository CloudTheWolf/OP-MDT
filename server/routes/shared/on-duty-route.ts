import {Hono} from "hono";
import {FetchFiveM} from "@server/helpers/opfw-fivem";
import {characters, roster} from '@server/drizzle/schema';
import {db} from "@server/helpers/database-helper";
import {eq, inArray} from "drizzle-orm";
import type {OnDutyResponse} from "@server/types/OnDutyTypes";

export const OnDutyRoute = new Hono();

OnDutyRoute.get('/:department', async (c) => {
    const rawDepartment = c.req.param('department');
    const department = decodeURIComponent(rawDepartment);

    const dutyRaw = await FetchFiveM('duty', c);
    const duty = (await dutyRaw.json()) as OnDutyResponse;

    const departmentDuty = duty?.data?.[department];
    if (!departmentDuty || !Array.isArray(departmentDuty)) {
        return c.json({ error: 'Department not found or invalid format' }, 404);
    }
    const characterIds = departmentDuty.map((entry) => entry.characterId);

    const results = await db
        .select({
            characterId: characters.characterId,
            firstName: characters.firstName,
            lastName: characters.lastName,
            callsign: roster.callsign,
        })
        .from(characters)
        .leftJoin(roster, eq(roster.characterId, characters.characterId))
        .where(inArray(characters.characterId, characterIds))
        .execute();

    const charMap = new Map<
        number,
        { firstName: string | null; lastName: string | null; callsign: string | null }
    >();

    for (const row of results) {
        charMap.set(row.characterId, {
            firstName: row.firstName,
            lastName: row.lastName,
            callsign: row.callsign,
        });
    }

    const enriched = departmentDuty.map((entry) => {
        const match = charMap.get(entry.characterId);
        return {
            ...entry,
            firstName: match?.firstName ?? null,
            lastName: match?.lastName ?? null,
            callsign: match?.callsign ?? null,
        };
    });

    return c.json(enriched);
});