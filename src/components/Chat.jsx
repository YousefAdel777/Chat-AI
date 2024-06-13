/* eslint-disable react/prop-types */
import {DeleteIcon} from "../icons/Icons";

const Chat = ({deleteChat, name, active, onClick}) => {
    return (
        <div onClick={onClick} className={active ? "chat active" : "chat"}>
            <p className="max-w-[70%] whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
            <button
            onClick={(e) => {
                e.stopPropagation();
                deleteChat();
            }}
            >
                <DeleteIcon />
            </button>
        </div>
    );
}

export default Chat;