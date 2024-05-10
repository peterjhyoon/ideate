// Would lead to Signup Page
import AccButton from "./AccButtons";

function CreateAcc() {
    return (
        <div className="bg-purple-700 container mx-auto text-center text-white flex flex-col justify-center h-screen">
            <h1 className="mb-10 text-4xl font-bold">New to Ideate?</h1>
            <p className="border-5 font-bold text-xl mb-10">Sign up to learn about the  best projects!</p>
            <AccButton 
                buttonName={"Sign Up"}
                styleConfig={"bg-white text-black hover:bg-purple-300"}
            />
        </div>
    )
}

export default CreateAcc;