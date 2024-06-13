
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext";
import {MenuIcon, Logo} from "../icons/Icons"
import { useSidebarContext } from "../contexts/SidebarContext";


const Navbar = () => {

    const {user} = useAuthContext();
    const {showSidebar} = useSidebarContext();
    const {pathname} = useLocation();

    return (
        <div className="navbar h-[6.5rem] py-5 shadow-md shadow-gray-300 bg-white dark:bg-black md:sticky dark:shadow-none dark:border-b-2 dark:border-gray-600">
            <div className="container flex items-center justify-between">
                <Link to="/" className="logo">
                    <Logo className="h-16 dark:fill-white" />
                </Link>
                <div className="links text-lg flex gap-4 dark:text-gray-300">
                    {
                        !user && 
                        <>
                            <Link to="/login" className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-3 py-2">
                                Login
                            </Link>
                            <Link to="/signup" className="rounded-lg text-black dark:text-white px-3 py-2">
                                Sign Up
                            </Link>
                        </>
                    }
                    {
                        pathname === "/" &&
                        <button className="menu-icon text-gray-600 dark:text-gray-300 lg:hidden" onClick={showSidebar}> 
                            <MenuIcon />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;