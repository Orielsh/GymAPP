import { Card, Container, Flex, Text, Image, Stack, Button, Input, CloseButton, ActionIcon, Group, Select, Divider } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { IUserDetails, IUsersListResponse, Role } from "../../model/interfaces/IUser";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { changeRole, deleteUser, getAllUsers } from "../../services/UserService";
import classes from "./UsersList.module.css";
import Profile from "../Profile/Profile";
import { IconChevronLeft, IconSearch, IconTrash } from "@tabler/icons-react";
import { IResponse } from "../../model/interfaces/common";
import { Link } from "react-router-dom";

interface IUserListProps {
    refresh: boolean,
    setRefresh(refresh: boolean): void,
}

export default function UsersList(props: IUserListProps) {
    const { token, loginDetails } = useContext<AuthContextType>(AuthContext);
    const role = loginDetails?.role;
    const [usersList, setUsersList] = useState<IUserDetails[]>();
    const [user, setUser] = useState<IUserDetails>();
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (token)
            (async () => {
                try {
                    const usersListResponse: IUsersListResponse = await getAllUsers(token);
                    setUsersList(usersListResponse.data);
                } catch (error) {
                    console.log(error)
                }
            })();
    }, []);

    useEffect(() => {
        if (token && props.refresh) {
            (async () => {
                try {
                    const usersListResponse: IUsersListResponse = await getAllUsers(token);
                    setUsersList(usersListResponse.data);
                } catch (error) {
                    console.log(error)
                }
            })();
            props.setRefresh(false);
        }
    }, [props.refresh]);

    function handleDelete(_id: string): void {
        (async () => {
            try {
                const deletedUser: IResponse<IUserDetails> = await deleteUser(token!, _id);
                if (deletedUser) {
                    const usersListResponse: IUsersListResponse = await getAllUsers(token!);
                    setUsersList(usersListResponse.data);
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }

    function handleChangeRole(value: string, userId: string) {
        (async () => {
            try {
                const updated: IResponse<IUserDetails> = await changeRole(token!, value as Role, userId);
                if (updated) {
                    const usersListResponse: IUsersListResponse = await getAllUsers(token!);
                    setUsersList(usersListResponse.data);
                }
            } catch (error) {
                console.log(error)
            }
        })();
    }

    return (<Container p={"lg"} pos={"relative"}>

        {user && <Group>
            <Button variant="outline" onClick={() => setUser(undefined)}
                leftSection={
                    <IconChevronLeft />
                }>
                back to users list
            </Button>
            <Link to={`/edit/${user._id}`} className={classes.link}>Edit user</Link>
        </Group>}
        {user ?
            <Profile userId={user._id} setRefresh={props.setRefresh} />
            :
            <Stack>

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

                <Flex wrap={"wrap"} gap={"xl"} justify={"center"}>
                    {usersList?.map((user) => (
                        (user.name.first.toLocaleLowerCase().includes(filter) || user.name.last.toLocaleLowerCase().includes(filter)) &&
                        <Card key={user._id} padding="lg" radius="md" withBorder className={classes.card} onClick={() => setUser(user)}>
                            <Card.Section p={"lg"}>
                                <Image
                                    src={user.image?.url}
                                    fallbackSrc="assets/default_profile_image.png"
                                    alt={user.image?.alt ?? "User image"}
                                    h={160}
                                    fit="contain"
                                    m={"auto"}
                                />
                            </Card.Section>
                            <Stack justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>
                                    {`${user.name.first} ${user.name.last}`}
                                </Text>
                                <Text fw={500}>
                                    {user.phone}
                                </Text>
                                <Text fw={500}>
                                    {user.email}
                                </Text>
                                <Text fw={500}>
                                    {`${user.role[0].toUpperCase()}${user.role.substring(1).toLowerCase()}`}
                                </Text>
                            </Stack>
                            {(role === "ADMIN" && user.role !== "ADMIN") &&
                                <Stack>
                                    <Group justify="space-between" onClick={(event) => {
                                        event.stopPropagation();
                                    }}>
                                        <Select label="Role" data={[{ value: "TRAINER", label: "Trainer" }, { value: "TRAINEE", label: "Trainee" }]} maxDropdownHeight={100} classNames={classes} defaultValue={user.role}
                                            onChange={(_event, option) => {
                                                handleChangeRole(option.value, user._id);
                                            }}
                                        />
                                    </Group>
                                    <Divider></Divider>
                                    <Group justify="center">
                                        <ActionIcon c={"red"} bg={"none"} onClick={(event) => {
                                            event.stopPropagation();
                                            handleDelete(user._id);
                                        }}>
                                            <IconTrash />
                                        </ActionIcon>
                                    </Group>
                                </Stack>}
                        </Card>
                    ))}
                </Flex>
            </Stack>
        }
    </Container>);
}