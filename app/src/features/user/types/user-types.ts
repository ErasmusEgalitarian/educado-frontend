export interface UserInfo {
    name: string;
    email: string;
    id: string;
    role: string;
}
export interface User {
    _id: string;
    role: "user" | "admin" | "creator";
    firstName: string;
    lastName: string;
    email: string;
    joinedAt: string;
    dateUpdated: string;
}
