import {useAuth} from "@/context/auth-context";
import {useEffect, useState} from "react";
import type {Hold, HoldsResponse} from "@/types/Holds";
import {formatDuration} from "@/helpers/time-helper";

export function Holds() {
    const { user, isAuthenticated } = useAuth();
    const [holds, setHolds] = useState<Hold[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHolds = async () => {
            try {
                const res = await fetch("/api/pd/holds", {
                    credentials: "include",
                    headers: { "x-opfw": "any" },
                });
                if (!res.ok) throw new Error("Failed to fetch holds");

                const response: HoldsResponse = await res.json();
                setHolds(response.holds);
            } catch (err) {
                console.error("Error loading holds:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHolds();
    }, []);

    if (loading) return <div>Loading Holds...</div>;
    if (!user || !isAuthenticated || holds.length === 0)
        return (
            <div className="relative h-full flex flex-col">
                <div className="p-2 shrink-0">
                    <h2 className="ml-2 mt-1">Holds</h2>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4" />
            </div>
        );

    return (
        <div className="relative h-full flex flex-col">
            <div className="p-2 shrink-0">
                <h2 className="ml-2 mt-1">Holds</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-2 space-y-4">
                {holds.map((a) => {
                    const now = Math.floor(Date.now() / 1000);
                    const secondsRemaining = a.police_impound_expire - now;
                    const formatted = formatDuration(secondsRemaining);

                    return (
                        <div
                            key={a.owner_cid}
                            className="rounded-xl border pt-1 px-3 shadow-sm bg-white dark:bg-neutral-800"
                        >
                            <h3 className="font-semibold text-md text-black dark:text-white flex justify-between items-center">
                                <span>{a.first_name} {a.last_name} - {a.label} ({a.plate})</span>
                                <span className="text-sm whitespace-pre-wrap text-muted-foreground">🕛 {formatted}</span>
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
