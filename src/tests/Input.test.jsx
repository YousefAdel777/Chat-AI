import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, vi, expect } from "vitest";
import Input from "../components/Input";

describe("<Input />", () => {

    test("should be rendered properly depending on props", () => {
        render (
            <Input 
                label="test_label" 
                id="test_id" 
                value="test"
                name="test_name"
                isError={true}
                disabled={true}
                type="password"
            />
        );
        const input = screen.getByLabelText("test_label");
        expect(input.id).toBe("test_id");
        expect(input.value).toBe("test");
        expect(input.name).toBe("test_name");
        expect(input).toHaveClass("error");
        expect(input.disabled).toBe(true);
        expect(input.type).toBe("password");
    });

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