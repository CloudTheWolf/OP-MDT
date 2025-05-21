import {db} from "../../helpers/database-helper.js";
import {eq, lt, or, sql} from "drizzle-orm";
import {sessions} from "../../drizzle/schema.js"
import dotenv from "dotenv";

dotenv.config();

export const schedule = '0 * * * *';
export const enabled = true;
export const job = async () => {
    console.debug("Starting session purge...");
    await db
        .delete(sessions)
        .where(
            or(
                eq(sessions.isRevoked, true),
                lt(sessions.expiresAt, sql`NOW() - INTERVAL 7 DAY`)
            )
        )
        .execute();
};