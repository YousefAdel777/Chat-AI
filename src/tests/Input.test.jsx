import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, vi, expect } from "vitest";
import Input from "../components/Input";

describe("<Input />", () => {

    test("handles user input and calls onChange", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<Input onChange={onChange} />);
        const input = screen.getByRole("textbox");
        await user.type(input, "test");
        expect(input.value).toBe("test");
        expect(onChange.mock.calls).toHaveLength(4);
    });

    test("denies user input if disabled", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<Input onChange={onChange} disabled={true} />);
        const input = screen.getByRole("textbox");
        await user.type(input, "test");
        expect(input.value).toBe("");
        expect(onChange.mock.calls).toHaveLength(0);
    });

    test("toggles show password", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Input type="password" onChange={onChange} label="password" id="password" />);
        const input = screen.getByLabelText("password");
        const toggle = screen.getByRole("button");
        await user.type(input, "test");
        expect(screen.queryByText("test")).toBe(null);
        await user.click(toggle);
        expect(input.type).toBe("text");
    });
});