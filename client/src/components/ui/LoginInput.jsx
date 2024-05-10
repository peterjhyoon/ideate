function LoginInput( {input_placeholder} ) {
    return (
        <div className="flex items-center py-5">
            <input
                type="text"
                placeholder={input_placeholder}
                className="mx-auto bg-purple-200 rounded-full py-2 px-4 w-1/4 focus:outline-none focus:ring-black-500 focus:border-transparent"
            />
        </div>
    )
}

export default LoginInput;
