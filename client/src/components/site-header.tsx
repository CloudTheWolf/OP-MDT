import {SidebarIcon} from "lucide-react"
import {SearchForm} from "@/components/search-form"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {useSidebar} from "@/components/ui/sidebar"
import {NavUser} from "@/components/nav-user"
import {useAuth} from "@/context/auth-context"
import {getCurrentWeek} from "@/helpers/time-helper"
import moment from "moment"
import {useEffect, useState} from "react";
import {OnDutyTimeParsed} from "@/types/DutyTime";


export function SiteHeader() {
    const { toggleSidebar } = useSidebar()
    const { user, loading, isAuthenticated } = useAuth()
    const [dutyData, setDutyData] = useState<OnDutyTimeParsed | null>(null)

    useEffect(() => {
        const fetchDutyTime = async () => {
            try {
                console.log(user)
                const res = await fetch(`/api/time/${user?.characterId}`, { credentials: 'include' })
                if (!res.ok) throw new Error('Failed to fetch duty time')

                const data = await res.json()
                const parsed = JSON.parse(data.onDutyTime) as OnDutyTimeParsed

                setDutyData(parsed)
            } catch (err) {
                console.error('Error loading duty time:', err)
                setDutyData(null)
            }
        }

        fetchDutyTime()
    }, [])

    if (loading) return <div>Loading...</div>
    if (!user || !isAuthenticated) return null // TODO: redirect to login

    const renderTimeOnDuty = () => {
        const currentWeek = getCurrentWeek()
        const week = dutyData?.[currentWeek]

        if (!week) return '00:00:00'

        const totalSeconds =
            (week.normal ?? 0) +
            (week.training ?? 0) +
            (week.undercover ?? 0)

        const duration = moment.duration(totalSeconds, 'seconds')
        const days = Math.floor(duration.asDays())
        const formatted = moment.utc(totalSeconds * 1000).format('HH:mm:ss')

        return days > 0 ? `${days}d ${formatted}` : formatted
    }


    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                <Button
                    className="h-8 w-8"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon />
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <SearchForm className="w-full sm:ml-auto sm:w-auto" />
                <div>
                    <span
                        className="bg-blue-100 text-blue-800 text-s font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                        {renderTimeOnDuty()}
                    </span>
                </div>
                <div>
                    <NavUser
                        userData={{
                            name: `${user.firstName} ${user.lastName}`,
                            callSign: `${user.callsign}`,
                            onDutyTime: renderTimeOnDuty(),
                            mugshot: `${user.mugshot}`
                        }}
                    />
                </div>
            </div>
        </header>
    )
}
