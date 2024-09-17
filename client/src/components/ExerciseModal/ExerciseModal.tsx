import { ActionIcon, Group, Stack, TextInput, Title, Text, Button, Divider } from "@mantine/core";
import { IExercise } from "../../model/interfaces/IExercise";
import { IconPencilMinus } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "@mantine/form";

interface IExerciseModalProps {
    exercise: IExercise,
    setExercise(exercise: IExercise | undefined): void,
    isModify: boolean,
    setIsModify(isModify: boolean): void,
    handleSubmit(exercise: IExercise): void,
    close(): void,
}

export default function ExerciseModal(props: IExerciseModalProps) {

    const { exercise, setExercise, isModify, close, setIsModify, handleSubmit } = props;

    useEffect(() => {
        if (isModify)
            setExercise(undefined);
    }, []);

    const form = useForm<IExercise>({
        mode: 'uncontrolled',
        initialValues: exercise,
    });

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group justify="space-between">
                {!isModify && <Title order={5} fw={500}>{exercise?.name}</Title>}
                {exercise && <ActionIcon variant="outline" ml={"auto"}>
                    <IconPencilMinus stroke={1} onClick={() => setIsModify(!isModify)}></IconPencilMinus>
                </ActionIcon>}
            </Group>
            {isModify ?
                <Stack>
                    <TextInput label="Name" variant="filled" key={form.key('name')} {...form.getInputProps('name')} required/>
                    <TextInput label="Sets" variant="filled" key={form.key('sets')} {...form.getInputProps('sets')} required/>
                    <TextInput label="Repetitions" variant="filled" key={form.key('repetitions')} {...form.getInputProps('repetitions')} required/>
                    <TextInput label="Weight KG" variant="filled" key={form.key('weight')} {...form.getInputProps('weight')} placeholder="optional"/>
                    <TextInput label="Duration (seconds)" variant="filled" key={form.key('duration')} {...form.getInputProps('duration')} placeholder="optional"/>
                </Stack>
                :
                exercise && <Stack mt={"lg"}>
                    <Text>{exercise.sets} Sets</Text>
                    {exercise.repetitions && <Text>{exercise.repetitions} Repetitions </Text>}
                    {exercise.weight && <Text>{exercise.weight} Weight in KG</Text>}
                    {exercise.duration && <Text>{exercise.duration} seconds </Text>}
                </Stack>}
            <Divider my={"lg"} />
            <Group justify="space-around" mt={"lg"}>
                <Button variant="filled" type="submit">Save</Button>
                <Button variant="outline" onClick={close}>Close</Button>
            </Group>
        </form>
    )
}