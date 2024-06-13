import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, expect } from "vitest";
import "@testing-library/jest-dom";
import ThemeContext, { useThemeContext } from "../contexts/ThemeContext";

const TestComponent = () => {
    const {theme, toggleTheme} = useThemeContext();
    return (
        <div>
            <p data-testid="theme">{theme}</p>
            <button onClick={toggleTheme}>Toggle</button>
        </div>
    );
}

describe("<ThemeContext />", () => {
    
    test("provides expected ThemeContext to children", async () => {
        const {getByTestId} = render(
            <ThemeContext>
                <TestComponent />
            </ThemeContext>
        );
        const user = userEvent.setup();
        const theme = getByTestId("theme");
        const toggle = screen.getByText("Toggle");
        expect(theme).toHaveTextContent("light");
        await user.click(toggle);
        expect(theme).toHaveTextContent("dark");
    });
});