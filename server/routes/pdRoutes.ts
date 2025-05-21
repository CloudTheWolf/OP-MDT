import {Hono} from "hono";
import {pdAnnouncementsRoute} from "@server/routes/pd/announcements";

export const pdRoute = new Hono()
    .route('/announcements', pdAnnouncementsRoute)