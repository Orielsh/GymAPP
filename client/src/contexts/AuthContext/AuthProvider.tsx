import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { IUserLoginDetails } from "../../model/interfaces/IUser";
import { IToken } from "../../model/interfaces/IToken";
import decode, { isTokenExpired } from "../../utils/JWT";
import { getTokenFromLS } from "../../services/LSService";

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [loginDetails, setLoginDetails] = useState<IUserLoginDetails | null>(null);
    const [token, setToken] = useState<IToken | null>(null);

    //At first, check if token in ls. if so, fetch user details from the server and store them in the context.
    useEffect(() => {
        setToken(getTokenFromLS());
    }, []);

    useEffect(() => {
        if (token && !isTokenExpired(token)) 
            setLoginDetails(decode<IUserLoginDetails>(token));
        else{
            setLoginDetails(null);
            if(token && isTokenExpired(token))
                setToken(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, loginDetails, setLoginDetails, }}>
            {children}
        </AuthContext.Provider>
    )
};