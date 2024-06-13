import { render, screen } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import "@testing-library/jest-dom";
import Message from "../components/Message";

describe("<Message />", () => {

    test("handles model message role", () => {
        const parts = [{text: "test"}];
        const {container} = render(<Message role="model" parts={parts} />);
        expect(container.querySelector(".message.ai")).toBeDefined();
        expect(screen.getByText("test")).toBeDefined();
    });

    test("handles user message role", () => {
        const parts = [{text: "test"}];
        const {container} = render(<Message role="user" parts={parts} />);
        expect(container.querySelector(".message.user")).toBeDefined();
        expect(screen.getByText("test")).toBeDefined();
    });

    test("handles error", () => {
        render(<Message isError={true} />);
        expect(screen.getByText("Whoops! An unexpected error has occured! Check your internet connection and try again.")).toBeDefined();
    });

    test("handles loading", () => {
        const {container} = render(<Message isLoading={true} />);
        expect(container.querySelector("svg")).toHaveClass("animate-bounce");
    });

});
