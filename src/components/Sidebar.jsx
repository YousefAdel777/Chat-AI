import {AddIcon,  LogoutIcon, SunIcon, MoonIcon, CloseIcon} from "../icons/Icons";
import Chat from "./Chat";
import { auth } from "../firebase/config";
import { signOut } from "@firebase/auth";
import { useChatsContext } from "../contexts/ChatsContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useThemeContext } from "../contexts/ThemeContext";

const Sidebar = () => {

    const {deleteChat, setCurrentChat, chats, currentChatId, isLoading} = useChatsContext();
    const {logout, user} = useAuthContext();
    const {hideSidebar, isVisible} = useSidebarContext();
    const {theme, toggleTheme} = useThemeContext();

    const handleLogout = () => {
        signOut(auth);
        logout();
        hideSidebar();
    }

    return (
        <>
            {isVisible && <div className="overlay absolute w-full h-full bg-black opacity-40 z-10 lg:hidden" onClick={hideSidebar}></div>}
            <div className={isVisible ? "sidebar show" : "sidebar"}>
                <button onClick={hideSidebar} className="close absolute right-4 top-4 lg:hidden">
                    <CloseIcon />
                </button>
                <button 
                    className="flex mb-8 items-center gap-6 w-full border-2 border-gray-600 rounded-md px-3 py-4 hover:bg-gray-300 dark:hover:bg-gray-600" 
                    onClick={() => {
                        setCurrentChat(null);
                        hideSidebar();
                    }}
                >
                    <AddIcon />
                    New Chat
                </button>
                <div className="chats flex flex-col gap-4 max-h-[50%] h-1/2 mb-8 overflow-y-auto">
                    {chats.map(chat => {
                        return <Chat 
                                    deleteChat={() => {
                                        if (isLoading) {
                                            return;
                                        }
                                        else {
                                            deleteChat(chat.id)
                                        }
                                    }}
                                    onClick={() => {
                                        setCurrentChat(chat.id);
                                        hideSidebar();
                                    }}
                                    key={chat.id} 
                                    {...chat}
                                    active={chat.id === currentChatId}
                                />
                        })}
                </div>
                <button className="theme flex items-center rounded-md mb-4 gap-6 px-2 py-3 w-full hover:bg-gray-300 dark:hover:bg-gray-600 text-lg" onClick={toggleTheme}>
                    {
                        theme === "dark" ? 
                        <>
                            <SunIcon />
                            Light Mode
                        </>
                        :
                        <>
                            <MoonIcon />
                            Dark Mode
                        </> 
                    }
                </button>
                {
                    user &&
                    <button onClick={handleLogout} className="logout flex w-full px-2 py-3 rounded-md items-center gap-6 hover:bg-gray-300 dark:hover:bg-gray-600 text-lg">
                        <LogoutIcon />
                        Logout
                    </button>
                }
            </div>
        </>
    );
}

export default Sidebar;