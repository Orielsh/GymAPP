import { useEffect, useState } from "react";
import { ITrainer } from "../../model/interfaces/IUser";
import { IResponse } from "../../model/interfaces/common";
import { getAllTrainers } from "../../services/UserService";
import { IToken } from "../../model/interfaces/IToken";
import { List } from "@mantine/core";
import classes from "./AssignTrainerModal.module.css"
interface IAssignTrainerModalProps{
    token: IToken,
    handleSubmit(id: string): void,
}

export default function AssignTrainerModal(props: IAssignTrainerModalProps){

    const [trainerList, setTrainerList] = useState<ITrainer[]>();
    
    useEffect(()=>{
        (async()=>{
            try{
                const response: IResponse<ITrainer[]> = await getAllTrainers(props.token)
                if(response)
                    setTrainerList(response.data);
            }catch(error){
                console.log(error)
            }
        })();
    }, [])
    
    return (
        <List listStyleType="none" spacing={"lg"} classNames={classes}>
            {trainerList?.map(trainer=><List.Item key={trainer._id} onClick={()=>props.handleSubmit(trainer._id)}>
                {`${trainer.name.first} ${trainer.name.last}`}
            </List.Item>)}
        </List>
    )
}