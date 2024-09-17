import { Container, Modal, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { IToken } from "../../model/interfaces/IToken";
import { getAllExercises } from "../../services/ExerciseService";
import { IExercise, IExerciseListResponse } from "../../model/interfaces/IExercise";
import { useDisclosure } from "@mantine/hooks";
import ModifyExerciseModal from "../ModifyExerciseModal/ModifyExerciseModal";

interface IExerciseTableModalProps {
    token: IToken;
    handleSelect(exercise: IExercise): void;
}

export default function ExerciseTableModal(props: IExerciseTableModalProps) {

    const [exercisesList, setExercisesList] = useState<IExercise[]>();
    const [modifyExerciseModal, { open, close }] = useDisclosure(false);
    const [selectedExercise, setSelectedExercise] = useState<IExercise>();
    useEffect(() => {
        (async () => {
            if (props.token)
                try {
                    const response: IExerciseListResponse = await getAllExercises(props.token);
                    if (response) {
                        setExercisesList(response.data);
                    }
                } catch (error) {
                    console.log(error);
                }
        })();
    }, [])

    const rows = exercisesList?.map((exercise: IExercise) => (
        <Table.Tr key={exercise._id} onClick={()=>(setSelectedExercise(exercise), open())}>
            <Table.Td>{exercise.name}</Table.Td>
            <Table.Td>{exercise.sets}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.repetitions}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.weight ?? "-"}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.duration ?? "-"}</Table.Td>
        </Table.Tr>
    ));

    return (

        <Container>
            <Modal opened={modifyExerciseModal} onClose={close} title="Modify" centered overlayProps={{
          backgroundOpacity: 0.1,
        }}>
                <ModifyExerciseModal exercise={selectedExercise!} handleSubmit={props.handleSelect} close={close}/>
            </Modal>
            <Table stickyHeader highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Number of sets</Table.Th>
                        <Table.Th visibleFrom="md">Repetitions</Table.Th>
                        <Table.Th visibleFrom="md">Weight (KG)</Table.Th>
                        <Table.Th visibleFrom="md">Duration (seconds)</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Container>
    )

}