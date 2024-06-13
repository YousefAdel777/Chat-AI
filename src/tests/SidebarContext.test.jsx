import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, expect } from "vitest";
import "@testing-library/jest-dom";
import SidebarContext, { useSidebarContext } from "../contexts/SidebarContext";

const TestComponent = () => {
    const {hideSidebar, showSidebar, isVisible} = useSidebarContext();
    return (
        <div>
            <p data-testid="sidebar">{String(isVisible)}</p>
            <button onClick={showSidebar}>Show</button>
            <button onClick={hideSidebar}>Hide</button>
        </div>
    );
}

describe("<SidebarContext />", () => {
    
    test("provides expected SidebarContext to children", async () => {
        const {getByTestId} = render(
            <SidebarContext>
                <TestComponent />
            </SidebarContext>
        );
        const user = userEvent.setup();
        const sidebar = getByTestId("sidebar");
        const showBtn = screen.getByText("Show");
        const hideBtn = screen.getByText("Hide");
        expect(sidebar).toHaveTextContent("false");
        await user.click(showBtn);
        expect(sidebar).toHaveTextContent("true");
        await user.click(hideBtn);
        expect(sidebar).toHaveTextContent("false");
    });
});