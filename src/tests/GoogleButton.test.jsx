import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {test, describe, vi, expect, beforeEach} from "vitest";
import GoogleButton from "../components/GoogleButton";

describe("<GoogleButton />" , () => {
    const onClick = vi.fn();
    beforeEach(() => {
        render(<GoogleButton onClick={onClick} text="test" />);
    });

    test("renders text", () => {
        expect(screen.getByText("test")).toBeDefined();
    });

    test("handles user click", async () => {
        const user = userEvent.setup();
        const btn = screen.getByRole("button");
        await user.click(btn);
        expect(onClick.mock.calls).toHaveLength(1);
    });
});