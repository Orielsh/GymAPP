import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IPlan } from "../../model/interfaces/IPlan";
import classes from "./PlanCard.module.css";
import { getWeekdayName } from "../../utils/date";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface IPlanCardProps {
    plan: IPlan;
    handleDelete(plan: IPlan): void,
    handleModify(plan: IPlan): void,
}

export default function PlanCard(props: IPlanCardProps) {
    const { plan, handleDelete, handleModify } = props;
    return (
        <Stack classNames={classes} p={"md"}>
            <Group justify="space-between">
                <Text fw={500}>{plan.name}</Text>
                <Text >Duration: <Text span fw={500}>{plan.durationWEEKS} weeks</Text></Text>
            </Group>
            <Text mb={"sm"}>{plan.description}</Text>
            {
                plan.workouts.map(
                    (workout) =>
                        <Text key={workout.workout}>
                            {getWeekdayName(workout.day!)}: &nbsp;
                            <Text span>
                                {workout.name}
                            </Text>
                        </Text>
                )
            }
            <Group justify="space-between">
                <ActionIcon variant="outline" bd={"none"} onClick={
                    () => handleModify(plan)
                }>
                    <IconEdit stroke={1} />
                </ActionIcon>
                <ActionIcon variant="outline" bd={"none"} c={"red"} onClick={
                    () => handleDelete(plan)
                }>
                    <IconTrash stroke={1} />
                </ActionIcon>
            </Group>

        </Stack>
    )
}