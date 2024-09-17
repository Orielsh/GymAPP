import { jwtDecode } from "jwt-decode";
import { IToken } from "../model/interfaces/IToken";

export default function decode<Type>(token: IToken): Type {
    return jwtDecode(token);
}

export function isTokenExpired(token: IToken): boolean{
    const decoded = decode<{exp: number}>(token);
    //convert s from midnight of `January 1, 1970, UTC (epoch)` to ms.
    //https://github.com/auth0/node-jsonwebtoken?tab=readme-ov-file#token-expiration-exp-claim
    const expDate = new Date(decoded.exp * 1000 );
    return (Date.now() > expDate.getTime());
}