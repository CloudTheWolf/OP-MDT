import {Hono} from "hono";
import {pdAnnouncementsRoute} from "@server/routes/pd/announcements";
import {timeRoute} from "@server/routes/pd/time";
import {warrantsRoute} from "@server/routes/pd/warrents";

export const pdRoute = new Hono()
    .route('/announcements', pdAnnouncementsRoute)
    .route('/time',timeRoute)
    .route('/warrants',warrantsRoute)