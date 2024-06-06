import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../components/users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import defaultProfilePicture from "../../assets/images/defaultProfilePicture.png";
import ViewProjectsByUser from "../../components/users/ViewProjectsByUser";
import ViewSaved from "./ViewSaved";
import ViewApplied from "./ViewApplied";
import ViewInactive from "./ViewInactive";

const ViewUser = () => {
    // const { id } = useParams();
    const id = "663d6e3c93612d3eb107658c";
    const { id: loginId } = useAuth();
    // const loginId = "663d6e3c93612d3eb107658c";

    const navigate = useNavigate();
    const location = useLocation();

    // Redirection, uncomment after login functionality is completed
    // if (loginId === "") {
    //     const redirect = location.pathname;
    //     navigate(`/login?redirect=${redirect}`)
    // }

    const {
        data: user,
        isSuccess,
        isLoading,
        isError,
    } = useGetUserQuery({ id });

    const [imageUrl, setImageUrl] = useState(defaultProfilePicture);
    const [selected, setSelected] = useState("saved");

    let content;

    if (isLoading) {
        content = (
            <div className="w-full h-full flex-grow flex flex-col justify-center items-center">
                <ClipLoader color="#9ca3af" />
            </div>
        );
    }

    if (isError) {
        // Redirect to 404 not found
        navigate("/notfound");
    }

    if (isSuccess) {
        if (id !== loginId) {
            // Viewing other people's profile
            content = (
                <div className="w-full h-full flex flex-row justify-center py-20">
                    <div
                        className="container bg-white border border-black rounded-[40px] relative flex flex-col items-center mx-5"
                        style={{ height: "60vh", width: "70vh" }}
                    >
                        <div className="w-full h-1/5 bg-purple-700 rounded-t-[40px]"></div>
                        <img
                            className="rounded-full h-60 w-60 my-8 border border-black absolute top-20"
                            src={imageUrl}
                            alt="Profile"
                        />
                        <p className="font-bold text-3xl mt-60 mb-3">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="font-medium text-lg my-2 text-gray-500">
                            {user.email}
                        </p>
                        <p className="font-medium text-lg my-2 text-gray-500">
                            {user.university}
                        </p>
                    </div>
                    <div className="sm:hidden lg:flex flex flex-col h-[70vh] w-[40vh] bg-white rounded-[40px] mx-5 border border-black">
                        <p className="font-bold text-2xl mt-8 mx-12">
                            {user.firstName}'s Projects
                        </p>
                        <hr className="mt-5 w-5/6 mx-auto" />
                        <ViewProjectsByUser
                            id={id}
                            className="w-full h-5/6 px-3"
                        />
                    </div>
                </div>
            );
        } else {
            const selectedButtonClass =
                "text-white bg-purple-700 hover:bg-purple-500";
            const notSelectedClass = "hover:bg-gray-300";

            const onSavedClicked = () => {
                setSelected("saved");
            };

            const onAppliedClicked = () => {
                setSelected("applied");
            };

            const onInactiveClicked = () => {
                setSelected("inactive");
            };

            // Viewing own profile
            content = (
                <div className="w-full h-full flex flex-row justify-center py-20">
                    <div className="flex flex-col">
                        <div
                            className="container bg-white border border-black rounded-[40px] relative flex flex-col items-center mx-5"
                            style={{ height: "60vh", width: "70vh" }}
                        >
                            <div className="w-full h-1/5 bg-purple-700 rounded-t-[40px]"></div>
                            <img
                                className="rounded-full h-60 w-60 my-8 border border-black absolute top-20"
                                src={imageUrl}
                                alt="Profile"
                            />
                            <p className="font-bold text-3xl mt-60 mb-3">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="font-medium text-lg my-2 text-gray-500">
                                {user.email}
                            </p>
                            <p className="font-medium text-lg my-2 text-gray-500">
                                {user.university}
                            </p>
                        </div>

                        <div
                            className="container bg-white border border-black rounded-[40px] mt-10 relative flex flex-col mx-5"
                            style={{ height: "60vh", width: "70vh" }}
                        >
                            <p className="font-bold text-2xl mt-8 mx-12">
                                My Applications
                            </p>
                            <div className="w-full flex flex-row mx-12 mt-3">
                                <button
                                    onClick={onSavedClicked}
                                    className={`${
                                        selected === "saved"
                                            ? selectedButtonClass
                                            : notSelectedClass
                                    } border border-black px-3 py-1 font-medium rounded-full`}
                                >
                                    Saved
                                </button>
                                <button
                                    onClick={onAppliedClicked}
                                    className={`${
                                        selected === "applied"
                                            ? selectedButtonClass
                                            : notSelectedClass
                                    } ms-3 border border-black px-3 py-1 font-medium rounded-full`}
                                >
                                    Applied
                                </button>
                                <button
                                    onClick={onInactiveClicked}
                                    className={`${
                                        selected === "inactive"
                                            ? selectedButtonClass
                                            : notSelectedClass
                                    } ms-3 border border-black px-3 py-1 font-medium rounded-full`}
                                >
                                    Inactive
                                </button>
                            </div>
                            <hr className="mt-4 w-5/6 mx-auto" />
                            {selected === "saved" ? (
                                <ViewSaved className="w-full h-[75%]" />
                            ) : (
                                <></>
                            )}
                            {selected === "applied" ? (
                                <ViewApplied className="w-full h-[75%]" />
                            ) : (
                                <></>
                            )}
                            {selected === "inactive" ? (
                                <ViewInactive className="w-full h-[75%]" />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="sm:hidden lg:flex flex flex-col h-[70vh] w-[40vh] bg-white rounded-[40px] mx-5 border border-black">
                            <p className="font-bold text-2xl mt-8 mx-12">
                                My Projects
                            </p>
                            <hr className="mt-5 w-5/6 mx-auto" />
                            <ViewProjectsByUser
                                id={id}
                                className="w-full h-5/6 px-3"
                            />
                        </div>
                        {/* <div className="sm:hidden lg:flex flex flex-col h-[70vh] w-[40vh] bg-white rounded-[40px] mx-5 border border-black mt-10">
                            <p className="font-bold text-2xl mt-8 mx-12">
                                Saved Projects
                            </p>
                            <hr className="mt-5 w-5/6 mx-auto" />
                        </div> */}
                    </div>
                </div>
            );
        }
    }

    return content;
};

export default ViewUser;
