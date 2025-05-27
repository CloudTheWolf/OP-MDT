import moment from 'moment';
import momentDurationFormatSetup from "moment-duration-format";

const weekZero = 1609113600;
const secondsInThreeHours = 10800;

momentDurationFormatSetup(moment);

export function getCurrentWeek() {
    const difference = moment().utc().unix() - weekZero;

    return Math.floor(difference / 604800);
}

export function getDateRange(week: number) {
    const timestamp = (week * 604800) + weekZero;

    const isoWeek = moment.unix(timestamp).utc();

    return isoWeek.format('MM/DD') + " - " + isoWeek.add(6, 'days').format('MM/DD');
}

export function getDateLabel(week: number) {
    if (week === 0) {
        return 'Current';
    }

    if (week === 1) {
        return 'Last';
    }

    return `${week} Weeks`;
}

export function getOverUnder(seconds: number) {
    if (seconds < secondsInThreeHours) {
        return 'under';
    }

    return 'over';
}


export function getFormattedSeconds(seconds: number): string {
    const duration = moment.duration(seconds, 'seconds');

    if (seconds === 0) return '00:00';

    const days = Math.floor(duration.asDays());

    if (days >= 1) {
        const remaining = moment.duration(seconds % 86400, 'seconds');
        const timePart = remaining.format('hh:mm:ss', { trim: false });
        return `${days}d ${timePart}`;
    }

    return duration.format('hh:mm:ss', { trim: false });
}

export function formatDuration(seconds: number): string {
    const abs = Math.abs(seconds);
    const sign = seconds < 0 ? "-" : "";

    const SECONDS_IN_YEAR = 31536000;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_MINUTE = 60;

    const years = Math.floor(abs / SECONDS_IN_YEAR);
    const days = Math.floor((abs % SECONDS_IN_YEAR) / SECONDS_IN_DAY);
    const hours = Math.floor((abs % SECONDS_IN_DAY) / SECONDS_IN_HOUR);
    const minutes = Math.floor((abs % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
    const secs = abs % SECONDS_IN_MINUTE;

    const parts = [];
    if (years) parts.push(`${years}y`);
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (secs || parts.length === 0) parts.push(`${secs}s`);

    return `${sign}${parts.join(" ")}`;
}