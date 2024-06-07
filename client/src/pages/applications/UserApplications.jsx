import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewSaved from "../../components/users/ViewSaved";
import ViewApplied from "../../components/users/ViewApplied";
import ViewInactive from "../../components/users/ViewInactive";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const UserApplications = () => {
    const { id } = useParams();
    // const id = "663d6e3c93612d3eb107658c";
    const { id: loginId } = useAuth();
    // const loginId = "663d6e3c93612d3eb107658c";

    const location = useLocation();

    const [selected, setSelected] = useState("saved");

    let content;

    if (id !== loginId) {
        content = <p className="font-medium text-xl">404 Not Found</p>;
    } else {

        const selectedButtonClass =
            "text-white bg-purple-700 hover:bg-purple-500";
        const notSelectedClass = "hover:bg-gray-300";

        const onSavedClicked = () => {
            setSelected("saved");
        };

        const onAppliedClicked = () => {
            setSelected("applied");
        };

        const onInactiveClicked = () => {
            setSelected("inactive");
        };

        content = (
            <div
                className="container bg-white border border-black rounded-[40px] relative flex flex-col mx-5"
                style={{ height: "70vh", width: "90vh" }}
            >
                <div className=" w-full flex flex-row justify-between">
                    <p className="font-bold text-2xl mt-8 mx-12">
                        My Applications
                    </p>
                    <Link to={`/user/${id}`}>
                        <FontAwesomeIcon
                            icon={faClose}
                            className="pt-7 pe-10 text-xl text-gray-500 hover:text-gray-700"
                        />
                    </Link>
                </div>
                <div className="w-full flex flex-row mx-12 mt-3">
                    <button
                        onClick={onSavedClicked}
                        className={`${
                            selected === "saved"
                                ? selectedButtonClass
                                : notSelectedClass
                        } border border-black px-3 py-1 font-medium rounded-full`}
                    >
                        Saved
                    </button>
                    <button
                        onClick={onAppliedClicked}
                        className={`${
                            selected === "applied"
                                ? selectedButtonClass
                                : notSelectedClass
                        } ms-3 border border-black px-3 py-1 font-medium rounded-full`}
                    >
                        Applied
                    </button>
                    <button
                        onClick={onInactiveClicked}
                        className={`${
                            selected === "inactive"
                                ? selectedButtonClass
                                : notSelectedClass
                        } ms-3 border border-black px-3 py-1 font-medium rounded-full`}
                    >
                        Inactive
                    </button>
                </div>
                <hr className="mt-4 w-5/6 mx-auto" />
                {selected === "saved" ? (
                    <ViewSaved className="w-full h-[75%]" user={id} />
                ) : (
                    <></>
                )}
                {selected === "applied" ? (
                    <ViewApplied className="w-full h-[75%]" user={id} />
                ) : (
                    <></>
                )}
                {selected === "inactive" ? (
                    <ViewInactive className="w-full h-[75%]" user={id} />
                ) : (
                    <></>
                )}
            </div>
        );
    }

    return (
        <div className="w-full flex flex-grow justify-center items-center transition ease-in-out">
            {content}
        </div>
    );
};

export default UserApplications;
