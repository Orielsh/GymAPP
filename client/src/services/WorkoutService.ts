import { baseURL } from "../config/common";
import { IResponse } from "../model/interfaces/common";
import { IToken } from "../model/interfaces/IToken";
import { IPartialWorkout, IWorkout, IWorkoutExerciseListResponse } from "../model/interfaces/IWorkout";

export async function getAllWorkouts(token: IToken): Promise<IResponse<IWorkout[]>> {
    try {
        const response = await fetch(`${baseURL}/workouts/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        const workoutsList: IResponse<IWorkout[]> = data;
        return workoutsList;
    } catch (error) {
        throw error;
    }
}

// get list of exercises for a given workout id. modifications handled in the server means that received object already merge modifications.
export async function getExerciseList(token: IToken, workoutId: string): Promise<IWorkoutExerciseListResponse> {
    try {
        const response = await fetch(`${baseURL}/workouts/exercises/${workoutId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        const exercisesList: IWorkoutExerciseListResponse = data;
        return exercisesList;
    } catch (error) {
        throw error;
    }
}

export async function patchWorkout(token: IToken, workoutId: string, changes: IPartialWorkout): Promise<IResponse<IWorkout>> {
    try {
        const response = await fetch(`${baseURL}/workouts/${workoutId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(changes),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data);
        const updatedWorkout: IResponse<IWorkout> = data;
        return updatedWorkout;
    } catch (error) {
        throw error;
    }
}

export async function removeExercise(token: IToken, workoutId: string, exerciseId: string): Promise<IResponse<IWorkout>> {
    try {
        const response = await fetch(`${baseURL}/workouts/${workoutId}/exercises/${exerciseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const updatedWorkout: IResponse<IWorkout> = data;
        return updatedWorkout;
    } catch (error) {
        throw error;
    }
}

export async function addExercise(token: IToken, workoutId: string, exerciseId: string): Promise<IResponse<IWorkout>> {
    try {
        const response = await fetch(`${baseURL}/workouts/${workoutId}/exercises/add/${exerciseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const updatedWorkout: IResponse<IWorkout> = data;
        return updatedWorkout;
    } catch (error) {
        throw error;
    }
}

export async function deleteWorkout(token: IToken, id: string): Promise<IResponse<IWorkout>> {
    try {
        const response = await fetch(`${baseURL}/workouts/${id}`, {
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


export async function createWorkout(token: IToken, workout: IWorkout | IPartialWorkout): Promise<IResponse<IWorkout>> {
    try {
        const response = await fetch(`${baseURL}/workouts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(workout),
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
