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
            navigate("/provider-dashboard"); // ✅ Go to dashboard after login
        } catch (err) {
            setError(err.message);
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
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
