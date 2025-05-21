import {useAuth} from "@/context/auth-context";
import {useEffect, useState} from "react";
import type {Announcement, DraftContent} from '@/types/Announcement'

export function Announcements()
{
    const { user, isAuthenticated } = useAuth()
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch('/api/pd/announcements', { credentials: 'include' })
                if (!res.ok) throw new Error('Failed to fetch announcements')
                const data: Announcement[] = await res.json()

                setAnnouncements(data)
            } catch (err) {
                console.error('Error loading announcements:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchAnnouncements()
    }, [])

    if (loading) return <div>Loading announcements...</div>

    if (!user || !isAuthenticated || announcements.length === 0) return <div>No announcements available.</div>

    return (
        <>
            <div className="container p-2">
                <h2 className="ml-2 mt-1">Announcements</h2>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-90">
            {announcements.map((a) => {
                let parsed: DraftContent | null = null

                try {
                    parsed = JSON.parse(a.announcement)
                } catch  {
                    console.warn(`Invalid announcement JSON in ID ${a.announcementId}`)
                }

                return (
                    <div
                        key={a.announcementId}
                        className={`rounded border p-4 shadow-sm m-2 ${
                            a.type === 'important'
                                ? 'bg-red-100 border-red-700 dark:bg-red-950'
                                : 'bg-white dark:bg-gray-900'
                        }`}
                    >
                        <h3 className="font-semibold text-md mb-1 text-black dark:text-white">
                            {a.type === 'important' ? '⚠️ Important' : a.type.charAt(0).toUpperCase() + a.type.slice(1)}
                        </h3>

                        <div className={`text-sm whitespace-pre-wrap
                            ${
                                a.type === 'important'
                                    ? 'text-white'
                                    : 'text-muted-foreground'
                            }`}>
                            {parsed?.blocks.map((block) => (
                                <p key={block.key} className="mb-2">
                                    {block.text}
                                </p>
                            ))}
                        </div>

                        <p className={`text-xs mt-2
                        ${
                            a.type === 'important'
                                ? 'text-white'
                                : 'text-gray-500'
                        }`}>
                            Posted by {a.created_by_first_name} •{' '}
                            {new Date(a.added_date_time).toLocaleString()}
                        </p>
                    </div>
                )
            })}
        </div>
        </>
    )
}