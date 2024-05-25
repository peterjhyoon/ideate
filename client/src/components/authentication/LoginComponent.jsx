import AuthInput from "../ui/AuthInput";
import AuthButton from "../ui/AuthButton";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    const location = useLocation();
    const currentPath = location.pathname;

    const queryParams = new URLSearchParams(location.search);
    let redirect = queryParams.get('redirect');
    if (!redirect) {
        redirect = "/";
    }

    const navigate = useNavigate();

    if (currentPath.startsWith("/login")) {
        const handleSubmit = async (e) => {
            e.preventDefault();
            setEmail("");
            setPassword("");
            setErrorMessage("")
            // TODO: set error message
            // TODO: handle JWT request in backend
            // TODO: handle remember user
            navigate(redirect);
        }
    
        const onEmailChanged = (e) => setEmail(e.target.value)
        const onPasswordChanged = (e) => setPassword(e.target.value)

        return (
            <div className="bg-gray-100 container mx-auto text-center flex flex-col justify-center h-screen">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-4xl pb-10 font-bold mx-auto">Login to Your Account</h1>
                    <AuthInput id="email" 
                        placeholder={"Email"}
                        onChange={onEmailChanged}
                        value={email}
                        type={"text"}
                        styleConfig={"bg-purple-200 my-5"}
                    />
                    <AuthInput id="password" 
                        placeholder={"Password"}
                        onChange={onPasswordChanged}
                        value={password}
                        type={"password"}
                        styleConfig={"bg-purple-200 my-5"}
                    />
                    <div className="py-2" id="remember-me">
                        <label className="p-1">
                        <input type="checkbox" name="" id="" className="mr-1" />
                            Remember Me
                        </label>
                    </div>
                    <AuthButton 
                        buttonText={"Login"}
                        styleConfig={"bg-purple-500 hover:bg-purple-300 text-white"}
                    />
                </form>
                
            </div>
        )
    } else {
        const handleSubmit = (e) => {
            e.preventDefault();
            navigate(`/login?redirect=${redirect}`);
        }

        return (
            <div className="bg-gray-100 container mx-auto text-center flex flex-col justify-center h-screen">
                <h1 className="mb-10 text-4xl font-bold">Already have an account?</h1>
                <p className="border-5 font-bold text-xl mb-8">Login to explore!</p>
                <AuthButton 
                    buttonText={"Login"}
                    styleConfig={"bg-purple-500 text-white hover:bg-purple-300"}
                    onClick={handleSubmit}
                />
            </div>
        );
    }
}

export default LoginComponent;