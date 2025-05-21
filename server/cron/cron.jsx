import schedule from 'node-schedule';
import { glob } from 'glob';
import path from 'path';

export async function initializeCronJobs() {
    try {
        const taskFiles = glob.sync('./jobs/**/*.jsx', {cwd: __dirname});
        console.log(`Found ${taskFiles.length} jobs`);
        for (const file of taskFiles) {
            const taskModule = await import(path.resolve(__dirname, file));
            if (taskModule.schedule && typeof taskModule.job === 'function') {
                if (taskModule.enabled) {
                    console.log(`Scheduling task from file: ${file} with cron: ${taskModule.schedule}`);
                    schedule.scheduleJob(taskModule.schedule, taskModule.job);
                } else {
                    console.log(`Skipping file: ${file} as it is disabled`)
                }
            } else {
                console.warn(`Skipping file: ${file} as it does not export a valid "schedule" or "job"`);
            }
        }
    } catch (error) {
        if (error instanceof AggregateError) {
            console.error(`Error loading and scheduling tasks: AggregateError with ${error.errors.length} errors`);
            for (const individualError of error.errors) {
                console.error(`Individual error: ${individualError}`);
            }
        } else {
            console.error(`Error loading and scheduling tasks: ${error}`);
        }
    }
}