import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/provider-dashboard"); // ✅ Redirect after login
        } catch (err) {
            console.error(err);

            // Handle specific Firebase auth errors
            const errorMessages = {
                "auth/user-not-found": "No account found with this email.",
                "auth/wrong-password": "Incorrect password. Please try again.",
                "auth/invalid-email": "Invalid email format.",
                "auth/too-many-requests": "Too many failed attempts. Please try again later.",
                "auth/invalid-credential": "Incorrect email or password. Please try again." // New Firebase code
            };


            setError(errorMessages[err.code] || "Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-amber-100 to-amber-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-amber-600 text-center">Sign In</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-2 px-4 rounded-lg transition ${loading ? "bg-amber-300 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"
                        }`}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
