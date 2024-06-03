import { Outlet } from "react-router-dom";

const ProjectsLayout = () => {
    return (
        <div className="w-full pt-14 bg-gray-200 flex-grow flex flex-col justify-center">
            <div
                className="lg:w-[62%] container bg-white border border-black rounded-[40px] my-5 mx-auto my-auto relative"
                style={{ height: "70vh" }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default ProjectsLayout;
