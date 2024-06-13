import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, describe, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ChatsContext, { useChatsContext } from "../contexts/ChatsContext";
import AuthContext from "../contexts/AuthContext";

const TestingComponent = () => {
    const {dispatch, chats, currentChatId, isLoading, isError, deleteChat, newMessage, setCurrentChat} = useChatsContext();
    return (
        <div>
            <p data-testid="chats">{String(chats.length)}</p>
            <p data-testid="loading">{String(isLoading)}</p>
            <p data-testid="error">{String(isError)}</p>
            <p data-testid="currentChatId">{String(currentChatId)}</p>
            <button onClick={() => dispatch({type: "SET_LOADING", payload: true})}>Load</button>
            <button onClick={() => dispatch({type: "SET_ERROR", payload: true})}>Error</button>
            <button onClick={() => deleteChat(currentChatId)}>Delete</button>
            <button onClick={() => newMessage("test", "model")}>New</button>
            <button onClick={() => setCurrentChat("test")}>Set Current Chat</button>
        </div>
    );
}

describe("<ChatsContext />", () => {

    test("provides expected ChatsContext to children", async () => {
        const {getByTestId} = render(
            <BrowserRouter>
                <AuthContext>
                    <ChatsContext>
                        <TestingComponent />
                    </ChatsContext>
                </AuthContext>
            </BrowserRouter>
        );
        const user = userEvent.setup();
        const chats = getByTestId("chats");
        const loading = getByTestId("loading");
        const error = getByTestId("error");
        const currentChatId = getByTestId("currentChatId");
        const loadBtn = screen.getByText("Load");
        const errorBtn = screen.getByText("Error");
        const newBtn = screen.getByText("New");
        const deleteBtn = screen.getByText("Delete");
        const setChatBtn = screen.getByText("Set Current Chat")
        expect(chats).toHaveTextContent("0");
        expect(loading).toHaveTextContent("false");
        expect(error).toHaveTextContent("false");
        expect(currentChatId).toHaveTextContent("null");
        await user.click(loadBtn);
        expect(loading).toHaveTextContent("true");
        await user.click(errorBtn);
        expect(error).toHaveTextContent("true");
        await user.click(newBtn);
        expect(chats).toHaveTextContent("1");
        expect(currentChatId).not.toHaveTextContent("null");
        await user.click(deleteBtn);
        expect(chats).toHaveTextContent("0");
        await user.click(setChatBtn);
        expect(currentChatId).toHaveTextContent("test");
    });
});