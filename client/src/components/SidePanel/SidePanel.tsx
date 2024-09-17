import { Flex, NavLink } from "@mantine/core";
import classes from "./SidePanel.module.css";
import { Link } from "react-router-dom";

interface ISideNavProps {
    isOpen: boolean,
}

export default function SidePanel(props: ISideNavProps) {
    return (
        <Flex className={classes.wrapper} w={{
            base: props.isOpen ? 250 : 0,
            lg: 250,
        }}>
            <NavLink variant="filled" className={classes.link} label="Users" p={"lg"} />
        </Flex>
    )
}