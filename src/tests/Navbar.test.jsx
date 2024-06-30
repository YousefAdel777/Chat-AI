import { screen } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import { customRender } from "./utils";
import Navbar from "../components/Navbar";

describe("<Navbar />", () => {
    test("should render all elements properly", () => {
        const {container} = customRender(<Navbar />);
        expect(screen.getByTitle("chatbot")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        expect(screen.getAllByRole("link")).toHaveLength(3);
        expect(container.querySelector(".menu-icon")).toBeInTheDocument();
        expect(container.querySelector("a.logo")).toBeInTheDocument();
    });
});