import { UserRole } from "./user-role.enum";

export interface User {
    id?: string;
    userName: string;
    role: UserRole | undefined;
    password: string;
}