/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "../contexts/AuthContext";
import SidebarContextProvider, { SidebarContext } from "../contexts/SidebarContext";
import ThemeContextProvider, { ThemeContext } from "../contexts/ThemeContext";
import ChatsContextProvider, { ChatsContext } from "../contexts/ChatsContext";

const Wrapper = ({children, authContext, sidebarContext, themeContext, chatsContext}) => {
    if (authContext || sidebarContext || themeContext || chatsContext) {
        return (
            <BrowserRouter>
                <AuthContext.Provider value={authContext}>
                    <SidebarContext.Provider value={sidebarContext}>
                        <ThemeContext.Provider value={themeContext}>
                            <ChatsContext.Provider value={chatsContext}>
                                {children}
                            </ChatsContext.Provider>
                        </ThemeContext.Provider>
                    </SidebarContext.Provider>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    }
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <SidebarContextProvider>
                    <ThemeContextProvider>
                        <ChatsContextProvider>
                            {children}
                        </ChatsContextProvider>
                    </ThemeContextProvider>
                </SidebarContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export const customRender = (ui, options) => {
    return render(ui, {wrapper: props => <Wrapper {...props} {...options?.wrapperProps} />, ...options});
}