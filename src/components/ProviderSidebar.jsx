import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function ProviderSidebar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/SignUp");
    };

    return (
        <div className="w-64 bg-amber-500 text-white min-h-screen p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Provider Panel</h1>
            <nav className="space-y-3">
                <Link to="/provider/dashboard" className="block hover:bg-amber-600 p-2 rounded">🏠 Dashboard</Link>
                <Link to="/provider/profile" className="block hover:bg-amber-600 p-2 rounded">👤 Profile</Link>
                <Link to="/provider/post-scholarship" className="block hover:bg-amber-600 p-2 rounded">📢 Post Scholarship</Link>
                <Link to="/provider/applications" className="block hover:bg-amber-600 p-2 rounded">📄 Applications</Link>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 p-2 rounded mt-6"
                >
                    🚪 Logout
                </button>
            </nav>
        </div>
    );
}
