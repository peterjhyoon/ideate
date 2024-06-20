import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useGetProjectQuery } from "../../components/projects/projectsApiSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import defaultProjectLogo from "../../assets/images/defaultProjectLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark as faBookmarkSolid,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { useGetApplicationByUserAndProjectQuery } from "../../components/applications/applicationApiSlice";
import useAuth from "../../hooks/useAuth";

const ViewProject = () => {
    const { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);

    const redirectParam = searchParams.get("redirect");
    const keyParam = searchParams.get("key");
    const locationParam = searchParams.get("location");
    const categoryParam = searchParams.get("category");

    const { id: user } = useAuth();

    const {
        data: project,
        isLoading,
        isSuccess,
        isError,
    } = useGetProjectQuery({ id });

    // TODO: Check wether the project has been saved in backend

    const { data: application, isSuccess: foundApplication } =
        useGetApplicationByUserAndProjectQuery({ user, project: id });

    const [imageSrc, setImageSrc] = useState(defaultProjectLogo);
    const [isSaved, setIsSaved] = useState(false);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        if (foundApplication && application.active) {
            setApplied(true);
        }
    }, [foundApplication, application]);

    const onClose = () => {
        if (redirectParam === "/projects") {
            navigate(
                `/projects?key=${keyParam ? keyParam : ""}&location=${
                    locationParam ? locationParam : ""
                }&category=${categoryParam ? categoryParam : ""}`
            );
        } else {
            navigate(redirectParam);
        }
    };

    let content;

    if (isLoading) {
        content = (
            <div className="w-full h-full flex-grow flex flex-col justify-center items-center">
                <ClipLoader color="#9ca3af" />
            </div>
        );
    }

    if (isError) {
        content = (
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-gray-600">Project not found... :(</p>
            </div>
        );
    }

    if (isSuccess) {
        if (project.logo) {
            const blob = new Blob([project.logo], { type: "image/png" });
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
        }

        const onSave = () => {
            setIsSaved(!isSaved);
            // TODO: set saved in backend
            // possibly use useEffect to update isSaved
        };

        const onApply = () => {
            // TODO
        };

        console.log(project.id);

        content = (
            <div className="w-full h-full flex flex-col relative">
                {/* Header */}
                <div className="h-[10%] ps-12 pe-8 pt-3 flex justify-between items-center bg-purple-700 rounded-t-[40px]">
                    <button
                        className="text-white hover:text-gray-300 focus:outline-none ml-auto"
                        onClick={onClose}
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

                <img
                    className=" h-20 w-20 flex-shrink-0 mr-7 absolute top-8 left-16 rounded-full border border-black"
                    src={imageSrc}
                    alt="Project"
                />

                <div className="mt-14 mb-5 px-20">
                    <p className="font-bold text-3xl">{project.name}</p>
                    <div className="flex row justify-between">
                        <p className="font-bold text-md text-gray-500">
                            {project.location.state}, {project.location.country}
                        </p>
                        <p className="font-bold text-md text-gray-500">
                            {new Date(project.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col h-auto px-20 overflow-y-auto">
                    <p className="font-medium">{project.description}</p>
                </div>
                {user === project.user.id ? (
                    <button className="z-10 rounded-full bg-gray-200 w-14 h-14 absolute bottom-14 right-[296px] hover:bg-gray-300">
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="text-xl text-black"
                        />
                    </button>
                ) : (
                    <></>
                )}
                <button
                    className="z-10 rounded-full bg-gray-200 w-14 h-14 absolute bottom-14 right-56 hover:bg-gray-300"
                    onClick={onSave}
                >
                    <FontAwesomeIcon
                        icon={isSaved ? faBookmarkSolid : faBookmarkRegular}
                        className="text-xl text-black"
                    />
                </button>
                <button
                    className={`z-10 rounded-full ${
                        applied ? "bg-purple-500" : "bg-purple-700"
                    } w-32 h-14 absolute bottom-14 right-20 hover:bg-purple-500`}
                    onClick={onApply}
                    disabled={applied}
                >
                    <p className="text-white font-medium text-xl">
                        {applied ? "Applied" : "Apply"}
                    </p>
                </button>
            </div>
        );
    }

    return content;
};

export default ViewProject;
