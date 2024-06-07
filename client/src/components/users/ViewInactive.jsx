import React from "react";
import { useGetApplicationByUserQuery } from "../applications/applicationApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import defaultProjectLogo from "../../assets/images/defaultProjectLogo.png";

const ViewInactive = ({ user, key = "", className }) => {
    const {
        data: applications,
        isLoading,
        isError,
        isSuccess,
    } = useGetApplicationByUserQuery({ user, key });

    const navigate = useNavigate();
    const location = useLocation();

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
                <p className="text-gray-600">
                    No inactive applications found... :(
                </p>
            </div>
        );
    }

    if (isSuccess) {
        if (key === "") {
            // reverse applications to display newest on top if no key provided
            applications.reverse();
        }

        const inactiveApplications = applications.filter(
            (application) => !application.active
        );

        content = inactiveApplications.map((application, index) => {
            let imageSrc = defaultProjectLogo;

            const project = application.project;

            if (project.logo) {
                const blob = new Blob([project.logo], {
                    type: "image/png",
                });
                imageSrc = URL.createObjectURL(blob);
            }

            return (
                <div
                    className="w-full mx-auto hover:bg-gray-100 ps-5 pe-3 pt-3 flex items-start"
                    onClick={() =>
                        navigate(
                            `/projects/${project.id}?redirect=${location.pathname}`
                        )
                    }
                    key={index}
                >
                    <img
                        className=" h-16 flex-shrink-0 mr-7 rounded-md"
                        src={imageSrc}
                        alt="Project"
                    />
                    <div className="w-full pt-2">
                        <h2 className="text-xl font-bold">{project.name}</h2>
                        <p
                            className="text-slate-500"
                            id="textContainer"
                        >{`${project.location.state}, ${project.location.country}`}</p>
                        <hr className="mt-5 mx-auto" />
                    </div>
                </div>
            );
        });
    }

    return <div className={`${className} overflow-y-auto`}>{content}</div>;
};

export default ViewInactive;
