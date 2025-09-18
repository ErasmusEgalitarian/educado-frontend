// Get environment values
// Moved into this file to be able to mock during testing
export const BACKEND_URL: string =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ?? "http://localhost:8888";
export const CERT_URL: string =
  (import.meta.env.VITE_CERT_URL as string | undefined) ?? "http://localhost:8080";
export const REFRESH_TOKEN_URL = BACKEND_URL + "/auth/refresh/jwt";
