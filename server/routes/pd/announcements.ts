import {Hono} from "hono";
import {db} from "@server/helpers/database-helper";
import {desc, eq, gte, isNull, or} from "drizzle-orm";
import {announcements, characters} from "@server/drizzle/schema";

export const pdAnnouncementsRoute = new Hono()

pdAnnouncementsRoute.get('/', async (c) => {

    try {
        const now = new Date()
        const result = await db
            .select({
                announcementId: announcements.announcementId,
                type: announcements.type,
                announcement: announcements.announcement,
                added_by: announcements.addedBy,
                added_date_time: announcements.addedDateTime,
                expire_on: announcements.expireOn,
                created_by_first_name: characters.firstName,
                created_by_last_name: characters.lastName,
            })
            .from(announcements)
            .leftJoin(characters, eq(announcements.addedBy, characters.characterId))
            .where(or(isNull(announcements.expireOn), gte(announcements.expireOn, now)))
            .orderBy(desc(announcements.type), desc(announcements.addedDateTime))
            .execute()
        return c.json(JSON.parse(JSON.stringify(result)))
    } catch (error: any) {
        return c.json({error: `${error.message}`},500)
    }
});