export const enabled = false

export const schedule = '*/15 * * * *'

export async function job() {
     console.log(`[cron] We Ran`)
}