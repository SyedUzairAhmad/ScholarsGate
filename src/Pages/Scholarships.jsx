import React from "react";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipCard from "../components/ScholarshipCard";

export default function scholarships() {
    const { scholarships, loading } = useScholarships();

    if (loading) return <p className="text-center mt-36">Loading scholarships...</p>;

    return (
        <div className="flex flex-wrap gap-6 justify-center px-4 mt-30">
            {scholarships.map((scholarship) => (
                <ScholarshipCard
                    key={scholarship.id}
                    title={scholarship.title}
                    description={scholarship.description}
                    level={scholarship.level}
                    deadLine={scholarship.deadline}
                    site={scholarship.link}
                    country={scholarship.country}
                />
            ))}
        </div>
    );
}
