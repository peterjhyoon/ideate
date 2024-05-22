import LoginComponent from '../../components/authentication/LoginComponent';
import SignUpComponent from '../../components/authentication/SignUpComponent';
import SelectProfilePicture from "../../components/authentication/SelectProfilePicture";
import { useState } from "react";
//import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png"

const SignUp = () => {
    const [openEditor, setOpenEditor] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null); // file datatype only, store using gridfs

    const handleOpenEditor = (e) => setOpenEditor(true);

    // if (openEditor) {
    //     return <SelectProfilePicture />;
    // }

    return (
        <div className="flex flex-col lg:flex-row lg:h-screen w-full h-screen">
            <div className="lg:w-1/3 h-screen" id="login-comp">
                <LoginComponent />
            </div>
            <div className="lg:w-2/3 lg:h-screen w-full" id="sign-up-comp">
                <SignUpComponent handleOpenEditor={handleOpenEditor} profilePicture={profilePicture}/>
            </div>
            {openEditor && <SelectProfilePicture onClose={() => {setOpenEditor(false)}} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>}
        </div>
    );
}

export default SignUp;