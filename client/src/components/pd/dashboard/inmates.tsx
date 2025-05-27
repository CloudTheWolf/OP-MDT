import {useAuth} from "@/context/auth-context";
import {useEffect, useState} from "react";
import {Warrant} from "@/types/Warrant";

export function Inmates()
{
    const { user, isAuthenticated } = useAuth()
    const [warrants, setwarrants] = useState<Warrant[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchWarrantsBolos = async () => {
            try {
                const res = await fetch('/api/opfw/private/inmates', { credentials: 'include', headers: { 'x-opfw': 'any' } })
                if (!res.ok) throw new Error('Failed to fetch announcements')
                const data: Warrant[] = await res.json()

                setwarrants(data)
            } catch (err) {
                console.error('Error loading warrants:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchWarrantsBolos()
    }, [])

    if (loading) return <div>Loading inmates...</div>

    if (!user || !isAuthenticated || warrants.length === 0) return <div>No warrants available.</div>

    return (
        <div className="h-full flex flex-col">
            <div className="container p-2">
                <h2 className="ml-2 mt-1">Warrants & BOLOs </h2>
            </div>
            <div className="space-y-4 overflow-y-auto px-2 pb-2">
            {warrants.map((w) => {

                return (
                    <div
                        key={w.id}
                        className={`rounded border p-4 shadow-sm m-2 bg-white dark:bg-gray-900`}
                    >
                        <h3 className="font-semibold text-md mb-1 text-black dark:text-white">
                            {w.characterFirstName} {w.characterLastName}
                        </h3>

                        <div className={`text-sm whitespace-pre-wrap text-muted-foreground`}>
                                <p className="mb-2">
                                    {w.details}
                                </p>
                        </div>

                        <p className={`text-xs mt-2 text-gray-500`}>
                            Posted by {w.officerFirstName} {w.officerLastName} •{' '}
                            {new Date(w.createdAt).toLocaleString()}
                        </p>
                    </div>
                )
            })}
        </div>
        </div>
    )
}