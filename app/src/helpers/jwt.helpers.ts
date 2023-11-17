import decode from 'jwt-decode';

type Token = {
    user: string,
    iat: number,
    exp: number
}

export const isExpired = (token: string | null | undefined): boolean => {
    try {
        const { exp } = decode<Token>(token!);
        const expirationDatetimeInSeconds = exp * 1000;
        return Date.now() >= expirationDatetimeInSeconds;
    } catch {
        return true;
    }
};

const jwtHelpers = Object.freeze({ isExpired })

export default jwtHelpers;