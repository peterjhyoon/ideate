import { useEffect, useRef, useState } from "react";
import AuthButton from "../ui/AuthButton";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";


const SelectProfilePicture = ({ onClose, profilePicture, setProfilePicture }) => {
    const [currentProfilePicture, setCurrentProfilePicture] = useState(profilePicture)
    const [imageUrl, setImageUrl] = useState();
    const [crop, setCrop] = useState({})

    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        setImageUrl(currentProfilePicture ? URL.createObjectURL(currentProfilePicture) : defaultProfilePicture)
    }, [currentProfilePicture])

    const onSaveClicked = () => {
        // TODO: crop the profile picture
        if (defaultProfilePicture) {
            const image = imageRef.current;
            const canvas = canvasRef.current;

            const context = canvas.getContext("2d");
            if (!context) {
                console.log("Error");
            }

            const pixelCrop = convertToPixelCrop(crop, image.width, image.height);

            // const pixelRatio = window.devicePixelRatio;
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            // canvas.width = Math.floor(pixelCrop.width * scaleX * pixelRatio)
            // canvas.height = Math.floor(pixelCrop.height * scaleY * pixelRatio)

            canvas.width = Math.floor(pixelCrop.width * scaleX)
            canvas.height = Math.floor(pixelCrop.height * scaleY)

            // context.scale(pixelRatio, pixelRatio);
            context.imageSmoothQuality = "high"
            context.save();

            const cropX = pixelCrop.x * scaleX;
            const cropY = pixelCrop.y * scaleY;

            context.translate(-cropX, -cropY);
            context.drawImage(
                image,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight
            );

            context.restore();

            const dataUrl = canvas.toDataURL();

            const blob = dataURLToBlob(dataUrl);

            setProfilePicture(new File([blob], "profile_picture.png"));
        }

        onClose();
    }

    // Helper function to convert data URL to Blob
    const dataURLToBlob = (dataUrl) => {
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
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
                    unit: "%",
                    width: 50,
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
                <div className="bg-gray-300 h-96 w-full flex justify-between items-center">
                    <ReactCrop 
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
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
                            ref={imageRef}
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
            <canvas ref={canvasRef} hidden/>
        </div>
    )
}

export default SelectProfilePicture;