/* eslint-disable react/prop-types */
import { useState } from "react"
import { SendIcon } from "../icons/Icons";

const ChatInput = ({onSubmit, disabled}) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!disabled) {
            setInputValue("");
            onSubmit(inputValue);
        }
    }

    return (
        <form className="absolute w-4/5 h-16 -translate-x-1/2 left-1/2 bottom-8 rounded-lg shadow-md overflow-hidden shadow-gray-400 dark:shadow-none dark:border-2 dark:border-gray-600" onSubmit={handleSubmit}>
            <input
                value={inputValue}
                type="text"
                disabled={disabled}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-white w-full h-full outline-none block pl-5 pr-14 text-lg py-3 text-black dark:text-gray-300 dark:bg-black dark:caret-gray-300"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
                <SendIcon />
            </button>
        </form>
    );
}

export default ChatInput;