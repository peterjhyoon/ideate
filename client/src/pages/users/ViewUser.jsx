import { useParams } from 'react-router-dom'

const ViewUser = () => {
    const { id } = useParams()

    return (
        <div>
            <h1>ID: ${id}</h1>
        </div>
    )
}

export default ViewUser;