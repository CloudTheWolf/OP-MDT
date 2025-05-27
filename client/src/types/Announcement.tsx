export type DraftInlineStyleRange = {
    offset: number
    length: number
    style: string
}

export type DraftEntityRange = {
    offset: number
    length: number
    key: number
}

export type DraftBlock = {
    key: string
    text: string
    type: string
    depth: number
    inlineStyleRanges: DraftInlineStyleRange[]
    entityRanges: DraftEntityRange[]
    data: Record<string, unknown>
}

export type DraftContent = {
    blocks: DraftBlock[]
    entityMap: Record<string, unknown>
}

export type Announcement = {
    announcementId: number
    type: 'info' | 'warning' | 'important'
    announcement: string // will be parsed as DraftContent
    added_by: number
    added_date_time: string
    expire_on: string | null
    created_by_first_name: string
}