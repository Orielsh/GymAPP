import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { removeTokenFromLS } from "../../services/LSService";

export default function Logout() {
    const navigate = useNavigate();
    const { setToken } = useContext<AuthContextType>(AuthContext);

    useEffect(() => {
        setToken(null);
        removeTokenFromLS();
        navigate("/");
    }, []);
    return (<>
    </>)
}