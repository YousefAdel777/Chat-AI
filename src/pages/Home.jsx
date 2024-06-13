import Sidebar from "../components/Sidebar";
import Message from "../components/Message";
import ChatInput from "../components/ChatInput";
import Example from "../components/Example";
import { examples } from "../constants";
import { useChatsContext } from "../contexts/ChatsContext";
import {useAuthContext} from "../contexts/AuthContext";

const Home = () => {

    const {chats, currentChatId, isLoading, newMessage, isError} = useChatsContext();
    const {user} = useAuthContext();
    const chat = chats.find(chat => chat.id === currentChatId);

    if (!currentChatId) {
        return (
            <section className="home flex min-h-[calc(100svh_-_6.5rem)]">
                <Sidebar />
                <div className="min-h-[calc(100svh_-_6.5rem)] max-h-[calc(100svh_-_6.5rem)] relative bg-gray-400 basis-full lg:basis-3/4 dark:bg-slate px-4 pt-12">
                    <h1 className="text-center text-3xl font-semibold text-black mb-6 dark:text-white">
                        Chat AI
                    </h1>
                    <div className="examples grid grid-cols-2 gap-4 mb-4 overflow-y-auto lg:mb-8 lg:gap-6 lg:grid-cols-3">
                        {examples.map((example, i) => <Example key={i} text={example} onClick={() => newMessage(example, "user")} />)}
                    </div>
                    <ChatInput onSubmit={newMessage} disabled={isLoading} />
                    {!user && <p className="text-sm text-center dark:text-gray-300">Note: You must be logged in to save your chats</p>}
                </div>
            </section>
        );
    }

    return (
        <section className="home flex min-h-[calc(100svh_-_6.5rem)]">
            <Sidebar />
            <div className="min-h-[calc(100svh_-_6.5rem)] max-h-[calc(100svh_-_6.5rem)] max-w-full relative bg-gray-400 basis-full dark:bg-slate lg:max-w-[75%] lg:basis-3/4">
                <div className="messages-container overflow-y-auto min-h-[80%] max-h-[80%]">
                    {chat?.history.map((message, i) => <Message key={i} {...message} />)}
                    {isLoading && <Message isLoading={true} />}
                    {isError && <Message isError={true} />}
                </div>
                <ChatInput onSubmit={(message) => newMessage(message, "user")} disabled={isLoading} />
            </div>
        </section>
    );
}

export default Home;