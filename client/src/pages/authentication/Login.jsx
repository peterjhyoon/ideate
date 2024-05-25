import { Link } from 'react-router-dom';
import LoginComponent from '../../components/authentication/LoginComponent';
import SignUpComponent from '../../components/authentication/SignUpComponent';

const Login = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:h-screen w-full h-screen">
            <div className="lg:w-2/3 lg:h-screen w-full" id="login-comp">
                <LoginComponent />
            </div>
            <div className="lg:w-1/3 w-full h-screen" id="sign-up-comp">
                <SignUpComponent />
            </div>
        </div>
    );
}

export default Login;