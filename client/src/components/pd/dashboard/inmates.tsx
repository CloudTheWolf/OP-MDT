import {useAuth} from "@/context/auth-context";
import {useEffect, useState} from "react";
import type {Inmate, InmatesResponse} from "@/types/Inmates";
import {formatDuration} from "@/helpers/time-helper";

export function Inmates() {
    const { user, isAuthenticated } = useAuth();
    const [inmates, setInmates] = useState<Inmate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInmates = async () => {
            try {
                const res = await fetch("/api/pd/inmates", {
                    credentials: "include",
                    headers: { "x-opfw": "any" },
                });
                if (!res.ok) throw new Error("Failed to fetch inmates");

                const response: InmatesResponse = await res.json();
                setInmates(response.inmates.data);
            } catch (err) {
                console.error("Error loading inmates:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInmates();
    }, []);

    if (loading) return <div>Loading Inmates...</div>;
    if (!user || !isAuthenticated || inmates.length === 0)
        return (
            <div className="relative h-full flex flex-col">
                <div className="p-2 shrink-0">
                    <h2 className="ml-2 mt-1">Inmates</h2>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4" />
            </div>
        );

    return (
        <div className="relative h-full flex flex-col">
            <div className="p-2 shrink-0">
                <h2 className="ml-2 mt-1">Inmates</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-2 space-y-4">
                {inmates.map((a) => {
                    const now = Math.floor(Date.now() / 1000);
                    const secondsRemaining = a.jail - now;
                    const formatted = formatDuration(secondsRemaining);

                    return (
                        <div
                            key={a.character_id}
                            className="rounded border px-4 py-1 shadow-sm bg-white dark:bg-neutral-800"
                        >
                            <h3 className="font-semibold text-md text-black dark:text-white flex justify-between items-center">
                                <span>{a.first_name} {a.last_name}</span>
                                <span className="text-sm whitespace-pre-wrap text-muted-foreground">🕛: {formatted}</span>
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
