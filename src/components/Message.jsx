/* eslint-disable react/prop-types */
import {UserIcon, Logo} from "../icons/Icons";
import Markdown from "markdown-to-jsx";

const Message = ({role, parts, isLoading, isError}) => {

    if (isLoading) {
        return (
            <div className="ai message items-center justify-center">
                <Logo className="h-8 animate-bounce dark:fill-white" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="ai message flex-col items-center justify-center">
                <Logo className="h-8 dark:fill-white" />
                <p className="text-center">Whoops! An unexpected error has occured! Check your internet connection and try again.</p>
            </div>
        );
    }

    return (
        <div className={role === "user" ? "user message" : "ai message"}>
            {role === "model" ? <Logo className="dark:fill-white max-w-[1.5rem] min-w-[1.5rem]" /> : <UserIcon className="max-w-[1.5rem] min-w-[1.5rem]" />}
            <div>
                <Markdown>
                    {parts[0].text}
                </Markdown>
            </div>
        </div>
    );
}

export default Message;