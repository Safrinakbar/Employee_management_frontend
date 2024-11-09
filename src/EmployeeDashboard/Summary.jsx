import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../../server/context/authContext";

const Summary = () => {
    const { user } = useAuth();
    return (
        <div className="p-6">
        <div className="rounded flex bg-white mt-4"> 
            <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-6`}>
                <FaUser />
            </div>
            <div className="pl-6 py-1">
                <p className="text-lg font-semibold">Welcome Back</p>
                <p className="text-xl font-bold">{user.name}</p>
            </div>
        </div>
        </div>
    );
};

export default Summary;
