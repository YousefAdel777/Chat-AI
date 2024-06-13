import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {test, describe, vi, expect, beforeEach} from "vitest";
import "@testing-library/jest-dom";
import Chat from "../components/Chat";

describe("<Chat />", () => {
    const deleteChat = vi.fn();
    const onClick = vi.fn();
    beforeEach(() => {
        const chat = {
            name: "test",
        }
        render(<Chat deleteChat={deleteChat} onClick={onClick} active={true} {...chat} />);
    });

    test("renders chat name", () => {
        const element = screen.getByText("test");
        expect(element).toBeDefined();
        expect(element.parentElement).toHaveClass("active");
    });

    test("handles user click", async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole("paragraph"));
        expect(onClick.mock.calls.length).toBe(1);
    });

    test("calls delete chat", async () => {
        const user = userEvent.setup();
        const deleteBtn = screen.getByRole("button");
        await user.click(deleteBtn);
        expect(deleteChat.mock.calls.length).toBe(1);
    });
});
