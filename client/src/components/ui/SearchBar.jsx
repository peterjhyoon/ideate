const SearchBar = () => {
    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder="Find Projects"
                className="mx-auto border border-gray-800 rounded-full py-2 px-4 w-1/2 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
            />
        </div>
    )
}

export default SearchBar;
