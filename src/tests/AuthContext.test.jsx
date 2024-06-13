import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import AuthContext, { useAuthContext } from "../contexts/AuthContext";

const TestingComponent = () => {
    const { user, logout, login } = useAuthContext();
    return (
        <div>
            <p data-testid="user">{String(user?.id)}</p>
            <button onClick={logout}>Logout</button>
            <button onClick={() => login({id: "test"})}>Login</button>
        </div>
    );
}

describe("<AuthContext />", () => {
    test("provides expected Authcontext to children", async () => {
        const { getByTestId } = render (
            <BrowserRouter>
                <AuthContext>
                    <TestingComponent />
                </AuthContext>
            </BrowserRouter>
        );
        const user = userEvent.setup();
        const userValue = getByTestId("user");
        const loginBtn = screen.getByText("Login");
        const logoutBtn = screen.getByText("Logout");
        expect(userValue).toHaveTextContent("undefined");
        await user.click(loginBtn);
        expect(userValue).toHaveTextContent("test");
        await user.click(logoutBtn);
        expect(userValue).toHaveTextContent("undefined")
    });
});