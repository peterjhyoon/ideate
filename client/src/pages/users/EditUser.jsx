import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetUserQuery } from "../../components/users/usersApiSlice";

const EditUser = () => {
    const { id } = useParams();
    // const id = "663d6e3c93612d3eb107658c";
    const { id: loginId } = useAuth();
    // const loginId = "663d6e3c93612d3eb107658c";

    const navigate = useNavigate();

    // if (loginId === "") {
    //     const redirect = location.pathname;
    //     navigate(`/login?redirect=${redirect}`)
    // } else if (loginId !== id) {
    //     navigate("/");
    // }

    const {
        data: user,
        isSuccess,
        isLoading,
        isError,
    } = useGetUserQuery({ id });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [university, setUniversity] = useState("");
    const [password, setPassword] = useState("");

    return <div>EditUser</div>;
};

export default EditUser;
