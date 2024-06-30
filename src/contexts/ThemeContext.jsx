/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useReducer, useEffect} from "react";
import ThemeReducer from "./ThemeReducer";

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

const initialState = {
    theme: localStorage.getItem("theme") || "light",
}

const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialState);

    useEffect(() => {
        localStorage.setItem("theme", state.theme);
        document.documentElement.className = state.theme;
    }, [state.theme]);

    const toggleTheme = () => {
        dispatch({type: "TOGGLE_THEME"});
    }

    return (
        <ThemeContext.Provider value={{theme: state.theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;