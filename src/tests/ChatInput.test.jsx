import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {test, describe, vi, expect} from "vitest";
import ChatInput from "../components/ChatInput";

describe("<ChatInput />", () => {
    test("renders successfully", () => {
        render(<ChatInput disabled={true} />);
        expect(screen.getByRole("textbox")).toBeDefined();
        expect(screen.getByRole("button")).toBeDefined();
    });

    test("handles user input and calls onSubmit if not disabled", async () => {
        const onSubmit = vi.fn();
        const user = userEvent.setup();
        const { container } = render(<ChatInput onSubmit={onSubmit} disabled={false} />);
        const input = container.querySelector("input");
        const btn = container.querySelector("button");
        await user.type(input, "test");
        expect(input.value).toBe("test");
        await user.click(btn);
        expect(onSubmit.mock.calls).toHaveLength(1);
    });

    test("denies user input if disabled", async () => {
        const onSubmit = vi.fn();
        const user = userEvent.setup();
        const { container } = render(<ChatInput onSubmit={onSubmit} disabled={true} />);
        const input = container.querySelector("input");
        const btn = container.querySelector("button");
        await user.type(input, "test");
        expect(input.value).toBe("");
        await user.click(btn);
        expect(onSubmit.mock.calls).toHaveLength(0);
    });
});