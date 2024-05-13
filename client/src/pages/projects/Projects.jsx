import SearchBar from "../../components/ui/SearchBar";
import { useSearchProjectsQuery } from "../../components/projects/projectsApiSlice"
import ClipLoader from "react-spinners/ClipLoader"
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";

const dummyData = [
    {
        title: 'Software Developer',
        name: 'LinkedOut',
        location: {state: 'Remote', country: 'US'},
        description: 'Build the next generation of Linkedin',
    },
    {
        title: 'Software Developer',
        name: 'LinkedOut',
        location: {state: 'Remote', country: 'US'},
        description: 'Build the next generation of Linkedin',
    },
    {
        title: 'Software Developer',
        name: 'LinkedOut',
        location: {state: 'Remote', country: 'US'},
        description: 'Build the next generation of Linkedin',
    },
    {
        title: 'Software Developer',
        name: 'LinkedOut',
        location: {state: 'Remote', country: 'US'},
        description: 'Build the next generation of Linkedin',
    },
    {
        title: 'Software Developer',
        name: 'LinkedOut',
        location: {state: 'Remote', country: 'US'},
        description: 'Build the next generation of Linkedin',
    },
    {
        title: 'Software Developer',
        name: 'LinkedOut',
        location: {state: 'Remote', country: 'US'},
        description: 'Build the next generation of Linkedin',
    },
];

const Projects = () => {

    let [searchParams, setSearchParams] = useSearchParams();

    const {
        data: projects,
        isLoading,
        isSuccess,
        isError,
        error
    } = useSearchProjectsQuery({ key: searchParams.get('key'), location: searchParams.get('location'), category: searchParams.get('category') });

    const navigate = useNavigate();

    let content;

    if (isLoading) {
        content = (
            <div className="w-full pt-14 bg-gray-200 flex-grow flex flex-col justify-center items-center">
                <ClipLoader color={"#000"}/>
            </div> 
        ) 
    }

    if (isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {

        content = (
            <div className="w-full pt-14 bg-gray-200 flex-grow flex flex-col justify-center">
                <div className="container bg-white border border-black rounded-[40px] py-5 my-5 mx-auto my-auto" style={{ height: '70vh' }}>
                    <SearchBar currKey={searchParams?.key} currLocation={searchParams?.location} currCategory={searchParams?.category} />
                    <hr className="mt-5 w-5/6 mx-auto" />
                    {/* TODO: Style scrollbar */}
                    <div className="overflow-y-auto" style={{ height: '50vh' }} id="proj-list">
                        {projects.map((project, index) => (
                            <div key={index} className="w-full mx-auto hover:bg-gray-100 ps-20 pe-14 pt-5" onClick={() => navigate(`/projects/${project.id}`)}>
                                <h2 className="text-xl font-bold">{project.name}</h2>
                                <p className="text-slate-500" id="textContainer">{`${project.location.state}, ${project.location.country}`}</p>
                                <p className="line-clamp-1 break-word" id="textContainer">{project.description}</p>
                                <hr className="mt-5 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* {selectedProject && (
                    <ProjectDetail project={selectedProject} />
                )} */}
            </div>   
        );
    }   

    return content;
};

export default Projects;