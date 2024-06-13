import { render, screen } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import AuthContext from "../contexts/AuthContext";
import SidebarContext from "../contexts/SidebarContext";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("<Navbar />", () => {
    test("should render successfully", () => {
        const {container} = render(
            <BrowserRouter>
                <AuthContext>
                    <SidebarContext>
                        <Navbar />
                    </SidebarContext>
                </AuthContext>
            </BrowserRouter>
        );
        expect(screen.getByText("Login")).toBeDefined();
        expect(screen.getByText("Sign Up")).toBeDefined();
        expect(screen.getAllByRole("link")).toHaveLength(3);
        expect(container.querySelector(".menu-icon")).toBeInTheDocument();
        expect(container.querySelector("a.logo")).toBeDefined();
    });
});