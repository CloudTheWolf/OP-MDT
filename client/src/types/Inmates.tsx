export type Inmate = {
    character_id: number;
    first_name: string;
    last_name: string;
    jail: number;
};

export type InmatesData = {
    data: Inmate[];
};

export type InmatesResponse = {
    inmates: InmatesData;
};