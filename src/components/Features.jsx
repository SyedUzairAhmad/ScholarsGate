import React from "react";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipCard from "../components/ScholarshipCard";

export default function Features() {
    const { scholarships, loading } = useScholarships();

    if (loading) return <p className="text-center mt-10">Loading featured scholarships...</p>;

    return (
        <div className="flex flex-col justify-start items-start px-10 py-20 ml- space-x-3">

            <div className=" text-5xl font-bold text-amber-900 leading-tight mb-4">
                Featured Scholarships
            </div>
            <div className="flex flex-col lg:flex-row gap-6 justify-center px-4">
                {/* Show only first 3 featured scholarships */}
                {scholarships.slice(0, 3).map((scholarship) => (
                    <ScholarshipCard
                        key={scholarship.id}
                        title={scholarship.title}
                        description={scholarship.description}
                        level={scholarship.level}
                        deadLine={scholarship.deadline}
                    />
                ))}
            </div>
        </div>
    );
}
