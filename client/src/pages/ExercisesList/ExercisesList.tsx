import { useContext, useEffect, useState } from "react";
import { IExercise, IExerciseListResponse, IExerciseResponse } from "../../model/interfaces/IExercise";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { createExercise, deleteExerciseById, getAllExercises, updateExercise } from "../../services/ExerciseService";
import { ToastContext, ToastsContextType } from "../../contexts/ToastContext/ToastContext";
import { ActionIcon, CloseButton, Container, Group, Input, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import { IResponse } from "../../model/interfaces/common";

export default function ExercisesList() {

    const [exercisesList, setExercisesList] = useState<IExercise[]>();
    const { token } = useContext<AuthContextType>(AuthContext);
    const [error, setError] = useState<Error>();
    const toasts = useContext<ToastsContextType | undefined>(ToastContext);
    const [exercise, setExercise] = useState<IExercise>();
    const [opened, { open, close }] = useDisclosure(false, {
        onClose: () => setExercise(undefined)
    });
    const [isModify, setIsModify] = useState<boolean>(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        (async () => {
            if (token)
                try {
                    const response: IExerciseListResponse = await getAllExercises(token!);
                    if (response) {
                        setExercisesList(response.data);
                    }
                } catch (error) {
                    setError(error as Error);
                }
        })();
    }, [])


    /*todo: usually I use useEffect with state since this method access to an external resource but read that useEffect will used
        when external information relevant the the component life cycle. I'll check this later.
    */
    async function handleSubmit(exercise: IExercise) {
        close();
        const handler = exercise._id ? updateExercise : createExercise;
        try {
            const response: IExerciseResponse = await handler(token!, exercise);
            if (response) {
                setExercisesList((await getAllExercises(token!)).data);
            }
        } catch (error) {
            setError(error as Error);
        }
    }

    async function deleteExercise(exercise: IExercise) {
        try {
            const response: IResponse<IExercise> = await deleteExerciseById(token!, exercise._id);
            if (response) {
                setExercisesList((await getAllExercises(token!)).data);
                toasts?.addToast({ success: true, headerText: "Successful", message: `${response.data.name} deleted successfully` })
            }
        } catch (error) {
            setError(error as Error);
        }
    }

    const rows = exercisesList?.map((exercise) => (
        exercise.name.toLowerCase().includes(filter.toLowerCase()) &&
        <Table.Tr key={exercise._id} onClick={() => (open(), setExercise(exercise), setIsModify(false))}>
            <Table.Td>{exercise.name}</Table.Td>
            <Table.Td>{exercise.sets}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.repetitions}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.weight ?? "-"}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.duration ?? "-"}</Table.Td>
            <Table.Td>
                <ActionIcon variant="outline" bd={"none"} onClick={(e) => { e.stopPropagation(), deleteExercise(exercise) }}>
                    <IconTrash />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container fluid p={"lg"}>
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                <ExerciseModal exercise={exercise!} setExercise={setExercise} isModify={isModify} setIsModify={setIsModify} close={close} handleSubmit={handleSubmit} />
            </Modal>
            <Group>
                <Input
                    flex={1}
                    variant="filled"
                    placeholder="Search"
                    value={filter}
                    onChange={(event) => setFilter(event.currentTarget.value)}
                    rightSectionPointerEvents="all"
                    leftSection={
                        <IconSearch stroke={1} />
                    }
                    rightSection={
                        <CloseButton
                            aria-label="Clear input"
                            onClick={() => setFilter('')}
                            style={{ display: filter ? undefined : 'none' }}
                        />
                    }
                />
                <ActionIcon variant="outline" onClick={() => (setIsModify(true), open())}>
                    <IconPlus stroke={2} />
                </ActionIcon>
            </Group>
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