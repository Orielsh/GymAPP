import { Container, Flex, PasswordInput, SegmentedControl, TextInput, Title, Text, NumberInput, Button, LoadingOverlay } from "@mantine/core";
import classes from './Register.module.css';
import { IconAt, IconCake, IconLink, IconLock, IconPhone, IconRuler2, IconScaleOutline } from "@tabler/icons-react";
import { DatePickerInput } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { maxDateForAge } from "../../utils/date";
import { MIN_USER_AGE } from "../../config/common";
import { useContext, useEffect, useState } from "react";
import { register } from "../../services/AuthService";
import { IUserDetailsResponse, IUserRegister } from "../../model/interfaces/IUser";
import { useNavigate } from "react-router-dom";
import { ToastContext, ToastsContextType } from "../../contexts/ToastContext/ToastContext";

export default function Register() {

  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const toasts = useContext<ToastsContextType | undefined>(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    setError(undefined);
    if (submit) (
      async () => {
        try {
          const userDetails = form.getValues();
          const response: IUserDetailsResponse = await register(userDetails);
          if (response)
            navigate("/login")
        } catch (error) {
          setError(error as Error);
        }
        finally {
          setSubmit(false);
        }
      })();
  }, [submit]);

  useEffect(() => {
    if (error)
      toasts?.addToast({ headerText: "Failed", message: error.message, success: false });
  }, [error]);

  const form = useForm<IUserRegister>({
    mode: 'uncontrolled',
    initialValues: {
      name: {
        first: "",
        last: "",
      },
      image: {
        url: "",
        alt: "User profile pucture",
      },
      phone: "",
      birthdate: null,
      gender: "Male",
      heightCM: null,
      weightKG: null,
      email: "",
      password: "",
    },

    validate: {
      image: {
        url: (value) => /(https?:\/\/.*\.(?:png|jpg))/i.test(value) ? null : 'Invalid image URL'
      },
      phone: (value) => (/\d{10}$/.test(value) ? null : 'Invalid phone nmber'),
      birthdate: (value) => value ? null : "Must insert your birthdate",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/.test(value) ? null : 'Invalid password'),
    },
  });


  return (
    <Container py={"lg"}>
      <LoadingOverlay
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'lime', type: 'bars' }}
      />
      <Title mb={30} ta="center" className={classes.title}>
        Welcome, Create new account
      </Title>
      <form className={classes.form} onSubmit={form.onSubmit(() => setSubmit(true))}>
        <Flex wrap={"wrap"} justify={"space-between"} gap={10}>
          <TextInput className={classes.f_grow} variant="filled" label="First name" placeholder="First name" required key={form.key('name.first')} {...form.getInputProps("name.first")} />
          <TextInput className={classes.f_grow} variant="filled" label="Last name" placeholder="Last name" required key={form.key('name.last')} {...form.getInputProps('name.last')} />
        </Flex>
        <TextInput variant="filled" label="Image" placeholder="Image URL" required leftSection={<IconLink size={16} />} key={form.key('image.url')} {...form.getInputProps('image.url')} />
        <TextInput
          variant="filled"
          label="Phone"
          placeholder="Phone number"
          required
          leftSection={<IconPhone size={16} />}
          key={form.key('phone')}
          {...form.getInputProps('phone')}
          type="phone"
          description="10 digits phone number"
        />
        <DatePickerInput
          required
          variant="filled"
          dropdownType="modal"
          label="Birthdate"
          placeholder="Insert your birthdate"
          key={form.key('birthdate')}
          {...form.getInputProps('birthdate')}
          leftSection={<IconCake size={16} />}
          description="Must be over 16"
          maxDate={maxDateForAge(MIN_USER_AGE)}
        />
        <Flex direction={"column"}>
          <Flex gap={3}>
            <Text fw={500} fz={"sm"}>Gender</Text>
            <span className={classes.asterisk}>*</span>
          </Flex>
          <SegmentedControl
            radius="sm"
            size="md"
            data={['Male', 'Female']}
            classNames={classes}
            key={form.key('gender')}
            {...form.getInputProps('gender')}
          />
        </Flex>
        <Flex wrap={"wrap"} justify={"space-between"} gap={10}>
          <NumberInput
            required
            label="Height CM"
            placeholder="Enter your height in CM"
            min={0}
            variant="filled"
            suffix=" CM"
            hideControls
            className={classes.f_grow}
            leftSection={<IconRuler2 size={16} />}
            key={form.key('heightCM')}
            {...form.getInputProps('heightCM')}
          />
          <NumberInput
            required
            label="Weight KG"
            placeholder="Enter your Weight in KG"
            min={0}
            variant="filled"
            suffix=" KG"
            hideControls
            className={classes.f_grow}
            leftSection={<IconScaleOutline size={16} />}
            key={form.key('weightKG')}
            {...form.getInputProps('weightKG')}
          />
        </Flex>
        <TextInput variant="filled" label="Email" placeholder="Registration Email" required leftSection={<IconAt size={16} />} type="email" key={form.key('email')} {...form.getInputProps('email')} />
        <PasswordInput
          variant="filled"
          label="Password"
          placeholder="Your password"
          required
          leftSection={<IconLock size={16} />}
          key={form.key('password')}
          {...form.getInputProps('password')}
          description="Must be more then 7 chars, capital, lower, number and special character"
        />
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

