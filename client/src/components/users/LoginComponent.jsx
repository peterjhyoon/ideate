import LoginInput from "../ui/LoginInput";
import AccButton from "./AccButtons";

const LoginComponent = () => {
    return (
        <div className="container mx-auto text-center flex flex-col justify-center h-screen">
            <h1 className="text-4xl pb-10 font-bold mx-auto">Login to Your Account</h1>
            <LoginInput id="username" 
                input_placeholder={"Email"}
            />
            <LoginInput id="password" 
                input_placeholder={"Password"}
            />
            <div className="py-2" id="remember-me">
                <label htmlFor="">
                    <input type="checkbox" name="" id="" />
                    Remember Me
                </label>
            </div>
            <AccButton 
                buttonName={"Login"}
                styleConfig={"bg-purple-500 hover:bg-purple-300"}
            />
        </div>
    )
}

export default LoginComponent;