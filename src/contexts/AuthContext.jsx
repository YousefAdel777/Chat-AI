/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { onAuthStateChanged } from "@firebase/auth";
import {createContext, useContext, useEffect, useReducer} from "react";
import { useNavigate } from "react-router";
import AuthReducer from "./AuthReducer";
import  {auth} from "../firebase/config";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const initialState = {
    user: null,
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                login({id: user.uid, email: user.email});
                navigate("/");
            }
            else {
                logout();
            }
        });
        return () => unsub;
    }, [navigate]);

    const logout = () => {
        dispatch({type: "LOGOUT"});
    }

    const login = (payload) => {
        dispatch({type: "LOGIN", payload});
    }

    return (
        <AuthContext.Provider value={{user: state.user, logout, login}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;