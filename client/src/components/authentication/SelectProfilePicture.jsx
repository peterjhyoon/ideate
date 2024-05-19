import { useRef, useState } from "react";
import AuthButton from "../ui/AuthButton";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";


const SelectProfilePicture = ({ onClose, profilePicture, setProfilePicture }) => {
    const [currentProfilePicture, setCurrentProfilePicture] = useState(profilePicture)

    const fileInputRef = useRef(null);

    const onSaveClicked = () => {
        // TODO: crop the profile picture
        setProfilePicture(currentProfilePicture);
        onClose();
    }

    const onUploadClicked = () => {
        fileInputRef.current.click();
    }
    
    const onFileChanged = (e) => {
        if (e.target.files[0]) {
            setCurrentProfilePicture(e.target.files[0]);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-3xl overflow-hidden transform transition-all lg:h-2/3 lg:w-1/2 sm:h-1/2 sm:w-2/3">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <p className="text-2xl leading-6 font-medium">Profile Picture</p>
                    <button
                        onClick={onClose}
                        className="text-purple-600 hover:text-purple-400 focus:outline-none ml-auto"
                    >
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="bg-gray-300 h-2/3 flex justify-between items-center">
                    <img 
                        className="h-full mx-auto"
                        src={currentProfilePicture ? URL.createObjectURL(currentProfilePicture) : defaultProfilePicture}
                        alt="Profile"
                    />
                </div>
                <div className="flex flex-column flex-grow justify-center items-center space-x-20 sm:pt-4 lg:pt-12">
                    <div>
                        <AuthButton 
                            buttonText={"Save"} 
                            styleConfig={"bg-purple-700 hover:bg-purple-300 text-white"}
                            onClick={onSaveClicked}
                        />
                    </div>
                    <div>
                        <input type="file" id="fileInput" ref={fileInputRef} className="hidden" onChange={onFileChanged} />
                        <AuthButton 
                            buttonText={"Upload"} 
                            styleConfig={"bg-purple-700 hover:bg-purple-300 text-white"}
                            onClick={onUploadClicked}
                        />
                    </div>
                </div>
            </div>
            <script>
                
            </script>
        </div>
    )
}

export default SelectProfilePicture;