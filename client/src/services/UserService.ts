import { baseURL } from "../config/common";
import { IResponse } from "../model/interfaces/common";
import { IToken } from "../model/interfaces/IToken";
import { ITrainer, ITrainerDetailsResponse, IUserDetails, IUserDetailsResponse, IUserPatch, IUsersListResponse, Role } from "../model/interfaces/IUser";

export async function getUserById(token: IToken, userId: string): Promise<IUserDetailsResponse> {
    try {
        const response = await fetch(`${baseURL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        const userDetails: IUserDetailsResponse = data;
        return userDetails;
    } catch (error) {
        throw error;
    }
}

export async function patchUser(token: IToken, partialUser: IUserPatch, userId: string): Promise<IUserDetailsResponse> {
    try {
        const response = await fetch(`${baseURL}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(partialUser),
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function changeRole(token: IToken, role: Role, userId: string): Promise<IUserDetailsResponse> {
    try {
        const response = await fetch(`${baseURL}/users/${userId}/role`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({role: role}),
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function setTrainer(token: IToken, trainerId: string | null, userId: string): Promise<IUserDetailsResponse> {
    try {
        const response = await fetch(`${baseURL}/users/${userId}/trainer`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({trainer: trainerId}),
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function setPlanService(token: IToken, planId: string | null, userId: string): Promise<IUserDetailsResponse> {
    try {
        const response = await fetch(`${baseURL}/users/${userId}/plan`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({plan: planId === null ? null : {plan: planId}}),
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getTrainerById(token: IToken, trainerId: string): Promise<ITrainerDetailsResponse> {
    try {
        const response = await fetch(`${baseURL}/users/trainer/${trainerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getAllUsers(token: IToken): Promise<IUsersListResponse> {
    try {
        const response = await fetch(`${baseURL}/users/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getAllTrainers(token: IToken): Promise<IResponse<ITrainer[]>> {
    try {
        const response = await fetch(`${baseURL}/users/trainers-list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(token: IToken, id: string): Promise<IResponse<IUserDetails>> {
    try {
        const response = await fetch(`${baseURL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        if (!response.ok)
            throw new Error(await response.text());
        const responseJSON = await response.json();
        const data = responseJSON;
        return data;
    } catch (error) {
        throw error;
    }
}