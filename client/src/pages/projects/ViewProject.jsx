import { useParams } from 'react-router-dom'
import { useGetProjectQuery } from '../../components/projects/projectsApiSlice'
import ClipLoader from "react-spinners/ClipLoader"

const ViewProject = () => {
    const { id } = useParams()

    const {
        data: project,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProjectQuery({ id })

    let content;

    if (isLoading) {
        content = (
            <div className="w-full h-full flex-grow flex flex-col justify-center items-center">
                <ClipLoader color="#9ca3af"/>
            </div> 
        ) 
    }

    if (isError) {
        content = (
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-gray-600">Project not found... :(</p>
            </div>
        )
    }

    if (isSuccess) {
        content = (
            <div className="w-full h-full flex justify-center items-center">
                {/* Header */}
                <div> 

                </div>

                {/* Content */}
                <div>

                </div>
            </div>
        )
    }

    return (
        <div className="w-full pt-14 bg-gray-200 flex-grow flex flex-col justify-center">
                <div className="container bg-white border border-black rounded-[40px] py-5 my-5 mx-auto my-auto" style={{ height: '70vh' }}>
                    {content}
                </div>
            </div>   
    );
}

export default ViewProject;