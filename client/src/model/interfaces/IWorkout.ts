import { IExercise } from "./IExercise";

//in the db the exercises key is array of object of id and modification but the query will handle the result and merge the relevant exercise with the modifications so it retreive IExercise array
export interface IWorkout {
    _id: string,
    name: string,
    exercises: IExercise[],
}

export interface IPartialWorkout {
    _id?: string,
    name?: string,
    exercises?: [
        exercise: string,
        modification: Omit<IExercise, "_id name">,
    ],
}

export interface IWorkoutExerciseListResponse {
    success: boolean,
    data: IExercise[],
}