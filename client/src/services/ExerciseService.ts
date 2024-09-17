import { baseURL } from "../config/common";
import { IResponse } from "../model/interfaces/common";
import { IExercise, IExerciseListResponse, IExerciseResponse } from "../model/interfaces/IExercise";
import { IToken } from "../model/interfaces/IToken";

export async function getAllExercises(token: IToken): Promise<IExerciseListResponse> {
    try {
        const response = await fetch(`${baseURL}/exercises/`, {
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


export async function createExercise(token: IToken, exercise: IExercise): Promise<IExerciseResponse> {
    try {
        const response = await fetch(`${baseURL}/exercises/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(exercise),
        });
        const responseJSON = await response.json();
        if (!response.ok){
            throw new Error(responseJSON.message);
        }
        const data = responseJSON;
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function updateExercise(token: IToken, exercise: IExercise): Promise<IExerciseResponse> {
    try {
        const response = await fetch(`${baseURL}/exercises/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(exercise),
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

export async function deleteExerciseById(token: IToken, id: string): Promise<IResponse<IExercise>> {
    try {
        const response = await fetch(`${baseURL}/exercises/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({_id: id}),
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