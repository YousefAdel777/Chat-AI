import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const SharedLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default SharedLayout;