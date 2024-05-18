
const ProjectDetail = ({ project }) => {
    return (
        <div className="container border border-black rounded-full bg-white mx-auto py-5">
            {/* <button onClick={onClose}>Close</button> Close button */}
            <h2 className="font-bold">{project.title}</h2>
            <p><strong>Team:</strong> {project.project_name}</p>
            <p><strong>Location:</strong> {project.location}</p>
            <p><strong>Description:</strong> {project.description}</p>
        </div>
    )
};

export default ProjectDetail;