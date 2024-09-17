import { ActionIcon, Button, CloseButton, Container, Divider, Group, Input, List, NumberInput, Select, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IPartialPlan, IPlan, IPlanWorkout } from "../../model/interfaces/IPlan";
import { IResponse } from "../../model/interfaces/common";
import { createPlan, deletePlan, getAllPlans, patchPlan } from "../../services/PlanService";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import PlanCard from "../../components/PlanCard/PlanCard";
import classes from "./PlansList.module.css";
import { getWeekdayName, weekdays } from "../../utils/date";
import { IWorkout } from "../../model/interfaces/IWorkout";
import { getAllWorkouts } from "../../services/WorkoutService";

interface ISelectOption {
    value: string,
    label: string,
}

const weekDayOptions = weekdays.map((day, index) => ({ label: day, value: index + "" }));

export default function PlansList() {

    const { token } = useContext<AuthContextType>(AuthContext);
    const [filter, setFilter] = useState("");
    const [isAddition, setIsAddition] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [plansList, setPlansList] = useState<IPlan[]>([]);
    const [modifyPlan, setModifyPlan] = useState<IPartialPlan>({ workouts: [] });
    const [newWorkout, setNewWorkout] = useState<IPlanWorkout>({});
    const [selectValues, setSelectValues] = useState<ISelectOption[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    useEffect(() => {
        (async () => {
            if (token)
                try {
                    const plansListResponse: IResponse<IPlan[]> = await getAllPlans(token!);
                    if (plansListResponse)
                        setPlansList(plansListResponse.data);
                    const workoutListResponse: IResponse<IWorkout[]> = await getAllWorkouts(token!);
                    if (workoutListResponse) {

                        const selectArray: ISelectOption[] = [];
                        workoutListResponse.data.forEach(w => (
                            selectArray.push({
                                label: w.name,
                                value: w._id,
                            })
                        ))
                        setSelectValues(selectArray);
                    }
                }
                catch (error) {
                    console.log(error)
                }
        })();
    }, [])

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const planToSave: IPartialPlan = modifyPlan;
        planToSave.name = name;
        planToSave.description = description;
        const serviceMethod = isEdit ? patchPlan : createPlan;
        (async () => {
            try {
                const response: IResponse<IPlan> = await serviceMethod(token!, planToSave);
                if (response) {
                    if(isAddition)
                        setPlansList(prev => [...prev!, response.data]);
                    else
                        setPlansList(prev=>prev.map(p=>  p._id === response.data._id? response.data : p));
                }
            } catch (error) {
                console.log(error);
            }
        })();
        setIsAddition(false);
        setIsEdit(false);
        setName("");
        setDescription("");
        setModifyPlan({ workouts: [] });
    }

    async function handleDelete(plan: IPlan): Promise<void> {
        try{
            const response: IResponse<IPlan> = await deletePlan(token!, plan._id);
            if(response){
                setPlansList(prev => prev.filter(p=>p._id !== response.data._id));
            }
        }catch(error){
            console.log(error);
        }
    }

    function handleModify(plan: IPlan): void {
        setModifyPlan(plan);
        setName(plan.name);
        setDescription(plan.description);
        setIsEdit(true);
    }

    return (
        <Container fluid p={"lg"}>
            {
                (isAddition  || isEdit) ?
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <Title>Create plan</Title>
                            <TextInput placeholder="Name" label="name" required value={name}
                                onChange={(event) => (setName(event.target.value))}
                            />
                            <Textarea placeholder="description" label="description" required value={description}
                            onChange={(event) => (setDescription(event.target.value))} />
                            <NumberInput label="Duration" placeholder="Duration in weeks" description="In weeks" required onChange={(event) => (setModifyPlan((prev) => ({ ...prev, durationWEEKS: Number(event) })))} defaultValue={modifyPlan.durationWEEKS}/>
                            <Text fw={500}>Workouts:</Text>
                            {
                                modifyPlan?.workouts?.map((workout, index) =>
                                    <Group key={workout.workout! + index} align="end">
                                        <ActionIcon bd={"none"} variant="outline" c={"red"} mb={5} onClick={
                                            () => setModifyPlan((prev) => ({ ...prev, workouts: prev.workouts.filter(w => w.workout !== workout.workout) }))
                                        }>
                                            <IconMinus />
                                        </ActionIcon>
                                        <Select label="Day" data={weekdays} maxDropdownHeight={150} classNames={classes} defaultValue={getWeekdayName(Number(workout.day))}
                                            onChange={(_event, option) => {
                                                const newArr: IPlanWorkout[] = [];
                                                modifyPlan.workouts.forEach(w => {
                                                    if (w.workout === workout.workout)
                                                        newArr.push({ ...w, day: Number(option.value) })
                                                    else
                                                        newArr.push(w);
                                                })
                                                setModifyPlan((prev?) => ({ ...prev, workouts: newArr }))
                                            }
                                            }
                                        />
                                        <Select label="Workout" data={selectValues} maxDropdownHeight={150} classNames={classes} placeholder="Select workout" flex={1} defaultValue={workout.workout}
                                            onChange={(_event, option) => {
                                                const newArr: IPlanWorkout[] = [];
                                                modifyPlan.workouts.forEach(w => {
                                                    if (w.workout === workout.workout)
                                                        newArr.push({ ...w, workout: option.value, name: option.label })
                                                    else
                                                        newArr.push(w);
                                                })
                                                setModifyPlan((prev?) => ({ ...prev, workouts: newArr }))
                                            }
                                            }
                                        />
                                    </Group>)
                            }
                            <Divider />
                            <Text fw={500} mt={"lg"}>Add workout:</Text>
                            <Group align="end">
                                <Select label="Day" data={weekDayOptions} maxDropdownHeight={150} classNames={classes} placeholder="Select day"
                                    onChange={(_event, option) =>
                                        setNewWorkout((prev?) => ({ ...prev, day: Number(option.value) }))}
                                />
                                <Select label="Workout" data={selectValues} maxDropdownHeight={150} classNames={classes} placeholder="Select workout" flex={1}
                                    onChange={(_event, option) =>
                                        setNewWorkout((prev?) => ({ ...prev, name: option.label, workout: option.value }))

                                    }
                                />
                                <ActionIcon variant="outline" c={"green"} bd={"none"} mb={5} onClick={() => {
                                    setModifyPlan((prev?) => ({ ...prev, workouts: [...prev?.workouts!, newWorkout] }));

                                }} disabled={newWorkout.day === undefined || newWorkout.workout === undefined} opacity={(newWorkout.day === undefined || newWorkout.workout === undefined) ? 0.2 : 1}>
                                    <IconPlus />
                                </ActionIcon>
                            </Group>
                            <Group justify="space-around" mt={"lg"}>
                                <Button type="submit" disabled={modifyPlan.workouts.length < 1}>Submit</Button>
                                <Button variant="light" onClick={()=>{
                                    setIsAddition(false);
                                    setIsEdit(false);
                                    setName("");
                                    setDescription("");
                                    setModifyPlan({ workouts: [] });
                                }}>Cancel</Button>
                            </Group>
                        </Stack>
                    </form>
                    :
                    <Stack>
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
                            <ActionIcon variant="outline" onClick={() => setIsAddition(true)}>
                                <IconPlus />
                            </ActionIcon>
                        </Group>
                        <List listStyleType="none" classNames={classes} spacing={"lg"}>
                            {
                                plansList?.map(
                                    plan =>
                                        plan.name.toLowerCase().includes(filter) &&
                                        <List.Item key={plan._id}>
                                            <PlanCard plan={plan} handleDelete={handleDelete} handleModify={handleModify}/>
                                        </List.Item>
                                )
                            }
                        </List>
                    </Stack>}
        </Container>
    )
}