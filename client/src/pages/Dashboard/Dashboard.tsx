import { Tabs } from "@mantine/core";
import Profile from "../Profile/Profile";
import UsersList from "../UsersList/UsersList";
import classes from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import ExercisesList from "../ExercisesList/ExercisesList";
import WorkoutsList from "../WorkoutList/WorkoutList";
import PlansList from "../PlansList/PlansList";

interface IDashboardProps {
    isNavOpen: boolean,
    toggle(): void,
}

export default function Dashboard(props: IDashboardProps) {

    const { loginDetails } = useContext<AuthContextType>(AuthContext);
    const [refresh, setRefresh] = useState<boolean>(false);

    return (
        <Tabs defaultValue="profile" orientation="vertical" classNames={classes} pos={"relative"} onChange={props.toggle}>
            <Tabs.List
                pos={{
                    base: "absolute",
                    lg: "static",
                }}
                w={{
                    base: props.isNavOpen ? 250 : 0,
                    lg: 250,
                }}>
                <Tabs.Tab value="profile">Profile</Tabs.Tab>
                {(loginDetails?.role === "ADMIN" || loginDetails?.role === "TRAINER") && <Tabs.Tab value="users">Users</Tabs.Tab>}
                {loginDetails?.role !== "TRAINEE" && <Tabs.Tab value="plans">Plans</Tabs.Tab>}
                {loginDetails?.role !== "TRAINEE" && <Tabs.Tab value="workouts">Workouts</Tabs.Tab>}
                {loginDetails?.role !== "TRAINEE" && <Tabs.Tab value="exercises">Exercises</Tabs.Tab>}
            </Tabs.List>

            <Tabs.Panel value="profile"><Profile userId={loginDetails?.id!} setRefresh={setRefresh} /></Tabs.Panel>
            {(loginDetails?.role === "ADMIN" || loginDetails?.role === "TRAINER") && <Tabs.Panel value="users"><UsersList refresh={refresh} setRefresh={setRefresh} /></Tabs.Panel>}
            {loginDetails?.role !== "TRAINEE" && <Tabs.Panel value="plans"><PlansList /></Tabs.Panel>}
            {loginDetails?.role !== "TRAINEE" && <Tabs.Panel value="workouts"><WorkoutsList /></Tabs.Panel>}
            {loginDetails?.role !== "TRAINEE" && <Tabs.Panel value="exercises"><ExercisesList /></Tabs.Panel>}
        </Tabs >
    )
}