import { IPlan } from "./IPlan";

export type Role = "ADMIN" | "TRAINER" | "TRAINEE";

export interface IUserDetails {
    _id: string,
    name: {
        first: string,
        last: string,
    },
    phone: string,
    email: string,
    password: string,
    image: {
        url: string,
        alt?: string,
    },
    gender: "Male" | "Female",
    weightKG: number | null,
    heightCM: number | null,
    role: Role,
    birthdate: Date | null,
    trainer: ITrainerDetails,
    trainees: string[],
    plan: {
        plan: IPlan,
        startDate: Date,
    }
}

export interface IUsersListResponse{
    success: boolean,
    data: IUserDetails[],
}

export interface IUserDetailsResponse {
    success: boolean,
    data: IUserDetails,
}

export interface ITrainerDetails {
    _id: string,
    name: {
        first: string,
        last: string,
    },
    phone: string,
    email: string,
    image: {
        url: string,
        alt?: string,
    },
}

export interface ITrainerDetailsResponse {
    success: boolean,
    data: ITrainerDetails,
}

export interface IUserRegister {
    name: {
        first: string,
        last: string,
    },
    phone: string,
    email: string,
    password: string,
    image: {
        url: string,
        alt: string,
    },
    gender: "Male" | "Female",
    weightKG: number | null,
    heightCM: number | null,
    birthdate: Date | null,
}

export interface IUserEdit{
    name: {
        first: string,
        last: string,
    },
    phone: string,
    email: string,
    password?: string,
    image?: {
        url: string,
        alt?: string,
    },
    gender: "Male" | "Female",
    weightKG: number | null,
    heightCM: number | null,
    birthdate: Date | null | string,
}

export interface IUserCredentials {
    email: string,
    password: string,
}

export interface IUserLoginDetails {
    id: string,
    role: Role,
}

export interface IUserPatch {
    name?: {
        first: string,
        last: string,
    },
    phone?: string,
    email?: string,
    password?: string,
    image?: {
        url: string,
        alt?: string,
    },
    gender?: "Male" | "Female",
    weightKG?: number | null,
    heightCM?: number | null,
    role?: Role,
    birthdate?: Date | null,
    traineesIds?: string[],
}

export interface ITrainer{
    _id: string,
    name: {
        first: string,
        last: string,
    },
    phone: string,
    email: string,
    image: {
        url: string,
        alt?: string,
    },
}
