import {db} from "../../helpers/database-helper.js";
import {login, roster} from "../../drizzle/schema.js";
import {notInArray} from "drizzle-orm";

export const schedule = '* * * * *';
export const enabled = true;

// Set to true to preview only, false to perform deletion
const dryRun = false;

export const job = async () => {
    console.debug("Checking for orphaned logins...");

    const orphanedLogins = await db
        .select()
        .from(login)
        .where(
            notInArray(
                login.characterId,
                db
                    .select({ characterId: roster.characterId })
                    .from(roster)
            )
        );

    if (orphanedLogins.length === 0) {
        console.info("No orphaned logins found.");
        return;
    }

    console.info(`Found ${orphanedLogins.length} orphaned logins.`);

    if (dryRun) {
        console.table(orphanedLogins);
        console.info("Dry run enabled — no deletions performed.");
    } else {
        const result = await db
            .delete(login)
            .where(
                notInArray(
                    login.characterId,
                    db
                        .select({ characterId: roster.characterId })
                        .from(roster)
                )
            )
            .execute();
    }
};
