import { Accordion, ActionIcon, CloseButton, Container, Divider, Group, Input, Modal, Text } from "@mantine/core";
import { IconExternalLink, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { IPartialWorkout, IWorkout, IWorkoutExerciseListResponse } from "../../model/interfaces/IWorkout";
import { IResponse } from "../../model/interfaces/common";
import { createWorkout, deleteWorkout, getAllWorkouts, getExerciseList } from "../../services/WorkoutService";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import ExercisesTable from "../../components/ExercisesTable/ExercisesTable";
import { IExercise } from "../../model/interfaces/IExercise";
import { useDisclosure } from "@mantine/hooks";
import WorkoutModal from "../../components/WorkoutModal/WorkoutModal";

export interface IWorkouExercisetMap {
    [key: string]: IExercise[];
}

interface IWorkoutIDMap {
    [key: string]: IWorkout,
}

export default function WorkoutsList() {

    const { token } = useContext<AuthContextType>(AuthContext);
    const [filter, setFilter] = useState("");
    const [workoutsList, setWorkoutsList] = useState<IWorkout[]>();
    const [loadedWorkouts, setLoadedWorkouts] = useState<IWorkouExercisetMap>({});
    const [workoutIDMap, setWorkoutIdMap] = useState<IWorkoutIDMap>({});
    const [accordionValue, setAccordionValue] = useState<string | null>();
    const [workoutModal, { open, close }] = useDisclosure(false);
    const [currentWorkout, setCurrentWorkout] = useState<IWorkout>();
    const [modifiedWorkout, setModifiedWorkout] = useState<IWorkout>();

    useEffect(() => {
        (async () => {
            if (token)
                try {
                    const response: IResponse<IWorkout[]> = await getAllWorkouts(token!)
                    if (response) {
                        setWorkoutsList(response.data);
                        const workoutMapById: IWorkoutIDMap = {};
                        response.data.forEach(workout => workoutMapById[workout._id] = workout);
                        setWorkoutIdMap(workoutMapById);
                    }
                } catch (error) {
                    console.log(error)
                }
        })();
    }, [])

    useEffect(() => {
        if (modifiedWorkout) {
            setCurrentWorkout(modifiedWorkout);
            setWorkoutsList(prev => {
                const oldList: IWorkout[] | undefined = prev?.map(workout => workout._id === modifiedWorkout?._id ? modifiedWorkout : workout);
                return oldList
            }
            );
            setLoadedWorkouts(prevState => ({
                ...prevState,
                [accordionValue!]: modifiedWorkout?.exercises!,
            }));
            setAccordionValue(modifiedWorkout?._id)
        }
    }, [modifiedWorkout]);

    const handleDeleteWorkout = async (workoutId: string) => {
        try {
            const deletedWorkout: IResponse<IWorkout> = await deleteWorkout(token!, workoutId);
            if (deletedWorkout) {
                setWorkoutsList(prev => (
                    prev?.filter(workout => workout._id !== workoutId)));
            }
        } catch (error) {
            console.log(error)
        }
    }

    //load workout - for lazy loading
    useEffect(() => {
        if (accordionValue && !loadedWorkouts[accordionValue]) {
            (async () => {
                try {
                    const exerciseListResponse: IWorkoutExerciseListResponse = await getExerciseList(token!, accordionValue!);
                    setLoadedWorkouts(prevState => ({
                        ...prevState,
                        [accordionValue!]: exerciseListResponse.data,
                    }));
                }
                catch (error) {
                    console.log(error);
                    // setError(error as Error);
                }
            })();
        }
    }, [accordionValue]);

    const items = workoutsList?.map((workout) => (
        workout.name.toLowerCase().includes(filter.toLowerCase()) &&
        <Accordion.Item key={workout._id} value={workout._id}>
            <Accordion.Control>
                <Group justify="space-between">
                    <Text>{workout.name}</Text>
                    {accordionValue === workout._id
                        &&
                        <Group mx="lg" onClick={(event) => {
                            event.stopPropagation();
                            setCurrentWorkout({ ...workoutIDMap[accordionValue!], exercises: loadedWorkouts[accordionValue!] })
                            open();
                        }}>
                            <IconExternalLink stroke={1} />
                        </Group>}
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                {
                    loadedWorkouts[accordionValue!]
                    &&
                    <ExercisesTable exercisesList={loadedWorkouts[accordionValue!]} />
                }
                <Divider my={"md"} />
                <Group justify="end">
                    <ActionIcon variant="outline" bd={"none"} color="red" onClick={() => handleDeleteWorkout(workout._id)}>
                        <IconTrash stroke={1} />
                    </ActionIcon>
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    ));

    const handleCreate = async()=>{
        const newWorkout: IPartialWorkout = {name: "new workout - modify to complete addition"}
        try{
            const addedWorkoutResponse: IResponse<IWorkout> = await createWorkout(token!, newWorkout);
            if(addedWorkoutResponse){
                const addedWorkout: IWorkout = addedWorkoutResponse.data;
                setWorkoutsList(prev=>prev?.concat([addedWorkout]));
                setWorkoutIdMap((prev)=>({...prev, [addedWorkout._id]: addedWorkout }))
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <Container fluid py={"lg"}>
            <Modal opened={workoutModal} onClose={close} centered size="auto">
                <WorkoutModal workout={currentWorkout!} token={token!} setUpdatedWorkout={setModifiedWorkout} />
            </Modal>
            <Group mb={"lg"}>
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
                <ActionIcon variant="outline" onClick={handleCreate}>
                    <IconPlus/>
                </ActionIcon>
            </Group>

            <Accordion variant="separated" onChange={setAccordionValue}>
                {items}
            </Accordion>
        </Container>)
}