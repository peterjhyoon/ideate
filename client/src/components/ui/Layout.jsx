import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    if (currentPath.startsWith("/login") || currentPath.startsWith("/signup")) {
        return (
            <>
                <Header />
                <Outlet />
            </>
        );
    } else {
        return (
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
        );
    }
};
export default Layout;
