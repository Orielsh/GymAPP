import { Table } from "@mantine/core";
import { IExercise } from "../../model/interfaces/IExercise";

interface IExerciseTableProps {
    exercisesList: IExercise[],
}

export default function ExercisesTable(props: IExerciseTableProps) {

    const rows = props.exercisesList.map((exercise: IExercise) => (
        <Table.Tr key={exercise._id}>
            <Table.Td>{exercise.name}</Table.Td>
            <Table.Td>{exercise.sets}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.repetitions}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.weight ?? "-"}</Table.Td>
            <Table.Td visibleFrom="md">{exercise.duration ?? "-"}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table stickyHeader p={0}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Sets</Table.Th>
                    <Table.Th visibleFrom="md">Repetitions</Table.Th>
                    <Table.Th visibleFrom="md">Weight (KG)</Table.Th>
                    <Table.Th visibleFrom="md">Duration (seconds)</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows}
            </Table.Tbody>
        </Table>
    )
}