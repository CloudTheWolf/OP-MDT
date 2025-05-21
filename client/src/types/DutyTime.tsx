export type DutyTimeWeek = {
    normal?: number
    training?: number
    undercover?: number
}

export type OnDutyTimeParsed = Record<number, DutyTimeWeek>

export type DutyTimeResponse = {
    character_id: number
    on_duty_time: string // JSON string — will be parsed
}