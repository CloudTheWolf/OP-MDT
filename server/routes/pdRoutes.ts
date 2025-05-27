import {Hono} from "hono";
import {pdAnnouncementsRoute} from "@server/routes/pd/announcements";
import {timeRoute} from "@server/routes/pd/time";
import {warrantsRoute} from "@server/routes/pd/warrents";
import {inmatesRoute} from "@server/routes/pd/inmates";
import {holdsRoute} from "@server/routes/pd/vehicle-holds";

export const pdRoute = new Hono()
    .route('/announcements', pdAnnouncementsRoute)
    .route('/time',timeRoute)
    .route('/warrants',warrantsRoute)
    .route('/inmates',inmatesRoute)
    .route('/holds',holdsRoute)