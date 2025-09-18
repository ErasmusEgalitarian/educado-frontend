export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    token: string | null;
}