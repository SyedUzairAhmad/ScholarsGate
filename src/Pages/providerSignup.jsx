// ProviderSignUp.jsx
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function ProviderSignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        organization: "",
        website: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await setDoc(doc(db, "providers", userCredential.user.uid), {
                providerId: userCredential.user.uid,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                organization: formData.organization,
                website: formData.website,
                role: "provider",
                createdAt: new Date(),
            });

            alert("Provider account created successfully!");
        }  catch (err) {
        console.error(err);

        // Check for specific Firebase error codes
        if (err.code === "auth/email-already-in-use") {
            setError("Email already exists. Please use another one.");
        } else {
            setError(err.message);
        }
    }
    };

    return (
        <div className="min-h-screen mt-25 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-200 px-4">
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-extrabold text-amber-600 mb-6 text-center">
                    Provider Sign Up
                </h1>

                {error && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        { name: "username", label: "Username", type: "text" },
                        { name: "email", label: "Email", type: "email" },
                        { name: "password", label: "Password", type: "password" },
                        { name: "confirmPassword", label: "Confirm Password", type: "password" },
                        { name: "phone", label: "Phone Number", type: "text" },
                        { name: "organization", label: "Organization Name", type: "text" },
                        { name: "website", label: "Website (Optional)", type: "text" },
                    ].map((field) => (
                        <div key={field.name} className="relative">
                            <input
                                type={field.type}
                                name={field.name}
                                onChange={handleChange}
                                required={field.name !== "website"}
                                placeholder=" "
                                className="peer w-full rounded-lg border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                            />
                            <label
                                className="absolute left-3 top-2 text-gray-500 text-sm transition-all 
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                  peer-focus:top-2 peer-focus:text-sm peer-focus:text-amber-500"
                            >
                                {field.label}
                            </label>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
