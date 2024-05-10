
const ProjectDetail = ({ project, onClose }) => {
    return (
        <div className="container border border-black rounded-full">
            <button onClick={onClose}>Close</button> {/* Close button */}
            <h2>{project.title}</h2>
            <p><strong>Team:</strong> {project.project_name}</p>
            <p><strong>Location:</strong> {project.location}</p>
            <p><strong>Description:</strong> {project.description}</p>
        </div>
    )
}

export default ProjectDetail;