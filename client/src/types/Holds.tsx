export type Hold = {
    vehicle_id: number;
    owner_cid: number;
    first_name: string;
    last_name: string;
    model_name: string;
    label: string;
    plate: string;
    was_boosted: boolean;
    police_impound_expire: number;

};

export type HoldsResponse = {
    holds: Hold[];
};