import { IToken } from "../model/interfaces/IToken";

export function storeTokenLS(token: IToken): void {
    localStorage.setItem("token", token);
}

//return null if token not presence
export function getTokenFromLS(): IToken | null {
    const token: string | null = localStorage.getItem("token");
    if (token)
        return token;
    return null;
}

export function removeTokenFromLS(): void {
    localStorage.removeItem("token");
}