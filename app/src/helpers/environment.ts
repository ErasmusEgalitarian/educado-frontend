// Get environment values
// Moved into this file to be able to mock during testing
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const REFRESH_TOKEN_URL = BACKEND_URL + "/auth/refresh/jwt";