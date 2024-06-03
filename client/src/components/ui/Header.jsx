import { Link } from "react-router-dom";

const Header = () => {
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
                <div className="flex py-5">
                    <Link to="/profile" className="hover:text-gray-400">
                        User Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
