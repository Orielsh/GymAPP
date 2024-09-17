export interface IPlan {
    _id: string,
    description: string,
    name: string,
    durationWEEKS: number,
    workouts: IPlanWorkout[],
}

export interface IPartialPlan {
    _id?: string,
    description?: string,
    name?: string,
    durationWEEKS?: number,
    workouts: IPlanWorkout[],
}

export interface IPlanWorkout {
    workout?: string,
    day?: number,
    name?: string,
}