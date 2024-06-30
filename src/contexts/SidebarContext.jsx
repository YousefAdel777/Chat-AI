/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useReducer} from "react";
import SidebarReducer from "./SidebarReducer";

export const SidebarContext = createContext();
export const useSidebarContext = () => useContext(SidebarContext);

const initialState = {
    isVisible: false,
}

const SidebarContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(SidebarReducer, initialState);

    const showSidebar = () => {
        dispatch({type: "SHOW_SIDEBAR"});
    }

    const hideSidebar = () => {
        dispatch({type: "HIDE_SIDEBAR"});
    }

    return (
        <SidebarContext.Provider value={{isVisible: state.isVisible, showSidebar, hideSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarContextProvider;