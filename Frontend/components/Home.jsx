import React, { useState, useEffect } from "react";
import UserDetails from "./UserDetails";
import UserProfile from "./UserProfile";
import UserForm from "./UserForm";
import { GoPlus } from "react-icons/go";

const Home = () => {
    const [openUserId, setOpenUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/users/`
            );
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getRankStyle = (index) => {
        if (index === 0) return "bg-yellow-200 border-yellow-400";
        if (index === 1) return "bg-gray-200 border-gray-400";
        if (index === 2) return "bg-orange-200 border-orange-400";
        return "bg-white border-gray-200";
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 p-6 relative">

            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-md mb-6 text-center">
                <h1 className="text-3xl font-bold mb-2">🏆 Leaderboard</h1>
                <p className="text-gray-600">Track user rankings and points.</p>
            </div>


            <div className="w-full max-w-2xl flex flex-col space-y-3">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    users.map((user, index) => (
                        <div
                            key={user._id}
                            className={`flex flex-col w-full border rounded-xl shadow-sm hover:shadow-md transition ${getRankStyle(
                                index
                            )}`}
                        >
                            {/* User row */}
                            <UserDetails
                                user={user}
                                count={index + 1}
                                isOpen={openUserId === user._id}
                                setisOpen={(open) => setOpenUserId(open ? user._id : null)}
                            />

                            {/* Expand profile if open */}
                            {openUserId === user._id && (
                                <div className="p-4 border-t bg-gray-50">
                                    <UserProfile
                                        user={user}
                                        rank={index + 1}
                                        setisOpen={() => setOpenUserId(null)}
                                        fetchData={fetchData}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Floating Add User Button */}
            <button
                className="fixed bottom-6 right-6 font-semibold bg-green-500 p-3 rounded-full text-white shadow-md flex items-center justify-center hover:bg-green-600 transition"
                onClick={() => setIsFormOpen(true)}
            >
                <GoPlus className="text-2xl" />
            </button>

            {/* Overlay + Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    {/* <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative"> */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsFormOpen(false)}
                        >
                            ✕
                        </button>
                        <UserForm setIsFormOpen={setIsFormOpen} fetchData={fetchData} />
                    {/* </div> */}
                </div>
            )}
        </div>
    );
};

export default Home;
