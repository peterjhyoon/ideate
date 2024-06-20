import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const NAME_REGEX = /^[a-zA-Z]+$/;

const EditUserModal = ({ setEditUser, firstName, lastName, university, description }) => {
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newUniversity, setNewUniversity] = useState(university);
    const [newDescription, setNewDescription] = useState(description);

    const onClose = () => {
        setEditUser(false);
        document.body.style.overflow = "auto";
    };

    const onFirstNameChanged = (e) => {
        setNewFirstName(e.target.value);
    };

    const onLastNameChanged = (e) => {
        setNewLastName(e.target.value);
    };

    const onUniversityChanged = (e) => {
        setNewUniversity(e.target.value);
    };

    const onDescriptionChanged = (e) => {
        setNewDescription(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // TODO: Check for errors and update users
        if (newFirstName === "" || !NAME_REGEX.test(newFirstName)) {
            return;
        }

        if (newLastName === "" || !NAME_REGEX.test(newLastName)) {
            return;
        }

        if (newUniversity === "" || !NAME_REGEX.test(newUniversity)) {
            return;
        }

        onClose();
    };

    return (
        <div className="z-50 top-0 fixed w-full h-screen flex items-center justify-center bg-gray-800 bg-opacity-75 overscroll-contain">
            <button className="fixed w-full h-full z-40" onClick={onClose} />
            <div className="w-[45rem] bg-white border border-black rounded-[45px] py-10 z-50">
                <div className="w-full h-[10%] px-10">
                    <div className="w-full flex flex-row justify-between">
                        <p className="font-bold text-3xl mb-5">Edit Profile</p>
                        <button
                            className="text-2xl mb-6 text-gray-400"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                    <hr />
                </div>
                <form className="w-full h-[90%] px-10" onSubmit={onSubmit}>
                    <p className="font-medium text-xl mt-7 mb-3 text-gray-600">
                        First Name
                    </p>
                    <input
                        className="border border-black rounded-lg mb-5 text-lg w-full px-3 py-1"
                        type="text"
                        value={newFirstName}
                        onChange={onFirstNameChanged}
                    />
                    <p className="font-medium text-xl mb-3 text-gray-600">
                        Last Name
                    </p>
                    <input
                        className="border border-black rounded-lg mb-5 text-lg w-full px-3 py-1"
                        type="text"
                        value={newLastName}
                        onChange={onLastNameChanged}
                    />
                    <p className="font-medium text-xl mb-3 text-gray-600">
                        University
                    </p>
                    <input
                        className="border border-black rounded-lg mb-5 text-lg w-full px-3 py-1"
                        type="text"
                        value={newUniversity}
                        onChange={onUniversityChanged}
                    />
                    <p className="font-medium text-xl mb-3 text-gray-600">
                        Description
                    </p>
                    <textarea
                        className="h-24 border border-black rounded-lg mb-5 text-lg w-full px-3 py-1 flex justify-top"
                        type="text"
                        value={newDescription}
                        onChange={onDescriptionChanged}
                    />
                    <div className="flex flex-row justify-end items-center pt-7 space-x-5">
                        <button
                            className="bg-white hover:bg-gray-200 w-20 h-10 rounded-3xl border border-black font-medium text-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            buttonText={"Save"}
                            className="bg-purple-700 hover:bg-purple-500 text-white w-20 h-10 rounded-3xl font-medium"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
