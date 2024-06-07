import SearchBar from "../../components/ui/SearchBar";
import { useSearchProjectsQuery } from "../../components/projects/projectsApiSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import defaultProjectLogo from "../../assets/images/defaultProjectLogo.png";

const Projects = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation();

    const keyParam = searchParams.get("key");
    const locationParam = searchParams.get("location");
    const categoryParam = searchParams.get("category");

    const {
        data: projects,
        isLoading,
        isSuccess,
        isError,
    } = useSearchProjectsQuery({
        key: keyParam,
        location: locationParam,
        category: categoryParam,
    });

    const navigate = useNavigate();

    const onAdd = () => {
        // TODO: Open modal for adding project
    };

    let content;

    if (isLoading) {
        content = (
            <div className="w-full h-5/6 flex-grow flex flex-col justify-center items-center">
                <ClipLoader color="#9ca3af" />
            </div>
        );
    }

    if (isError) {
        content = (
            <div className="w-full h-5/6 flex justify-center items-center">
                <p className="text-gray-600">No projects found... :(</p>
            </div>
        );
    }

    if (isSuccess) {
        const mutableProjects = [...projects];

        if (keyParam == null || keyParam === "") {
            mutableProjects.reverse();
        }

        content = (
            <div
                className="overflow-y-auto"
                style={{ height: "59vh" }}
                id="proj-list"
            >
                {/* TODO: Style scrollbar */}
                {mutableProjects.map((project, key) => {
                    let imageSrc = defaultProjectLogo;

                    if (project.logo) {
                        const blob = new Blob([project.logo], {
                            type: "image/png",
                        });
                        imageSrc = URL.createObjectURL(blob);
                    }

                    return (
                        <Link
                            className="w-full mx-auto hover:bg-gray-100 ps-20 pe-14 pt-5 flex items-start"
                            to={`/projects/${project.id}?redirect=${
                                location.pathname
                            }&key=${
                                keyParam ? keyParam : ""
                            }&location=${
                                locationParam ? locationParam : ""
                            }&category=${
                                categoryParam ? categoryParam : ""
                            }`}
                            key={key}
                        >
                            <img
                                className=" h-20 flex-shrink-0 mr-7 rounded-md"
                                src={imageSrc}
                                alt="Project"
                            />
                            <div className="w-full">
                                <h2 className="text-xl font-bold">
                                    {project.name}
                                </h2>
                                <p
                                    className="text-slate-500"
                                    id="textContainer"
                                >{`${project.location.state}, ${project.location.country}`}</p>
                                <p
                                    className="line-clamp-1 break-word"
                                    id="textContainer"
                                >
                                    {project.description}
                                </p>
                                <hr className="mt-5 mx-auto" />
                            </div>
                        </Link>
                    );
                })}
                <button
                    className="z-10 rounded-full bg-purple-700 w-16 h-16 absolute bottom-20 right-20 hover:bg-purple-500"
                    onClick={onAdd}
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="text-white rounded-full h-1/2"
                    />
                </button>
            </div>
        );
    }

    return (
        <div className="py-5 h-full w-full">
            <SearchBar
                currKey={searchParams?.key}
                currLocation={searchParams?.location}
                currCategory={searchParams?.category}
            />
            <hr className="mt-5 w-5/6 mx-auto" />
            {content}
        </div>
    );
};

export default Projects;
