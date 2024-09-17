import { ActionIcon, Button, Container, Group, Table, Text, TextInput } from "@mantine/core";
import { IWorkout } from "../../model/interfaces/IWorkout";
import { IconCheck, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { addExercise, patchWorkout, removeExercise } from "../../services/WorkoutService";
import { IToken } from "../../model/interfaces/IToken";
import { IExercise, IExerciseListResponse } from "../../model/interfaces/IExercise";
import { IResponse } from "../../model/interfaces/common";
import { getAllExercises } from "../../services/ExerciseService";

interface IWorkoutModalProps {
    workout: IWorkout,
    token: IToken
    setUpdatedWorkout(workout: IWorkout): void,
}

export default function WorkoutModal(props: IWorkoutModalProps) {

    const [editable, setEditable] = useState<boolean>(false);
    const [name, setName] = useState<string>(props.workout.name);
    const [insert, setInsert] = useState<boolean>(false);
    const [allExercises, setAllExercises] = useState<IExercise[]>();

    const handleNameChange = async () => {
        try {
            const updatedWorkout = await patchWorkout(props.token, props.workout._id, { name: name })
            if (updatedWorkout)
                props.setUpdatedWorkout({ ...updatedWorkout.data, exercises: props.workout.exercises });
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveExercise = async (exercise: IExercise) => {
        try {
            const updatedWorkout: IResponse<IWorkout> = await removeExercise(props.token, props.workout._id, exercise._id);
            if (updatedWorkout)
                props.setUpdatedWorkout(
                    { ...props.workout, exercises: props.workout.exercises.filter(exer => exer._id != exercise._id) }
                );
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const allExercises: IExerciseListResponse = await getAllExercises(props.token);
                if (allExercises)
                    setAllExercises(allExercises.data);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    const handleAddExercise = async (exercise: IExercise) => {
        try {
            const updatedWorkout: IResponse<IWorkout> = await addExercise(props.token, props.workout._id, exercise._id)
            if (updatedWorkout) {
                props.setUpdatedWorkout(
                    { ...props.workout, exercises: props.workout.exercises.concat([exercise]) }
                );
            }
        } catch (error) {
            console.log(error)
        }
    }

    const rows = props.workout.exercises.map((exercise) => (
        <Table.Tr key={exercise._id}>
            <Table.Td>{exercise.name}</Table.Td>
            <Table.Td>{exercise.sets}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.repetitions}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.weight ?? "-"}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.duration ?? "-"}</Table.Td>
            <Table.Td>
                <ActionIcon variant="outline" bd={"none"} onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveExercise(exercise);
                }} disabled={props.workout.exercises.length < 2} opacity={props.workout.exercises.length < 2 ? 0.5 : 1} bg={"none"}>
                    <IconTrash />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    const rows2 = allExercises?.map((exercise) => (
        !props.workout.exercises.some(ex => ex._id === exercise._id)

        &&

        < Table.Tr key={exercise._id} onClick={() => handleAddExercise(exercise)}>
            <Table.Td>{exercise.name}</Table.Td>
            <Table.Td>{exercise.sets}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.repetitions}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.weight ?? "-"}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.duration ?? "-"}</Table.Td>
        </Table.Tr >

    ));

    return (
        <Container fluid>
            <Group align="center" mb={"md"}>
                {editable ?
                    <TextInput value={name} onChange={(event) => setName(event.target.value)} flex={1}/>
                    :
                    <Text >
                        {name}
                    </Text>}
                {editable ?
                    <Button variant="light" onClick={() => {
                        handleNameChange();
                        setEditable(false);
                    }}>OK</Button>
                    :
                    <ActionIcon variant="outline" bd="none" onClick={() => setEditable(true)}>
                        <IconEdit stroke={1} />
                    </ActionIcon>}
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
            <Group justify="center" mt={"lg"}>
                <ActionIcon variant="outline" bd={"none"} color="green" onClick={() => setInsert(!insert)}>
                    {insert ? <IconCheck /> : <IconPlus />}
                </ActionIcon>
            </Group>
            {
                insert
                &&
                <Table stickyHeader highlightOnHover >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Number of sets</Table.Th>
                            <Table.Th visibleFrom="md">Repetitions</Table.Th>
                            <Table.Th visibleFrom="md">Weight (KG)</Table.Th>
                            <Table.Th visibleFrom="md">Duration (seconds)</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows2}
                    </Table.Tbody>
                </Table>}
        </Container>
    )
}