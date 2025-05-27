export type DepartmentRole = {
    training: boolean;
    characterId: number;
    department: string;
    licenseIdentifier: string;
};

export type DepartmentData = {
    [departmentName: string]: DepartmentRole[];
};

export type OnDutyResponse = {
    data: DepartmentData;
    statusCode: number;
};
