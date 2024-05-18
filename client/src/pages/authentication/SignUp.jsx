import LoginComponent from '../../components/users/LoginComponent';
import SignUpComponent from '../../components/users/SignUpComponent';

const SignUp = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:h-screen w-full h-screen">
            <div className="lg:w-2/3 lg:h-screen w-full" id="login-comp">
                <LoginComponent />
            </div>
            <div className="lg:w-1/3 w-full h-screen" id="create-acc-comp">
                <SignUpComponent />
            </div>
        </div>
    );
}

export default SignUp;