import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ currKey, currLocation, currCategory }) => {
    let [searchParams, setSearchParams] = useSearchParams();

    const [key, setKey] = useState(
        searchParams.get("key") ? searchParams.get("key") : ""
    );

    const handleSearch = () => {
        setSearchParams({ key });
        // window.location.reload();
    };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            setSearchParams({ key });
            // window.location.reload();
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex mx-auto border border-gray-800 rounded-full py-2 px-4 w-7/12">
                <button
                    title="Categories"
                    className="justify-end hover:bg-gray-100 hover:border-gray-100 rounded-full w-7 rounded-full"
                >
                    <FontAwesomeIcon
                        icon={faSliders}
                        className="text-purple-700"
                    />
                </button>

                <div className="h-6 border border-purple-700 mx-2" />

                <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Find Projects"
                    className="w-full focus:outline-none focus:border-transparent"
                    onKeyDown={handleEnter}
                />

                <div className="h-6 border border-purple-700 mx-2" />

                <button
                    title="Search"
                    onClick={handleSearch}
                    className="justify-end hover:bg-gray-100 hover:border-gray-100 rounded-full w-7 rounded-full"
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="text-purple-700"
                    />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
