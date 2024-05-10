import { Link } from 'react-router-dom';
import Login from "../components/user/Login";
import CreateAcc from "../components/user/CreateAcc";

function Accounts() {
    return (
        <div className="flex flex-col lg:flex-row lg:h-screen w-full h-screen">
            <div className="lg:w-2/3 lg:h-screen w-full" id="login-comp">
                <Login />
            </div>
            <div className="lg:w-1/3 w-full h-screen" id="create-acc-comp">
                <CreateAcc />
            </div>
        </div>
    )
}

export default Accounts;