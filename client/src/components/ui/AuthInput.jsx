const AuthInput = ({ type, placeholder, onChange, value, styleConfig }) => {
    return (
        <div className="flex items-center">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`text-black mx-auto rounded-full py-2 px-4 w-80 focus:outline-blue-300 ${styleConfig}`}
            />
        </div>
    )
}

export default AuthInput;
