import { baseURL } from "../config/common";
import { IResponse } from "../model/interfaces/common";
import { IPartialPlan, IPlan } from "../model/interfaces/IPlan";
import { IToken } from "../model/interfaces/IToken";

export async function getAllPlans(token: IToken): Promise<IResponse<IPlan[]>> {
    try {
        const response = await fetch(`${baseURL}/plans/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const plansList: IResponse<IPlan[]> = data;
        return plansList;
    } catch (error) {
        throw error;
    }
}

export async function createPlan(token: IToken, plan: IPartialPlan): Promise<IResponse<IPlan>> {
    try {
        const response = await fetch(`${baseURL}/plans/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(plan),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const createPlanResponse: IResponse<IPlan> = data;
        return createPlanResponse;
    } catch (error) {
        throw error;
    }
}

export async function patchPlan(token: IToken, plan: IPartialPlan): Promise<IResponse<IPlan>> {
    try {
        const response = await fetch(`${baseURL}/plans/${plan._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(plan),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const updatePlanResponse: IResponse<IPlan> = data;
        return updatePlanResponse;
    } catch (error) {
        throw error;
    }
}

export async function deletePlan(token: IToken, id: string): Promise<IResponse<IPlan>> {
    try {
        const response = await fetch(`${baseURL}/plans/${id}`, {
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