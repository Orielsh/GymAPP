import { createContext } from "react";
import { IUserLoginDetails } from "../../model/interfaces/IUser";
import { IToken } from "../../model/interfaces/IToken";

export interface AuthContextType {
    loginDetails: IUserLoginDetails | null,
    token: IToken | null,
    setToken(token: IToken | null): void,
    setLoginDetails(loginDetails: IUserLoginDetails |null): void,
}

export const AuthContext = createContext<AuthContextType>({
    loginDetails: null,
    setLoginDetails: () => { },
    token: null,
    setToken: () => { },
});