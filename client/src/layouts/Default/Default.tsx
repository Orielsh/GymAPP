import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Login from "../../pages/Login/Login";
import NotFound from "../../pages/NotFound/NotFound";
import { Flex } from "@mantine/core";
import Register from "../../pages/Register/Register";
import Logout from "../../pages/Logout/Logout";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { useDisclosure } from "@mantine/hooks";
import EditAccount from "../../components/EditAccount/EditAccount";
import About from "../../pages/About/About";

export default function Default() {

  const [dashNav, { toggle: toggleDashNav, close }] = useDisclosure(false);

  return (
    <Flex direction={"column"} h={"100vh"} justify={"space-between"} align={"stretch"}>
      <Header isDashNavOpen={dashNav} toggleDashNav={toggleDashNav} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:userId' element={<EditAccount />} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<About/>} />
        <Route path='/dashboard' element={<Dashboard isNavOpen={dashNav} toggle={close} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Flex>
  )
}

