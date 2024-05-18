import { useParams } from 'react-router-dom'

const ViewProject = () => {
    const { id } = useParams()

    return (
        <div>
            <h1>ID: ${id}</h1>
        </div>
    )
}

export default ViewProject;