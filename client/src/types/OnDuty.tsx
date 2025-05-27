export type OnDutyEntry = {
    training: boolean;
    characterId: number;
    department: string;
    licenseIdentifier: string;
    firstName: string | null;
    lastName: string | null;
    callsign: string | null;
    undercover?: boolean; // if optional in some entries
};

export type OnDutyResponse = OnDutyEntry[];