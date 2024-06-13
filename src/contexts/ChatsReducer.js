import { nanoid } from "nanoid";

const ChatsReducer = (state, action) => {
    switch (action.type) {
        case "SET_CHATS":
            return ({
                ...state,
                chats: action.payload,
            });
        case "NEW_CHAT": {
            const id = nanoid();
            return ({
                ...state,
                currentChatId: id,
                chats: [
                    ...state.chats,
                    {
                        id,
                        name: action.payload.text,
                        history: [
                            {
                                role: "user",
                                parts: [
                                    {text: action.payload.text}
                                ]
                            }
                        ],
                        generationConfig: {maxOutputTokens: 1000},
                    }
                ],
            });
        }
        case "DELETE_CHAT":
            return ({
                ...state,
                chats: state.chats.filter(chat => chat.id != action.payload),
            });
        case "NEW_MESSAGE":
            return ({
                ...state,
                chats: state.chats.map(chat => chat.id === action.payload.id ? {...chat, history: [...chat.history, {role: action.payload.role, parts: [{text: action.payload.text}]}]} : chat),
            });
        case "SET_CURRENT_CHAT": 
            return ({
                ...state,
                currentChatId: action.payload,
            });
        case "SET_LOADING":
            return ({
                ...state,
                isLoading: action.payload,
            });
        case "SET_ERROR":
            return ({
                ...state,
                isError: action.payload,
            });
        default:
            return state;
    }
}

export default ChatsReducer;