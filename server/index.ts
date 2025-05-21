import app from "@server/app";

Bun.serve({
    fetch: app.fetch
})

console.log("OP-MDT Is Running");