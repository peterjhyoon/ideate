import { useState } from 'react';
import SearchBar from "../ui/SearchBar";
import ProjectDetail from './ProjectDetail';

const dummyData = [
    {
        title: 'Software Developer',
        project_name: 'LinkedOut',
        location: 'Remote, US',
        description: 'Build the next generation of Linkedin',
    },
    {
        title: 'UX Designer',
        project_name: 'Minder',
        location: 'San Francisco, CA',
        description: 'A revolutionized dating app for monkeys',
    },
    {
        title: 'CEO',
        project_name: 'UCSD',
        location: 'San Diego, CA',
        description: 'Getting money from students!',
    },
    {
        title: 'CEO',
        project_name: 'UCSD',
        location: 'San Diego, CA',
        description: 'Getting money from students!',
    },
    {
        title: 'CEO',
        project_name: 'UCSD',
        location: 'San Diego, CA',
        description: 'Getting money from students!',
    },
];

const ProjectList = () => {

    const [selectedProject, setSelectedProject] = useState(null);

    const content = (
        <div className="w-full pt-14 bg-gray-200 flex-grow flex flex-col justify-center">
            <div className="container bg-white border border-black rounded-[40px] py-5 my-5 mx-auto my-auto" style={{ height: '70vh' }}>
                <SearchBar />
                <hr className="my-5 w-5/6 mx-auto" />
                <div className="p-4 overflow-y-scroll" style={{ height: '50vh' }} id="proj-list">
                    {dummyData.map((project, index) => (
                    <div key={index} className="mx-auto w-5/6 mb-4" onClick={() => setSelectedProject(project)}>
                        <h2 className="text-xl font-bold">{project.project_name}</h2>
                        <p>{project.description}</p>
                        <hr className="my-5 mx-auto" />
                    </div>
                    ))}
                </div>
            </div>
            {selectedProject && (
                <ProjectDetail project={selectedProject} />
            )}
        </div>   
    );

    return content;
};

export default ProjectList;