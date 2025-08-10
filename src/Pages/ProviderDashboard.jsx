import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";

import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp,
    deleteDoc,
    doc
} from "firebase/firestore";

export default function ProviderDashboard() {
    const [scholarships, setScholarships] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "",
        deadline: "",
        link: "",
        country: ""
    });

    const fetchScholarships = async () => {
        if (!auth.currentUser) return;
        const q = query(
            collection(db, "scholarships"),
            where("providerId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setScholarships(data);
    };

    useEffect(() => {
        fetchScholarships();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;
        try {
            await addDoc(collection(db, "scholarships"), {
                ...formData,
                providerId: auth.currentUser.uid,
                createdAt: serverTimestamp()
            });
            alert("Scholarship added successfully!");
            setFormData({
                title: "",
                description: "",
                deadline: "",
                link: "",
                level: "",
                country: ""
            });
            fetchScholarships();
        } catch (err) {
            console.error(err);
            alert("Error adding scholarship");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this scholarship?")) {
            try {
                await deleteDoc(doc(db, "scholarships", id));
                alert("Scholarship deleted successfully!");
                fetchScholarships();
            } catch (err) {
                console.error(err);
                alert("Failed to delete scholarship");
            }
        }
    };



    return (
        <div className="p-6 max-w-4xl mx-auto pt-36">
            <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>

            {/* Add Scholarship Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 mb-8"
            >
                <h2 className="text-xl font-semibold mb-4">Add New Scholarship</h2>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border rounded w-full p-2 mb-4"
                />
                <input
                    name="description"
                    placeholder="Description/Fully Funded"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border rounded w-full p-2 mb-4"
                ></input>
                <input
                    name="level"
                    placeholder="BS/MS/PhD"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="border rounded w-full p-2 mb-4"
                ></input>
                <input
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="border rounded w-full p-2 mb-4"
                />
                <input
                    name="country"
                    placeholder="Scholarship Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="border rounded w-full p-2 mb-4"
                />
                <input
                    name="link"
                    placeholder="Application Link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                    className="border rounded w-full p-2 mb-4"
                />
                <button
                    type="submit"
                    className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
                >
                    Add Scholarship
                </button>
            </form>

            {/* Scholarships List */}
            <h2 className="text-xl font-semibold mb-4">Your Scholarships</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {scholarships.map((s) => (
                    <div
                        key={s.id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-bold">{s.title}</h3>
                            <p className="text-gray-600">{s.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Deadline: {s.deadline}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <a
                                href={s.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                VISIT
                            </a>
                            <button
                                onClick={() => handleDelete(s.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
