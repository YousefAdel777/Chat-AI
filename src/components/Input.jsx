/* eslint-disable react/prop-types */
import {useState} from "react";
import {Eye, EyeSlash} from "../icons/Icons";

const Input = ({onChange, type, name, id, label, isError, disabled, value}) => {

    const [inputType, setInputType] = useState(type);

    const toggleShowPassword = (e) => {
        e.preventDefault();
        inputType !== "password" ? setInputType("password") : setInputType("text");
    }

    return (
        <div className="relative">
            <label htmlFor={id} className="text-lg block text-black dark:text-gray-300 mb-2">{label}</label>
            <input
                autoComplete="off"
                type={inputType}
                name={name}
                id={id}
                onChange={onChange}
                className={isError ? "login-input error" : "login-input"}
                disabled={disabled}
                value={value}
            />
            {
                type === "password" &&
                <button className="absolute right-4 bottom-2.5 text-gray-600 dark:text-gray-300" onClick={toggleShowPassword}>
                    {
                        inputType === "password" ?
                        <Eye />
                        :
                        <EyeSlash />
                    }
                </button>
            } 
        </div>
    );
}

export default Input;