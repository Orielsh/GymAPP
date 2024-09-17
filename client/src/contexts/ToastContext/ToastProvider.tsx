import { ReactNode, useState } from "react";
import { IToast, ToastContext } from "./ToastContext";
import { Flex, Paper, Text } from "@mantine/core";
import classes from "./Toast.module.css";
export default function ToastProvider({ children }: { children: ReactNode }) {

    const [toastList, setToastList] = useState<IToast[]>([]);

    const addToast = (toast: IToast) => {
        const newToast: IToast = { ...toast, id: Date.now() };
        setToastList([...toastList, newToast]);
        setTimeout(() => {
            setToastList((prevToastList)=> prevToastList.filter((toast)=> toast.id !== newToast.id));
        }, 8000);
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <Flex pos={"fixed"} direction={"column"} gap={15} bottom={15} className={classes.container}>
                {toastList.map((toast) => (
                    <Paper bg={toast.success ? "lime": "red"} key={toast.id} p={5} px={20} className={classes.toast}>
                        <Text size="xl">{toast.headerText}</Text>
                        <Text size="md">{toast.message}</Text>
                    </Paper>
                ))}
            </Flex>
        </ToastContext.Provider>
    )
};