import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {test, describe, vi, expect, beforeEach} from "vitest";
import Example from "../components/Example";

describe("<Example />", () => {
    const onClick = vi.fn();
    const example = "test"
    beforeEach(() => {
        render(<Example onClick={onClick} text={example} />);
    })

    test("renders example content", () => {
        expect(screen.getByText("test")).toBeDefined();
    });

    test("handles user click", async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole("paragraph"));
        expect(onClick.mock.calls).toHaveLength(1);
    });
});