import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
    const { id, email, profilePicture } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    let content;

    if (id === "") {
        const redirect = location.pathname;

        const onLoginClicked = () => {
            navigate(`/login?redirect=${redirect}`);
        };

        content = (
            <button
                className="mt-3 w-20 h-10 bg-purple-700 hover:bg-purple-500 rounded-xl text-white font-medium"
                onClick={onLoginClicked}
            >
                Login
            </button>
        );
    } else {
        content = (
            <button>
                <div>
                    <p></p>
                    <img />
                </div>
            </button>
        );
    }

    return (
        <nav className="bg-white text-black inset-x-0 top-0 fixed">
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
                <div className="flex">{content}</div>
            </div>
        </nav>
    );
};

export default Header;
