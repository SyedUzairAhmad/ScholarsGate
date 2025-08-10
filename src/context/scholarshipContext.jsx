import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; // adjust if your path differs

export const ScholarshipContext = createContext()

export const ScholarshipProvider = ({ children }) => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const snapshot = await getDocs(collection(db, "scholarships"));
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setScholarships(data);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    return (
        <ScholarshipContext.Provider value={{ scholarships, loading }}>
            {children}
        </ScholarshipContext.Provider>
    );
};

export const useScholarships = () => useContext(ScholarshipContext);
