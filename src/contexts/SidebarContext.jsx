/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useReducer} from "react";
import SidebarReducer from "./SidebarReducer";

const SidebarProvider = createContext();
export const useSidebarContext = () => useContext(SidebarProvider);

const initialState = {
    isVisible: false,
}

const SidebarContext = ({children}) => {

    const [state, dispatch] = useReducer(SidebarReducer, initialState);

    const showSidebar = () => {
        dispatch({type: "SHOW_SIDEBAR"});
    }

    const hideSidebar = () => {
        dispatch({type: "HIDE_SIDEBAR"});
    }

    return (
        <SidebarProvider.Provider value={{isVisible: state.isVisible, showSidebar, hideSidebar}}>
            {children}
        </SidebarProvider.Provider>
    );
}

export default SidebarContext;