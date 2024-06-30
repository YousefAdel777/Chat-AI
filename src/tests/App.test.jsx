import {test, expect, describe} from "vitest";
import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App"
import ChatsContext from "../contexts/ChatsContext";
import AuthContext from "../contexts/AuthContext";
import SidebarContext from "../contexts/SidebarContext";
import ThemeContext from "../contexts/ThemeContext";

const AppWithProviders = () => {
    return (
        <AuthContext>
            <ThemeContext>
                <ChatsContext>
                    <SidebarContext>
                        <App />
                    </SidebarContext>
                </ChatsContext>
            </ThemeContext>
        </AuthContext>
    );
}

describe("<App />", () => {
    test("renders <Home /> by default", () => {
        const {container} = render(
            <MemoryRouter initialEntries={["/"]}>
                <AppWithProviders />
            </MemoryRouter>
        );
        expect(container.querySelector(".home")).toBeDefined();
    });

    test("renders <ErrorPage /> if url is wrong", () => {
        render(
            <MemoryRouter initialEntries={["/*"]}>
                <AppWithProviders />
            </MemoryRouter>
        );
        expect(screen.getByText("Error 404!")).toBeDefined();
    });

    test("renders <Signup /> if url is /signup", () => {
        const {container} = render(
            <MemoryRouter initialEntries={["/signup"]}>
                <AppWithProviders />
            </MemoryRouter>
        );
        expect(container.querySelector(".signup")).toBeDefined();
    });

    test("renders <Login /> if url is /login", () => {
        const {container} = render(
            <MemoryRouter initialEntries={["/login"]}>
                <AppWithProviders />
            </MemoryRouter>
        );
        expect(container.querySelector(".login")).toBeDefined();
    });
});