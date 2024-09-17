import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';

interface URL {
    url: string,
}

interface IImageInputModalProps {
    setURL(url: string): void,
    close(): void,
}

export default function ImageInputModal(props: IImageInputModalProps) {

    const form = useForm<URL>({
        mode: 'uncontrolled',
        initialValues: {
            url: "",
        },

        validate: {
            url: (value) => /(https?:\/\/.*\.(?:png|jpg))/i.test(value) ? null : 'Invalid image URL'
        },
    });

    return (
        <form onSubmit={form.onSubmit(() => (props.setURL(form.getValues().url), props.close()))}>
            <Flex direction={"column"} gap={10}>
                <TextInput
                    label="Image URL"
                    description="Insert your profile image URL"
                    placeholder="HTTP://..."
                    key={form.key('url')}
                    {...form.getInputProps('url')}
                />
                <Button fullWidth type="submit">
                    Update
            </Button>
        </Flex>
        </form >
    )
}