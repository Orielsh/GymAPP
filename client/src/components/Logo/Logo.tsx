import {  Group, Title } from "@mantine/core";
import { IconBarbell } from "@tabler/icons-react";

export default function Logo() {
    return (
        <Group>
            <IconBarbell size={64} />
            <Title order={1} visibleFrom="sm">GYM</Title>
        </Group>
    );
}