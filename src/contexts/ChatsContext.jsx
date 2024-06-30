/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useEffect, useReducer, useCallback} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatsReducer from "./ChatsReducer";
import { useAuthContext } from "./AuthContext";
import { db } from "../firebase/config";
import {doc, onSnapshot, collection, updateDoc, addDoc, getDoc, query, where, deleteDoc} from "firebase/firestore";
const API_KEY = import.meta.env.VITE_GEIMINI_API_KEY;

export const ChatsContext = createContext();
export const useChatsContext = () => useContext(ChatsContext);

const initialState = {
    chats: [],
    currentChatId: null,
    isLoading: false,
    isError: false,
}

const ChatsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ChatsReducer, initialState);
    const {user} = useAuthContext();

    const newMessage = useCallback(async (text, role) => {
        if (!text) {
            return;
        }
        if (!user) {
            if (state.currentChatId) {
                dispatch({type: "NEW_MESSAGE", payload: {id: state.currentChatId, text, role}});
            }
            else {
                dispatch({type: "NEW_CHAT", payload: {text}});
            }
        }
        else {
            if (state.currentChatId) {
                try {
                    const docRef = doc(db, "chats", state.currentChatId);
                    const docSnap = await getDoc(docRef);
                    await updateDoc(docRef, {
                        ...docSnap.data(),
                        history: [
                            ...docSnap.data().history,
                            {
                                role,
                                parts: [
                                    {text}
                                ]
                            }
                        ]
                    });
                } catch (error) {
                    console.log(error);
                    dispatch({type: "SET_ERROR", payload: true});
                }
            }
            else {
                try {
                    const {id} = await addDoc(collection(db, "chats"), {
                        user_id: user.id,
                        name: text,
                        history: [
                            {
                                role: "user",
                                parts: [
                                    {text}
                                ]
                            }
                        ],
                        generationConfig: {maxOutputTokens: 1000},
                    });
                    setCurrentChat(id);
                } catch (error) {
                    console.log(error);
                    dispatch({type: "SET_ERROR", payload: true});
                }
            }
        }
    }, [state.currentChatId, user]);

    useEffect(() => {
        dispatch({type: "SET_ERROR", payload: false});
        const chat = state.chats.find(chat => chat.id === state.currentChatId);
        const lastMessage = chat?.history.slice(-1)[0];
        const getAIResponse = async (msg) => {
            dispatch({type: "SET_LOADING", payload: true});
            try {
                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-pro"});
                const AIChat = model.startChat({
                    history: chat?.history.slice(0, -1) || [],
                    generationConfig: {
                        maxOutputTokens: 1000,
                    },
                });
                const result = await AIChat.sendMessage(msg);
                const response = await result.response;
                const text = response.text();
                newMessage(text, "model");
            }
            catch (error) {
                console.log(error);
                dispatch({type: "SET_ERROR", payload: true});
            }
            finally {
                dispatch({type: "SET_LOADING", payload: false});
            }
        }

        if (lastMessage?.role === "user") {
            getAIResponse(lastMessage.parts[0].text);
        }
    }, [state.chats, state.currentChatId, newMessage]);

    useEffect(() => {
        setCurrentChat(null);
        if (user) {
            const q = query(collection(db, "chats"), where("user_id", "==", user.id));
            const unsub = onSnapshot(q, (querySnapshot) => {
                let chats = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .map(chat => {
                    let history = chat.history.filter((msg, i, arr) => {
                        return msg.role !== arr[i + 1]?.role;
                    });
                    chat.history = history;
                    return chat;
                });
                dispatch({type: "SET_CHATS", payload: chats});
            });
            return () => unsub();
        }
        else {
            dispatch({type: "SET_CHATS", payload: []});
        }
    }, [user]);

    const setCurrentChat = (id) => {
        dispatch({type: "SET_CURRENT_CHAT", payload: id});
    } 

    const deleteChat = async (id) => {
        if (!user) {
            dispatch({type: "DELETE_CHAT", payload: id});
        }
        else {
            await deleteDoc(doc(db, "chats", id));
        }
        setCurrentChat(null);
    }

    return (
        <ChatsContext.Provider value={{dispatch, chats: state.chats, currentChatId: state.currentChatId, isLoading: state.isLoading, isError: state.isError, deleteChat, newMessage, setCurrentChat}}>
            {children}
        </ChatsContext.Provider>
    );
}

export default ChatsContextProvider;