import {glob} from 'glob'
import path from 'path'
import {Cron} from 'croner'

export async function initializeCronJobs() {
    try {
        const jobFiles = glob.sync('./jobs/**/*.ts', { cwd: __dirname })

        console.log(`Found ${jobFiles.length} jobs`)

        for (const file of jobFiles) {
            const fullPath = path.resolve(__dirname, file)
            const taskModule = await import(fullPath)

            const { schedule, job, enabled = true } = taskModule

            if (!schedule || typeof job !== 'function') {
                console.warn(`Skipping ${file} – missing "schedule" or "job"`)
                continue
            }

            if (!enabled) {
                console.log(`Skipping ${file} – disabled`)
                continue
            }

            // ✅ Schedule using Croner
            const task = new Cron(schedule, {timezone: 'UTC'}, job)

            if (!task) {
                console.warn(`Invalid cron expression in ${file}: "${schedule}"`)
                continue
            }

            console.log(`Scheduled ${file} with cron "${schedule}"`)
        }
    } catch (error: any) {
        if (error instanceof AggregateError) {
            console.error(`AggregateError with ${error.errors.length} issues`)
            for (const e of error.errors) console.error(' ->', e)
        } else {
            console.error('Failed to initialize cron jobs:', error)
        }
    }
}