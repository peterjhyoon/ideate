// Would lead to Signup Page
import AuthButton from "../ui/AuthButton";
import AuthInput from "../ui/AuthInput";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Password must have a lowercase character, an uppercase character, a special character, a digit, and at least 8 characters
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const NAME_REGEX = /^[a-zA-Z]+$/


const SignUpComponent = ({ handleOpenEditor, profilePicture }) => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [university, setUniversity] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imageUrl, setImageUrl] = useState();

    const location = useLocation();
    const currentPath = location.pathname;

    const queryParams = new URLSearchParams(location.search);
    let redirect = queryParams.get('redirect');
    if (!redirect) {
        redirect = "/";
    }

    const navigate = useNavigate();

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password) && password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setFirstName("")
        setLastName("")
    }, [navigate])

    useEffect(() => {
        setImageUrl(profilePicture ? URL.createObjectURL(new File([profilePicture], "profile_picture.png")) : defaultProfilePicture)
    }, [profilePicture])

    const canSignUp = [validEmail, validPassword, validFirstName, validLastName].every(Boolean);

    if (currentPath.startsWith("/signup")) {
        const onEmailChanged = e => setEmail(e.target.value);
        const onPasswordChanged = e => setPassword(e.target.value);
        const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value);
        const onFirstNameChanged = e => setFirstName(e.target.value);
        const onLastNameChanged = e => setLastName(e.target.value);
        const onUniversityChanged = e => setUniversity(e.target.value);

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (canSignUp) {
                // TODO: create account in backend
                navigate(`/login?redirect=${redirect}`)
            } else {
                // TODO: display error message
            }
        }

        const inputClass = "my-3"
        
        return (
            <div className="bg-purple-700 container mx-auto text-center flex flex-col justify-center h-screen">
                <h1 className="text-white text-4xl pb-10 font-bold mx-auto">Sign Up for a New Account</h1>
                <div className="flex flex-column justify-content-center align-items-center mb-5">
                    <button 
                        className="w-28 h-28 mx-auto rounded-full border-4 border-purple-700 hover:border-blue-300"
                        onClick={handleOpenEditor}
                    >
                        <img 
                            className="rounded-full h-full w-full"
                            src={imageUrl}
                            alt="Profile"
                        />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <AuthInput id="email" 
                        placeholder={"Email"}
                        onChange={onEmailChanged}
                        value={email}
                        type={"text"}
                        styleConfig={inputClass}
                    />
                    <AuthInput id="firstName" 
                        placeholder={"First Name"}
                        onChange={onFirstNameChanged}
                        value={firstName}
                        type={"text"}
                        styleConfig={inputClass}
                    />
                    <AuthInput id="lastName" 
                        placeholder={"Last Name"}
                        onChange={onLastNameChanged}
                        value={lastName}
                        type={"text"}
                        styleConfig={inputClass}
                    />
                    <AuthInput id="university" 
                        placeholder={"University (Optional)"}
                        onChange={onUniversityChanged}
                        value={university}
                        type={"text"}
                        styleConfig={inputClass}
                    />
                    <AuthInput id="password" 
                        placeholder={"Password"}
                        onChange={onPasswordChanged}
                        value={password}
                        type={"password"}
                        styleConfig={inputClass}
                    />
                    <AuthInput id="confirmPassword" 
                        placeholder={"Confirm Password"}
                        onChange={onConfirmPasswordChanged}
                        value={confirmPassword}
                        type={"password"}
                        styleConfig={inputClass}
                    />
                    <AuthButton 
                        buttonText={"Sign Up"}
                        styleConfig={"bg-white hover:bg-purple-300 text-black"}
                    />
                </form>                
            </div>
        )
    } else {
        const handleSubmit = (e) => {
            e.preventDefault();
            navigate(`/signup?redirect=${redirect}`);
        }

        return (
            <div className="bg-purple-700 container mx-auto text-center text-white flex flex-col justify-center h-screen">
                <h1 className="mb-10 text-4xl font-bold">New to Ideate?</h1>
                <p className="border-5 font-bold text-xl mb-10">Sign up to learn about the best projects!</p>
                <AuthButton 
                    buttonText={"Sign Up"}
                    styleConfig={"bg-white text-black hover:bg-purple-300"}
                    onClick={handleSubmit}
                />
            </div>
        );
    }
}

export default SignUpComponent;