import { Container, Flex, Group, Stack, Text, Image, ActionIcon, Modal, Accordion, Paper, Loader } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { calculateAge, getFormattedDate, getWeekdayName } from "../../utils/date";
import { IconChevronLeft, IconChevronRight, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import ImageInputModal from "../../components/ImageInput/ImageInputModal";
import { ToastContext, ToastsContextType } from "../../contexts/ToastContext/ToastContext";
import { IUserDetails, IUserDetailsResponse } from "../../model/interfaces/IUser";
import { getUserById, patchUser, setTrainer as setTrainerService, setPlanService } from "../../services/UserService";
import classes from "./Profile.module.css";
import { IExercise } from "../../model/interfaces/IExercise";
import { IWorkoutExerciseListResponse } from "../../model/interfaces/IWorkout";
import { getExerciseList } from "../../services/WorkoutService";
import { Carousel } from '@mantine/carousel';
import { useNavigate } from "react-router-dom";
import AssignTrainerModal from "../../components/AssignTrainerModal/AssignTrainerModal";
import { IResponse } from "../../model/interfaces/common";
import AssignPlanModal from "../../components/AssignPlanModal/AssignPlanModal";

interface IProfileProps {
    userId: string,
    setRefresh?(refresh: boolean): void,
}

interface WorkoutMap {
    [key: string]: IExercise[];
}

export default function Profile(props: IProfileProps) {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<IUserDetails>();
    const { token, loginDetails } = useContext<AuthContextType>(AuthContext);
    const [updateImageModal, { open, close }] = useDisclosure(false);
    const [assignTrainerModal, { open: openTrainerModal, close: closeTrainerModal }] = useDisclosure(false);
    const [assignPlanModal, { open: openPlanModal, close: closePlanModal }] = useDisclosure(false);
    const [userImage, setUserImage] = useState<string | undefined>();
    const [error, setError] = useState<Error>();
    const toasts = useContext<ToastsContextType | undefined>(ToastContext);
    const { userId } = props;
    //workout id
    const [accordionValue, setAccordionValue] = useState<string | null>();
    const [workouts, setWorkouts] = useState<WorkoutMap>({});

    useEffect(() => {
        if (!token)
            navigate("/");

        (async () => {
            if (token && userId)
                try {
                    const response: IUserDetailsResponse = await getUserById(token!, userId!);
                    if (response) {
                        setUserDetails(response.data);
                    }
                } catch (error) {
                    setError(error as Error);
                }
        })();
    }, [])

    //load workout - lazy loading
    useEffect(() => {
        if (accordionValue && !workouts[accordionValue]) {
            (async () => {
                try {
                    const exerciseListResponse: IWorkoutExerciseListResponse = await getExerciseList(token!, accordionValue!);
                    setWorkouts(prevState => ({
                        ...prevState,
                        [accordionValue!]: exerciseListResponse.data,
                    }));
                }
                catch (error) {
                    setError(error as Error);
                }
            })();
        }
    }, [accordionValue]);

    useEffect(() => {
        if (userImage) {
            (async () => {
                try {
                    const response: IUserDetailsResponse = await patchUser(token!, { image: { url: userImage! } }, userId!);
                    const updatedUser: IUserDetails = { ...userDetails!, image: response.data.image };
                    if (response) {
                        setUserDetails(updatedUser);
                        if(props.setRefresh)
                            props.setRefresh(true);
                    }
                } catch (error) {
                    setError(error as Error);
                } finally {
                    setUserImage(undefined);
                }
            })();
        }
    }, [userImage]);

    useEffect(() => {
        if (error)
            toasts?.addToast({ headerText: "Failed", message: error.message, success: false });
    }, [error]);

    async function setTrainer(id: string | null) {
        closeTrainerModal();
        try {
            const response: IResponse<IUserDetails> = await setTrainerService(token!, id, userDetails?._id!);
            if (response) {
                setUserDetails((await getUserById(token!, userDetails!._id)).data);
            }
        } catch (error) {
            setError(error as Error);
        }
    }

    async function setPlan(id: string | null) {
        closePlanModal();
        try {
            const response: IResponse<IUserDetails> = await setPlanService(token!, id, userDetails?._id!);
            if (response) {
                setUserDetails((await getUserById(token!, userDetails!._id)).data);
            }
        } catch (error) {
            setError(error as Error);
        }
    }

    return (
        <Container w={"100%"} p={"lg"}>
            <Modal opened={updateImageModal} onClose={close} title="Image URL" centered>
                <ImageInputModal setURL={setUserImage} close={close} />
            </Modal>
            {loginDetails?.role !== "TRAINEE" &&
                <Modal opened={assignTrainerModal} onClose={closeTrainerModal} title="Select trainer" centered>
                    <AssignTrainerModal token={token!} handleSubmit={setTrainer} />
                </Modal>
            }
            {loginDetails?.role !== "TRAINEE" &&
                <Modal opened={assignPlanModal} onClose={closePlanModal} title="Select Plan" centered>
                    <AssignPlanModal token={token!} handleSubmit={setPlan} />
                </Modal>
            }
            <Flex
                justify="space-between"
                align={"center"}
                wrap={"wrap"}
                direction={{
                    base: "column",
                    sm: "row-reverse",
                }}
                gap={"2em"}
            >
                <Group pos={"relative"} mx={{
                    base: "auto",
                    sm: 0,
                }}>
                    <Image
                        radius="md"
                        w={"250px"}
                        src={userDetails?.image?.url}
                        fallbackSrc="assets/default_profile_image.png"
                    />
                    <ActionIcon variant="outline" aria-label="Edit" pos={"absolute"} bottom={10} size={50} radius={"xl"} right={10} bd={"none"} onClick={open}>
                        <IconPencil stroke={1} color="#000" className={classes.edit} width={"100%"} height={"100%"} />
                    </ActionIcon>
                </Group>
                <Stack>
                    <Stack gap={0}>
                        <Group gap={"xs"}>
                            <Text fz={"lg"} fw={600} c="gray">
                                Hello,
                            </Text>
                            <Text fz={"lg"} fw={600}>{userDetails?.name.first}</Text>
                        </Group>
                        <Text mt={-5} c={"gray"}>{getFormattedDate()}</Text>
                    </Stack>
                    <Stack>
                        <Group gap={"xs"}>
                            <Text fz={"lg"}>
                                Age:
                            </Text>
                            <Text fw={500}> {calculateAge(new Date(userDetails?.birthdate!))}</Text>
                        </Group>
                        <Group>
                            <Text>Height:</Text>
                            <Text fw={500}>{userDetails?.heightCM}CM</Text>
                        </Group>
                        <Group>
                            <Text>Weight:</Text>
                            <Text fw={500}>{userDetails?.weightKG}KG</Text>
                        </Group>
                        <Group>
                            <Text>BMI: </Text>
                            <Text fw={500}>
                                {String(Math.trunc(userDetails?.weightKG! / Math.pow(userDetails?.heightCM! / 100, 2)))}
                            </Text>
                        </Group>
                    </Stack>
                </Stack>
            </Flex>
            <Stack mt={"3em"}>
                <Group>
                    <Text>Trainer:</Text>
                    <Text fw={500}>{userDetails?.trainer ? `${userDetails.trainer.name?.first} ${userDetails.trainer.name?.last}` : "Doesn't have a trainer yet"}</Text>
                    {loginDetails?.role !== "TRAINEE" &&
                        <Group>
                            <ActionIcon variant="outline" onClick={openTrainerModal}>
                                {userDetails?.trainer ? <IconPencil></IconPencil> : <IconPlus></IconPlus>}
                            </ActionIcon>
                            {userDetails?.trainer && <ActionIcon variant="outline" onClick={() => setTrainer(null)}>
                                <IconTrash></IconTrash>
                            </ActionIcon>}
                        </Group>}
                </Group>
                {userDetails?.plan ?
                    <Paper>
                        <Group>
                            <Text>Plan: </Text>
                            <Text fw={500}>{userDetails?.plan.plan.name}</Text>
                            {loginDetails?.role !== "TRAINEE" &&
                                <Group>
                                    <ActionIcon variant="outline" onClick={openPlanModal}>
                                        <IconPencil></IconPencil>
                                    </ActionIcon>
                                    <ActionIcon variant="outline" onClick={() => setPlan(null)}>
                                        <IconTrash></IconTrash>
                                    </ActionIcon>
                                </Group>}
                            <Group ms={"auto"}>
                                <Text c={"gray"}>Duration:</Text>
                                <Text fw={500}>
                                    {userDetails?.plan.plan.durationWEEKS} weeks
                                </Text>
                            </Group>
                        </Group>
                        <Accordion variant="separated" mt="md" onChange={setAccordionValue}>
                            {userDetails?.plan.plan.workouts.map((workout, index) => (
                                <Accordion.Item key={index} value={String(workout.workout)} bd={"none"}>
                                    <Accordion.Control bg={"gray.0"}>
                                        <Text fw={500}>{getWeekdayName(workout.day!)}</Text>
                                        <Text>{workout.name}</Text>
                                    </Accordion.Control>
                                    <Accordion.Panel className={classes.c_item} bg={"gray.1"}>
                                        <Carousel
                                            nextControlIcon={<IconChevronRight className={classes.arrow} stroke={1} />}
                                            previousControlIcon={<IconChevronLeft className={classes.arrow} stroke={1} />}
                                        >
                                            {
                                                workouts[accordionValue!] ?
                                                    workouts[accordionValue!]?.map((exercise) => (
                                                        <Carousel.Slide key={exercise._id} h={180} className={classes.slide} >
                                                            <Stack p={"md"} className={classes.card}>
                                                                <Text fw={500} mb={"auto"}>{exercise.name}</Text>

                                                                <Stack gap={0}>
                                                                    <Group>
                                                                        <Text>
                                                                            Sets:
                                                                        </Text>
                                                                        <Text fw={500}>
                                                                            {exercise.sets}
                                                                        </Text>
                                                                    </Group>
                                                                    <Group>
                                                                        <Text>
                                                                            Repetitions:
                                                                        </Text>
                                                                        <Text fw={500}>
                                                                            {exercise.repetitions}
                                                                        </Text>
                                                                    </Group>
                                                                    {exercise.weight && <Group>
                                                                        <Text>
                                                                            Weight:
                                                                        </Text>
                                                                        <Text fw={500}>
                                                                            {exercise.weight}
                                                                        </Text>
                                                                    </Group>}
                                                                    {exercise.duration && <Group>
                                                                        <Text>
                                                                            Duration:
                                                                        </Text>
                                                                        <Text fw={500}>
                                                                            {exercise.duration}
                                                                        </Text>
                                                                    </Group>}
                                                                </Stack>

                                                            </Stack>
                                                        </Carousel.Slide>
                                                    ))
                                                    : accordionValue && <Loader type="dots" m={"auto"} />
                                            }
                                        </Carousel>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Paper>
                    : <Group>
                        <Text>Plan</Text>
                        <Text fw={500}>Doesn't have a plan yet</Text>
                        {loginDetails?.role !== "TRAINEE" && <ActionIcon variant="outline" onClick={openPlanModal}>
                            <IconPlus />
                        </ActionIcon>}
                    </Group>}
            </Stack>
        </Container >
    )
}