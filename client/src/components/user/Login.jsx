import LoginInput from "../ui/LoginInput";

function Login() {
    return (
        <div className="container mx-auto text-center">
            <h1 className="text-4xl py-8 font-bold mx-auto">Login to Your Account</h1>
            <LoginInput id="username" 
                input_placeholder={"Email"}
            />
            <LoginInput id="password" 
                input_placeholder={"Password"}
            />
        </div>
    )
}

export default Login;