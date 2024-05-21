import { useEffect, useRef, useState } from "react";
import AuthButton from "../ui/AuthButton";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";


const SelectProfilePicture = ({ onClose, profilePicture, setProfilePicture }) => {
    const [currentProfilePicture, setCurrentProfilePicture] = useState(profilePicture)
    const [imageUrl, setImageUrl] = useState();
    const [crop, setCrop] = useState({})

    const fileInputRef = useRef(null);

    useEffect(() => {
        setImageUrl(currentProfilePicture ? URL.createObjectURL(currentProfilePicture) : defaultProfilePicture)
    }, [currentProfilePicture])

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
    const onImageLoad = (e) => {
        if (currentProfilePicture) {
            const {width, height} = e.currentTarget;
            const crop = makeAspectCrop(
                {
                    unit: "px",
                    width: 150,
                },
                1,
                width,
                height
            )
            const centeredCrop = centerCrop(crop, width, height);
            setCrop(centeredCrop);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-3xl overflow-hidden transform transition-all h-[34rem] w-[40rem]">
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
                <div className="bg-gray-300 h-96 flex justify-between items-center">
                    <ReactCrop 
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
                        circularCrop
                        keepSelection
                        aspect={1}
                        minWidth={150}
                        className="h-96 mx-auto"
                        disabled={!currentProfilePicture}
                    >
                        <img 
                            className="mx-auto h-96 "
                            src={imageUrl}
                            alt="Profile"
                            onLoad={onImageLoad} 
                        />
                    </ReactCrop>
                </div>
                <div className="flex flex-column flex-grow justify-center items-center space-x-20 pt-2">
                    <div>
                        <AuthButton 
                            buttonText={"Save"} 
                            styleConfig={"bg-purple-700 hover:bg-purple-300 text-white"}
                            onClick={onSaveClicked}
                        />
                    </div>
                    <div>
                        <input type="file" id="fileInput" ref={fileInputRef} className="hidden" onChange={onFileChanged} accept="image/*" />
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