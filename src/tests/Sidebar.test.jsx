import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import AuthContext from "../contexts/AuthContext";
import SidebarContext from "../contexts/SidebarContext";
import ChatsContext from "../contexts/ChatsContext";
import ThemeContext from "../contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar";

describe("<Sidebar />", () => {
    let user;
    let container;
    beforeEach(() => {
        user = userEvent.setup();
        container = render(
            <BrowserRouter>
                <AuthContext>
                    <SidebarContext>
                        <ThemeContext>
                            <ChatsContext>
                                <Sidebar />
                            </ChatsContext>
                        </ThemeContext>
                    </SidebarContext>
                </AuthContext>
            </BrowserRouter>
        ).container;
    });

    test("should render succeessfully", () => {
        expect(container.querySelector(".close")).toBeVisible();
        expect(screen.getByText("New Chat")).toBeDefined();
        expect(screen.queryByText("Logout")).toBe(null);
    });

    test("handles theme toggle", async () => {
        const toggle = screen.getByText("Dark Mode");
        await user.click(toggle);
        expect(screen.getByText("Light Mode")).toBeDefined();
    });
});