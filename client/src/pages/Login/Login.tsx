import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import classes from './Login.module.css';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContext, ToastsContextType } from '../../contexts/ToastContext/ToastContext';
import { IUserCredentials } from '../../model/interfaces/IUser';
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from "@tabler/icons-react";
import { ITokenResponse } from "../../model/interfaces/IToken";
import { storeTokenLS } from "../../services/LSService";
import { login } from "../../services/AuthService";

interface IUserCredentialsForm extends IUserCredentials {
  rememberMe: boolean,
};

export default function Login() {

  const auth = useContext<AuthContextType>(AuthContext);
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const toasts = useContext<ToastsContextType | undefined>(ToastContext);
  const navigate = useNavigate();

  const form = useForm<IUserCredentialsForm>({
    mode: 'uncontrolled',
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/.test(value) ? null : 'Invalid password'),
    },
  });

  useEffect(() => {
    setError(undefined);
    if (submit) (
      async () => {
        try {
          const userDetails: IUserCredentials = form.getValues();
          const response: ITokenResponse = await login(userDetails);
          if (response) {
            auth.setToken(response.token);
            if (form.getValues().rememberMe)
              storeTokenLS(response.token);
            navigate("/about");
          }
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

  return (
    <Container pt={30}>
      <LoadingOverlay
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'lime', type: 'bars' }}
      />
      <Title ta="center" className={classes.title} /** fz={{base: "xl", xl: "h1"}}*/>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={"md"}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          <Link to={"/register"}>Create account</Link>
        </Anchor>
      </Text>

      <Paper mt={"lg"} radius="md" component='form' onSubmit={form.onSubmit(() => setSubmit(true))}>
        <TextInput label="Email" placeholder="Registration Email" required leftSection={<IconAt size={16} />} type="email" key={form.key('email')} {...form.getInputProps('email')} variant="filled" />
        <PasswordInput
          variant="filled"
          mt={"lg"}
          label="Password"
          placeholder="Your password"
          required
          leftSection={<IconLock size={16} />}
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Checkbox label="Remember me" mt={"lg"}
          key={form.key('rememberMe')}
          {...form.getInputProps('rememberMe')} />
        <Button fullWidth mt="lg" type='submit'>
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}

