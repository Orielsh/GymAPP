import { Container, Flex, LoadingOverlay, TextInput, Title, Button } from "@mantine/core";
import { useForm } from "react-hook-form"

import { FormEvent, useContext, useEffect, useState } from "react";
import classes from "./EditAccount.module.css";
import { IUserDetails, IUserPatch } from "../../model/interfaces/IUser";
import { IResponse } from "../../model/interfaces/common";
import { getUserById, patchUser } from "../../services/UserService";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { IconAt, IconLink, IconPhone, IconRuler2, IconScaleOutline } from "@tabler/icons-react";
import { ToastContext, ToastsContextType } from "../../contexts/ToastContext/ToastContext";


//almost duplicate as register but can utilize register form for both register and edit user - refactor later

export default function EditAccount() {

    const { token } = useContext<AuthContextType>(AuthContext);
    const [submit, setSubmit] = useState<boolean>(false);
    const { register, setValue, getValues } = useForm<IUserPatch>();
    const { userId } = useParams();
    const navigate = useNavigate();
    const toasts = useContext<ToastsContextType | undefined>(ToastContext);

    useEffect(() => {
        if (token && userId)
            (async () => {
                try {
                    const userResponse: IResponse<IUserDetails> = await getUserById(token, userId!)
                    const user: IUserDetails = userResponse.data;
                    if (userResponse) {
                        setValue("name", (user)?.name);
                        setValue("phone", (user)?.phone);
                        setValue("email", (user)?.email);
                        setValue("birthdate", (user)?.birthdate);
                        setValue("gender", (user)?.gender);
                        setValue("heightCM", (user)?.heightCM);
                        setValue("image", (user)?.image);
                        setValue("weightKG", (user)?.weightKG);
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
    }, [])



    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setSubmit(true);
        const newData: IUserPatch = getValues();
        if(!newData.password)
            delete newData.password;
        (async()=>{
            try{
                const updatedUser: IResponse<IUserDetails> = await patchUser(token!, newData, userId!);
                if(updatedUser){
                    navigate("../dashboard")
                    toasts?.addToast({headerText:"Success", message: "updated successfully", success: true});
                }
            }catch(error){
                console.log(error);
            }
        })();
    }

    return (
        <Container py={30}>
            <LoadingOverlay
                visible={submit}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'lime', type: 'bars' }}
            />
            <Title mb={30} ta="center" className={classes.title}>
                Edit Account
            </Title>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Flex wrap={"wrap"} justify={"space-between"} gap={10}>
                    <TextInput className={classes.f_grow} variant="filled" label="First name" placeholder="First name" required {...register("name.first", { required: "Required", minLength: 2, maxLength: 256 })} />
                    <TextInput className={classes.f_grow} variant="filled" label="Last name" placeholder="Last name" required {...register("name.last", { required: "Required", minLength: 2, maxLength: 256 })} />
                </Flex>
                {/* mantine form didn't worked with async data so I use react hook form so no path validation in client for now - leave for refactor. */}
                <TextInput variant="filled" label="Image" placeholder="Image URL" required leftSection={<IconLink size={16} />} {...register("image.url", { required: "Required", minLength: 2, maxLength: 256 })} />
                <TextInput
                    variant="filled"
                    label="Phone"
                    placeholder="Phone number"
                    required
                    leftSection={<IconPhone size={16} />}
                    type="phone"
                    description="10 digits phone number"
                    {...register("phone", { required: "Required", minLength: 2, maxLength: 256 })}
                />

                <Flex wrap={"wrap"} justify={"space-between"} gap={10}>
                    <TextInput
                        required
                        label="Height CM"
                        placeholder="Enter your height in CM"
                        min={0}
                        variant="filled"
                        className={classes.f_grow}
                        leftSection={<IconRuler2 size={16} />}
                        {...register("heightCM", { required: "Required" })}
                    />
                    <TextInput
                        required
                        label="Weight KG"
                        placeholder="Enter your Weight in KG"
                        min={0}
                        variant="filled"
                        className={classes.f_grow}
                        leftSection={<IconScaleOutline size={16} />}
                        {...register("weightKG", { required: "Required" })}
                    />
                </Flex>
                <TextInput variant="filled" label="Email" placeholder="Registration Email" required leftSection={<IconAt size={16} />} type="email"
                    {...register("email", { required: "Required", minLength: 2, maxLength: 256 })}
                />
                {/* <PasswordInput
                    variant="filled"
                    label="Password"
                    placeholder="Your password"
                    leftSection={<IconLock size={16} />}
                    description="Must be more then 7 chars, capital, lower, number and special character"
                    {...register("password", {
                        minLength: 7,
                        maxLength: 20,
                        // pattern:  todo: find pattern
                    })}
                /> */}
                <Button
                    variant="gradient"
                    gradient={{ from: 'green', to: 'lime', deg: 90 }}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Container>
    )
}