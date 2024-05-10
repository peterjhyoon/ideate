import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white text-black py-5 inset-x-0 top-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                    <Link to="/social" className="hover:text-gray-400">Social</Link>
                    <Link to="/projects" className="hover:text-gray-400">Projects</Link>
                </div>
                <div className="flex items-center">
                    <Link to="/profile" className="hover:text-gray-400">
                        User Profile
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;