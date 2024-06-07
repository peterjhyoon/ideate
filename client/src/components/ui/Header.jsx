import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import { useState } from "react";

const Header = () => {
    const { id, name, profilePicture } = useAuth();
    // const id = "";
    // const profilePicture = null;
    // const name = "";

    const [imageSrc, setImageSrc] = useState(defaultProfilePicture);

    const location = useLocation();

    let content;

    if (id === "") {
        const redirect = location.pathname;

        content = (
            <Link
                className="mt-3 w-20 h-10 bg-purple-700 hover:bg-purple-500 rounded-xl text-white font-medium flex items-center justify-center"
                to={`/login?redirect=${redirect}`}
            >
                Login
            </Link>
        );
    } else {
        if (profilePicture) {
            setImageSrc(profilePicture);
        }

        content = (
            <Link className="py-3" to={`/user/${id}`}>
                <div className="flex flex-row items-center hover:text-gray-400">
                    <p className="pe-3">{name}</p>
                    <img className="h-10" src={imageSrc} alt="Profile" />
                </div>
            </Link>
        );
    }

    return (
        <nav className="bg-white text-black inset-x-0 top-0 fixed z-20">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className="font-serif text-purple-700 text-4xl font-bold py-2 me-4"
                    >
                        Ideate
                    </Link>
                    <Link to="/" className="hover:text-gray-400 py-5">
                        Home
                    </Link>
                    <Link to="/projects" className="hover:text-gray-400 py-5">
                        Projects
                    </Link>
                    <Link to="/social" className="hover:text-gray-400 py-5">
                        Social
                    </Link>
                </div>
                <div className="flex flex-row">{content}</div>
            </div>
        </nav>
    );
};

export default Header;
