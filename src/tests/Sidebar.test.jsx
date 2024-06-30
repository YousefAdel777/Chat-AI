import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, expect, vi } from "vitest";
import { customRender } from "./utils";
import "@testing-library/jest-dom";
import Sidebar from "../components/Sidebar";

describe("<Sidebar />", () => {

    test("should render all elements properly", () => {
        const { container } = customRender(<Sidebar />);
        expect(container.querySelector(".close")).toBeInTheDocument();
        expect(screen.getByText("New Chat")).toBeInTheDocument();
        expect(screen.queryByText("Logout")).toBeNull();
    });

    test("should handle theme toggle", async () => {
        customRender(<Sidebar />);
        const user = userEvent.setup();
        const toggle = screen.getByText("Dark Mode");
        await user.click(toggle);
        expect(toggle).toHaveTextContent("Light Mode");
    });

    test("should call hideSidebar", async () => {
        const user = userEvent.setup();
        const hideSidebar = vi.fn()
        const { container } = customRender(<Sidebar />, { wrapperProps: {
            authContext: { user: null },
            chatsContext: { chats: [] },
            themeContext: { theme: "light" },
            sidebarContext: { hideSidebar }
        }});
        await user.click(container.querySelector(".close"));
        expect(hideSidebar).toHaveBeenCalledTimes(1);
    });

    test("should show sidebar and overlay", async () => {
        const { container } = customRender(<Sidebar />, { wrapperProps: {
            authContext: { user: null },
            chatsContext: { chats: [] },
            themeContext: { theme: "light" },
            sidebarContext: { hideSidebar: () => {}, isVisible: true }
        }});
        expect(container.querySelector(".overlay")).toBeInTheDocument();
        expect(container.querySelector(".sidebar.show")).toBeInTheDocument();
    });

    test("should create new chat", async () => {
        const user = userEvent.setup();
        const hideSidebar = vi.fn();
        const setCurrentChat = vi.fn();
        customRender(<Sidebar />, { wrapperProps: {
            authContext: { user: null },
            chatsContext: { chats: [], setCurrentChat },
            themeContext: { theme: "light" },
            sidebarContext: { hideSidebar }
        }});
        await user.click(screen.getByText("New Chat"));
        expect(hideSidebar).toHaveBeenCalledTimes(1);
        expect(setCurrentChat).toHaveBeenCalledTimes(1);
    });

    test("should display all chats", async () => {
        const user = userEvent.setup();
        const state = {
            chats: [
                {name: "test_chat_1", id: "1"}, 
                {name: "test_chat_2", id: "2"}
            ],
            setCurrentChat: vi.fn(),
            deleteChat: vi.fn(),
        }
        customRender(<Sidebar />, { wrapperProps: {
            authContext: { user: null },
            chatsContext: { ...state },
            themeContext: { theme: "light" },
            sidebarContext: { hideSidebar: () => {} }
        }});
        const firstChat = screen.getByText("test_chat_1");
        expect(firstChat).toBeInTheDocument();
        expect(screen.getByText("test_chat_2")).toBeInTheDocument();
        await user.click(firstChat);
        expect(state.setCurrentChat).toHaveBeenCalledWith("1");
        await user.click(screen.getAllByTitle("Delete")[0]);
        expect(state.deleteChat).toHaveBeenCalledWith("1");
    });

    test("should disable chat delete while loading", async () => {
        const user = userEvent.setup();
        const state = {
            chats: [
                {name: "test_chat_1", id: "1"}, 
            ],
            deleteChat: vi.fn(),
            isLoading: true,
        }
        customRender(<Sidebar />, { wrapperProps: {
            authContext: { user: null },
            chatsContext: { ...state },
            themeContext: { theme: "light" },
            sidebarContext: { hideSidebar: () => {} }
        }});
        await user.click(screen.getByTitle("Delete"));
        expect(state.deleteChat).toHaveBeenCalledTimes(0);
    });

    test("should handle user logout", async () => {
        const user = userEvent.setup();
        const state = {
            logout: vi.fn(),
            user: {id: "1"}
        }
        customRender(<Sidebar />, { wrapperProps: {
            authContext: { ...state },
            chatsContext: { chats: [] },
            themeContext: { theme: "light" },
            sidebarContext: { hideSidebar: () => {} }
        }});
        const logoutBtn = screen.getByText("Logout");
        expect(logoutBtn).toBeInTheDocument();
        await user.click(logoutBtn);
        expect(state.logout).toHaveBeenCalledTimes(1);
    });
});