import { baseURL } from "../config/common";
import { ITokenResponse } from "../model/interfaces/IToken";
import { IUserCredentials, IUserDetailsResponse, IUserRegister } from "../model/interfaces/IUser";

export async function register(user: IUserRegister): Promise<IUserDetailsResponse> {
    try {
        const response = await fetch(`${baseURL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok)
            throw new Error(await response.text());
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function login(credentials: IUserCredentials): Promise<ITokenResponse> {
    try {
        const response = await fetch(`${baseURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!response.ok)
            throw new Error(await response.text());
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}