import { ActionIcon, Burger, Collapse, Container, Flex, Group, Menu, Stack, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../Logo/Logo";
import classes from './Header.module.css';
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { IconChevronLeft, IconChevronRight, IconSettings } from "@tabler/icons-react";
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const mainLinks = [
  { link: '/about', label: 'About' },
];

interface IHeaderProps {
  toggleDashNav(): void,
  isDashNavOpen: boolean,
}

export default function Header(props: IHeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { token, loginDetails } = useContext<AuthContextType>(AuthContext);
  const [opened, { toggle }] = useDisclosure(false);
  const [links, setLinks] = useState<{ link: string, label: string }[]>(mainLinks);
  const location = useLocation();

  useEffect(() => {
    console.log(token)
    if (token) {
      setLinks([{ link: '/dashboard', label: 'Dashboard' }, ...mainLinks]);
    } else
      setLinks(links.filter(l => l.link !== "/dashboard"));
  }, [token])

  return (
    <header className={classes.header}>
      <Flex>
        <Group hiddenFrom="lg" m={"lg"} onClick={props.toggleDashNav}>
          {
            props.isDashNavOpen ?
              <IconChevronLeft />
              :
              <IconChevronRight />
          }
        </Group>
        <Container size="md" className={classes.inner} >
          <Group mr={"auto"}>
            <Link to={"/"}>
              <Logo />
            </Link>
          </Group>
          <Group gap={5} visibleFrom="md">
            {links.map(({ link, label }, index) => (
              <Link
                className={classes.link}
                to={link}
                key={index}

              >
                {label}
              </Link>
            ))}
          </Group>
        </Container>
        {
          location.pathname !== "/login" && !token &&
          <Group>
            <Link to={"login"} className={classes.link}>
              Login
            </Link>
          </Group>
        }
        {
          token &&
          <Group >
            <Menu shadow="md" width={200} withArrow>
              <Menu.Target>
                <ActionIcon variant="outline" bd={"none"} >
                  <IconSettings size={64} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown h={90}>
                <Menu.Item h={40}>
                  <Link to={`/edit/${loginDetails?.id}`} className={classes.link}>
                    Edit my profile
                  </Link>
                </Menu.Item>
                <Menu.Item h={40}>
                  <Link to={"/logout"} className={classes.link}>
                    Log out
                  </Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        }
        <Group m="lg">
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            bd={"none"}
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </Flex>
      <Collapse in={opened} hiddenFrom="md"
        style={{
          padding: 5,
        }}
      >
        <Stack gap={0}>
          {links.map(({ link, label }, index) => (
            <Link
              className={classes.link}
              to={link}
              key={index}
              onClick={
                () => {

                  toggle();
                }
              }

            >
              {label}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </header>
  );
}
