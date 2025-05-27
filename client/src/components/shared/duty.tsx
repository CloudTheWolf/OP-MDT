import {useAuth} from "@/context/auth-context";
import {useEffect, useState} from "react";
import {OnDutyResponse} from "@/types/OnDuty";

export function Duty()
{
    const { user, isAuthenticated } = useAuth()
    const [onDutyPd, setOnDutyPd] = useState<OnDutyResponse>([]);
    const [onDutyEms, setOnDutyEms] = useState<OnDutyResponse>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchOnDutyPd = async () => {
            try {
                const res = await fetch('/api/duty/Law%20Enforcement', {
                    credentials: 'include',
                    headers: { 'x-opfw': 'any' },
                });
                if (!res.ok) throw new Error('Failed to fetch On Duty');

                const response: OnDutyResponse = await res.json();
                setOnDutyPd(response);
            } catch (err) {
                console.error('Error loading duty data:', err);
            } finally {
                setLoading(false);
            }
        };
        const fetchOnDutyEms = async () => {
            try {
                const res = await fetch('/api/duty/Medical', {
                    credentials: 'include',
                    headers: { 'x-opfw': 'any' },
                });
                if (!res.ok) throw new Error('Failed to fetch On Duty');

                const response: OnDutyResponse = await res.json();
                setOnDutyEms(response);
            } catch (err) {
                console.error('Error loading duty data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOnDutyPd();
        fetchOnDutyEms();
    }, []);


    if (loading) return (
        <div className="grid grid-rows-3 gap-4 h-[92vh]">
            <div className="h-full">
                <div className="rounded-xl bg-muted/50 h-full">
                    <div className="p-2 shrink-0">
                        <h2 className="pl-2 pt-2">PD On-Duty </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4">
                        Loading...
                    </div>
                </div>
            </div>
            <div className="h-full">
                <div className="rounded-xl bg-muted/50 h-full">
                    <div className="p-2 shrink-0">
                        <h2 className="pl-2 pt-2">EMS On Duty </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4">
                        Loading...
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col">
                <div className="rounded-xl bg-muted/50 h-full">
                    <div className="p-2 shrink-0">
                        <h2 className="pl-2 pt-2">DOC On Duty </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4">
                        Loading...
                    </div>
                </div>
            </div>
        </div>
    )
    if (!user || !isAuthenticated) return <div></div>

    return (
        <div className="grid grid-rows-3 h-[92vh]">
            <div className="h-[30vh]">
                <div className="rounded-xl bg-muted/50 h-[30vh]">
                    <div className="p-2 shrink-0">
                        <h2 className="pl-2 pt-2">PD On-Duty </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4 h-[calc(28.5vh-59px)] overflow-auto">
                        {onDutyPd
                            ?.filter((officer) => officer.department.toLowerCase() !== 'doc')
                            .map((officer) => (
                                <div key={officer.characterId}>
                                    <strong>{officer.callsign}</strong>: {officer.firstName} {officer.lastName} ({officer.department})
                                    {officer.undercover && <span> 🔒 Undercover</span>}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="h-[30vh]">
                <div className="rounded-xl bg-muted/50 h-[30vh] ">
                    <div className="p-2 shrink-0">
                        <h2 className="pl-2 pt-2">EMS On-Duty </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4 h-[calc(27.5vh-59px)] overflow-auto">
                        {onDutyEms?.map((ems) => (
                            <div key={ems.characterId}>
                                <strong>{ems.callsign}</strong>: {ems.firstName} {ems.lastName} ({ems.department})
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-[30vh] flex flex-col">
                <div className="rounded-xl bg-muted/50 h-[30vh]">
                    <div className="p-2 shrink-0">
                        <h2 className="pl-2 pt-2">DOC On Duty </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4 h-[calc(28.5vh-59px)] overflow-auto">
                        {onDutyPd
                            ?.filter((doc) => doc.department.toLowerCase() === 'doc')
                            .map((doc) => (
                                <div key={doc.characterId}>
                                    <strong>{doc.callsign}</strong>: {doc.firstName} {doc.lastName} ({doc.department})
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>

    )
}