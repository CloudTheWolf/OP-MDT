import app from "@server/app";
import {initializeCronJobs} from "@server/cron/cron";

Bun.serve({
    fetch: app.fetch
})

initializeCronJobs()
console.log("OP-MDT Is Running");