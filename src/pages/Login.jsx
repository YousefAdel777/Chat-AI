import { useState } from "react";
import {Link} from "react-router-dom";
import Input from "../components/Input";
import GoogleButton from "../components/GoogleButton";
import { Logo } from "../icons/Icons";
import {useThemeContext} from "../contexts/ThemeContext";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, googleProvider } from "../firebase/config";
import { 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    signInWithPopup 
} from "@firebase/auth";

const Login = () => {

    const {theme} = useThemeContext();
    const [loginType, setLoginType] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (loginType === "login") {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
            .catch(error => {
                setIsError(true);
                toast.error(`${error.message.slice(error.message.indexOf("/") + 1,).replaceAll(")", "")}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme,
                });
            }).finally(() => {
                setIsLoading(false);
            });
        }
        else if (loginType === "resetPassword") {
            sendPasswordResetEmail(auth, formData.email)
            .then(() => {
                toast.info('Email sent! Check your inbox', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme,
                });
                setLoginType("login");
            })
            .catch(error => {
                setIsError(true);
                toast.error(`${error.message.slice(error.message.indexOf("/") + 1,).replaceAll(")", "")}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }

    const handleChange = (e) => {
        setIsError(false);
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const signInWithGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
        .catch(error => {
            toast.error(`${error.message.slice(error.message.indexOf("/") + 1,).replaceAll(")", "")}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme,
            });
        });
    }

    return (
        <section className="login relative bg-gray-400 flex items-center justify-center min-h-[calc(100svh_-_6.5rem)] dark:bg-slate">
            <div className="container">
                <Logo className="h-24 mt-8 mx-auto mb-12 dark:fill-white" />
                <form 
                    className="flex flex-col gap-6 w-3/4 mb-4 mx-auto lg:w-1/2" 
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Input type="email" name="email" onChange={handleChange} value={formData.email} label="Email" id="email" isError={isError} disabled={isLoading} />
                    {loginType === "login" && <Input type="password" name="password" onChange={handleChange} value={formData.password} label="Password" id="password" isError={isError} disabled={isLoading} />}
                    <button className="px-3 py-2 bg-white rounded-md" type="submit">
                        {
                            isLoading ?
                            <Logo className="h-6 animate-bounce mx-auto" />
                            :
                            loginType == "login" ?
                            "Log In"
                            :
                            "Send Password Reset Email"
                        }
                    </button>
                    <GoogleButton text="Continue with Google" onClick={signInWithGoogle} />
                </form>
                <p className="text-sm text-black text-center dark:text-gray-300">Do not have an account ? <Link to="/signup" className="hover:underline">Sign Up</Link></p>
                {
                    loginType === "login" &&
                    <button className="w-full" onClick={() => setLoginType("resetPassword")}>
                        <p className="text-sm text-black text-center hover:underline dark:text-gray-300">
                            Forgot password ?
                        </p>
                    </button>
                }
            </div>
            <ToastContainer />
        </section>
    );
}

export default Login;