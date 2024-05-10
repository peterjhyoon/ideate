import Login from "../components/user/Login";
import CreateAcc from "../components/user/CreateAcc";

function Accounts() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-2/3" id="login-comp">
                <Login />
            </div>
            <div className="w-1/3 bg-purple-700 text-white" id="create-acc-comp">
                {/* add createacc comp here */}
            </div>
        </div>
    )
}

export default Accounts;