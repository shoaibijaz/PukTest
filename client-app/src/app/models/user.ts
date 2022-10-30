export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    lastLogin: Date;
    createDate: Date;
    suspended: boolean;
    token: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}