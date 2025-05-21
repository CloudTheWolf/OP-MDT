import {Hono} from "hono";
import {pdAnnouncementsRoute} from "@server/routes/pd/announcements";
import {timeRoute} from "@server/routes/pd/time";

export const pdRoute = new Hono()
    .route('/announcements', pdAnnouncementsRoute)
    .route('/time',timeRoute)