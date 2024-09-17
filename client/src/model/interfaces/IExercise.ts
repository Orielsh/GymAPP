export interface IExercise{
    _id: string,
    name: string,
    sets: number,
    repetitions: number,
    weight: number,
    duration: number,
}


// make this method generic since this is a repetitions
export interface IExerciseResponse{
    success: boolean,
    data: IExercise,
}

export interface IExerciseListResponse{
    success: boolean,
    data: IExercise[],
}