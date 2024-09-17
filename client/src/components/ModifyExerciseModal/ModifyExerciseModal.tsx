import { Button, Divider, Group, Stack, TextInput } from "@mantine/core";
import { IExercise } from "../../model/interfaces/IExercise";
import { useForm } from "@mantine/form";

interface IModifyExerciseModal {
    exercise: IExercise;
    handleSubmit(exercise: IExercise): void,
    close():void,
}

export default function ModifyExerciseModal(props: IModifyExerciseModal) {

    const form = useForm<IExercise>({
        mode: 'uncontrolled',
        initialValues: props.exercise,
    });

    return <form onSubmit={form.onSubmit(props.handleSubmit)}>
        <Stack>
            <TextInput label="Name" variant="filled" key={form.key('name')} {...form.getInputProps('name')} required />
            <TextInput label="Sets" variant="filled" key={form.key('sets')} {...form.getInputProps('sets')} required />
            <TextInput label="Repetitions" variant="filled" key={form.key('repetitions')} {...form.getInputProps('repetitions')} required />
            <TextInput label="Weight KG" variant="filled" key={form.key('weight')} {...form.getInputProps('weight')} placeholder="optional" />
            <TextInput label="Duration (seconds)" variant="filled" key={form.key('duration')} {...form.getInputProps('duration')} placeholder="optional" />
        </Stack>

        <Divider my={"lg"} />
        <Group justify="space-around" mt={"lg"}>
            <Button variant="filled" type="submit">Save</Button>
            <Button variant="outline" onClick={props.close}>Close</Button>
        </Group>
    </form>
}