import React from "react";

const ViewApplied = ({ user, className }) => {
    let content;

    content = (
        <div className="w-full h-full flex justify-center items-center">
            <p className="text-gray-600">No applications found... :(</p>
        </div>
    );

    return (
        <div className={`${className} overflow-y-auto`}>
            {content}
        </div>
    )
};

export default ViewApplied;
