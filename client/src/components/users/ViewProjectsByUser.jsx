import { useLocation, useNavigate } from "react-router-dom";
import defaultProjectLogo from "../../assets/images/defaultProjectLogo.png";
import { useGetProjectsByUserQuery } from "../projects/projectsApiSlice";
import ClipLoader from "react-spinners/ClipLoader";

const ViewProjectsByUser = ({ id, className }) => {
    const {
        data: projects,
        isSuccess,
        isLoading,
        isError,
    } = useGetProjectsByUserQuery({ user: id });

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
                <p className="text-gray-600">No projects found... :(</p>
            </div>
        );
    }

    if (isSuccess) {
        content = projects.map((project, index) => {
            let imageSrc = defaultProjectLogo;

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

export default ViewProjectsByUser;
