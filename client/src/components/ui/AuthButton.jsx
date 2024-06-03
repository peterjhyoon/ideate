const AuthButton = ({ buttonText, styleConfig, onClick }) => {
    let typeCheckedConfig = String(styleConfig);
    const buttonClassConfig = `${typeCheckedConfig} rounded-3xl min-w-4 mx-auto pt-2 pb-3 px-10 mt-5 w-40`;
    return (
        <button className={buttonClassConfig} onClick={onClick}>
            {buttonText}
        </button>
    );
};

export default AuthButton;
