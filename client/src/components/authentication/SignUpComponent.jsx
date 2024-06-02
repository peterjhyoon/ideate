// Would lead to Signup Page
import AuthButton from "../ui/AuthButton";
import AuthInput from "../ui/AuthInput";
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import { useAddNewUserMutation } from "../users/usersApiSlice";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Password must have a lowercase character, an uppercase character, a special character, a digit, and at least 8 characters
// const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const NAME_REGEX = /^[a-zA-Z]+$/

const MARGIN = "mb-8"


const SignUpComponent = ({ handleOpenEditor, profilePicture }) => {
    const [addNewUser, {
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

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

    const [emailClass, setEmailClass] = useState(MARGIN);
    const [passwordClass, setPasswordClass] = useState(MARGIN);
    const [confirmPasswordClass, setConfirmPasswordClass] = useState(MARGIN);
    const [firstNameClass, setFirstNameClass] = useState(MARGIN);
    const [lastNameClass, setLastNameClass] = useState(MARGIN);

    const emailErrMsg = useRef();
    const passwordErrMsg = useRef();
    const firstNameErrMsg = useRef();
    const lastNameErrMsg = useRef();

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
        if (emailErrMsg?.current) {
            emailErrMsg.current.style.display = "none";
            emailErrMsg.current.textContent = "";
        }
    }, [email])

    useEffect(() => {
        setValidPassword(password.length >= 8 && password === confirmPassword);
        if (passwordErrMsg?.current) {
            passwordErrMsg.current.style.display = "none";
            passwordErrMsg.current.textContent = "";
        }
    }, [password, confirmPassword])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
        if (firstNameErrMsg?.current) {
            firstNameErrMsg.current.style.display = "none";
            firstNameErrMsg.current.textContent = "";
        }
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
        if (lastNameErrMsg?.current) {
            lastNameErrMsg.current.style.display = "none";
            lastNameErrMsg.current.textContent = "";
        }
    }, [lastName])

    useEffect(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUniversity("");
        setFirstName("");
        setLastName("");

        setEmailClass(MARGIN);
        setPasswordClass(MARGIN);
        setConfirmPasswordClass(MARGIN)
        setFirstNameClass(MARGIN);
        setLastNameClass(MARGIN);

        if (isSuccess) {
            navigate(`/login?redirect=${redirect}`)
        }
    }, [isSuccess, navigate, redirect])

    useEffect(() => {
        if (isError) {
            if (error.status === 409) {
                emailErrMsg.current.textContent = "User with this email already exists. ";
            } else {
                console.log("ERROR");
            }
        }
    }, [isError, error])

    useEffect(() => {
        setImageUrl(profilePicture ? URL.createObjectURL(profilePicture) : defaultProfilePicture)
    }, [profilePicture])

    const canSignUp = [validEmail, validPassword, validFirstName, validLastName].every(Boolean);

    if (currentPath.startsWith("/signup")) {
        const onEmailChanged = e => {
            setEmail(e.target.value);
            setEmailClass(MARGIN);
        }

        const onPasswordChanged = e => {
            setPassword(e.target.value);
            setPasswordClass(MARGIN);
        }

        const onConfirmPasswordChanged = e => {
            setConfirmPassword(e.target.value);
            setPasswordClass(MARGIN);
            setConfirmPasswordClass(MARGIN)
        }

        const onFirstNameChanged = e => {
            setFirstName(e.target.value);
            setFirstNameClass(MARGIN);
        }

        const onLastNameChanged = e => {
            setLastName(e.target.value);
            setLastNameClass(MARGIN);
        }

        const onUniversityChanged = e => setUniversity(e.target.value);

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (canSignUp) {
                let user = { email, firstName, lastName, password};
                if (university) {
                    user.university = university;
                }
                if (profilePicture) {
                    user.profilePicture = profilePicture.buffer;
                }

                // Submit RTK query to create user
                addNewUser(user);
            } else { // Display error messages
                if (!validEmail) {
                    setEmailClass("mb-none outline outline-2 outline-red-500");
                    emailErrMsg.current.style.display = "block";
                    if (email.length === 0) {
                        emailErrMsg.current.textContent = "Please enter your email address.";
                    } else {
                        emailErrMsg.current.textContent = "Please a valid email address.";
                    }
                }
                if (!validFirstName) {
                    setFirstNameClass("mb-none outline outline-2 outline-red-500");
                    firstNameErrMsg.current.style.display = "block";
                    if (firstName.length === 0) {
                        firstNameErrMsg.current.textContent = "Please enter your first name.";
                    } else {
                        firstNameErrMsg.current.textContent = "First name must only contain letters.";
                    }
                }
                if (!validLastName) {
                    setLastNameClass("mb-none outline outline-2 outline-red-500");
                    lastNameErrMsg.current.style.display = "block";
                    if (lastName.length === 0) {
                        lastNameErrMsg.current.textContent = "Please enter your last name.";
                    } else {
                        lastNameErrMsg.current.textContent = "Last name must only contain letters.";
                    }
                }
                if (!validPassword) {
                    setPasswordClass("mb-none outline outline-2 outline-red-500");
                    setConfirmPasswordClass("mb-8 outline outline-2 outline-red-500");
                    passwordErrMsg.current.style.display = "block";
                    if (password.length === 0) {
                        passwordErrMsg.current.textContent = "Please enter a password. ";
                    } else if (password.length < 8) {
                        passwordErrMsg.current.textContent = "Password must be at least 8 characters. ";
                    } else if (password !== confirmPassword) {
                        passwordErrMsg.current.textContent = "Passwords do not match. ";
                    }
                }
            }
        }
        
        return (
            <div className="bg-purple-700 container mx-auto text-center flex flex-col justify-center h-screen">
                <h1 className="text-white text-4xl pb-10 font-bold mx-auto">Sign Up for a New Account</h1>
                <div className="flex flex-column justify-content-center align-items-center mb-8">
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
                        styleConfig={emailClass}
                    />
                    <p className="text-red-500 mb-2 text-s" ref={emailErrMsg} />
                    <AuthInput id="firstName" 
                        placeholder={"First Name"}
                        onChange={onFirstNameChanged}
                        value={firstName}
                        type={"text"}
                        styleConfig={firstNameClass}
                    />
                    <p className="text-red-500 mb-2 text-s" ref={firstNameErrMsg} />
                    <AuthInput id="lastName" 
                        placeholder={"Last Name"}
                        onChange={onLastNameChanged}
                        value={lastName}
                        type={"text"}
                        styleConfig={lastNameClass}
                    />
                    <p className="text-red-500 mb-2 text-s" ref={lastNameErrMsg} />
                    <AuthInput id="university" 
                        placeholder={"University (Optional)"}
                        onChange={onUniversityChanged}
                        value={university}
                        type={"text"}
                        styleConfig={MARGIN}
                    />
                    <AuthInput id="password" 
                        placeholder={"Password"}
                        onChange={onPasswordChanged}
                        value={password}
                        type={"password"}
                        styleConfig={passwordClass}
                    />
                    <p className="text-red-500 mb-2 text-s" ref={passwordErrMsg} />
                    <AuthInput id="confirmPassword" 
                        placeholder={"Confirm Password"}
                        onChange={onConfirmPasswordChanged}
                        value={confirmPassword}
                        type={"password"}
                        styleConfig={confirmPasswordClass}
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