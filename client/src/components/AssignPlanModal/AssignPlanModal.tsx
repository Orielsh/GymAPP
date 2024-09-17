import { List } from "@mantine/core";
import { IToken } from "../../model/interfaces/IToken";
import { useEffect, useState } from "react";
import { IPlan } from "../../model/interfaces/IPlan";
import { getAllPlans } from "../../services/PlanService";
import { IResponse } from "../../model/interfaces/common";
import classes from "./AssignPlanModal.module.css";
interface IAssignPlanModalProps {
    token: IToken,
    handleSubmit(id: string): void,
}

export default function AssignPlanModal(props: IAssignPlanModalProps) {

    const [plansList, setPlansList] = useState<IPlan[]>();

    useEffect(() => {
        (async () => {
            try {
                const response: IResponse<IPlan[]> = await getAllPlans(props.token)
                if (response)
                    setPlansList(response.data);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    return (
        <List listStyleType="none" spacing={"lg"} classNames={classes}>
            {plansList?.map(plan => <List.Item key={plan._id} onClick={() => props.handleSubmit(plan._id)}>
                {plan.name}
            </List.Item>)}
        </List>
    )
}