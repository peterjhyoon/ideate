const AccButton = ({ buttonName, styleConfig }) => {
    let typeCheckedConfig = String(styleConfig);
    const buttonClassConfig = `${typeCheckedConfig} rounded-3xl min-w-4 mx-auto py-2 px-4 mt-5`;
    return (
        <button className={buttonClassConfig}>
            {buttonName}
        </button>
    )
}

export default AccButton;