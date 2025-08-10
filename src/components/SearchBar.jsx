import { Search } from 'lucide-react';
import React, { useState } from "react";
import { useScholarships } from "../context/ScholarshipContext";

export default function SearchBar() {
    const { scholarships } = useScholarships();
    const [query, setQuery] = useState("");

    const filteredScholarships =
        query.trim() === ""
            ? []
            : scholarships.filter((sch) => {
                const q = query.toLowerCase();
                return (
                    sch.title.toLowerCase().includes(q) ||
                    sch.description.toLowerCase().includes(q) ||
                    (sch.level && sch.level.toLowerCase().includes(q)) ||
                    (sch.country && sch.country.toLowerCase().includes(q))
                );
            });

    return (
        <>
            <h1 className="text-5xl font-bold text-amber-900 leading-tight mb-4">
                Find Your Dream <br /> Scholarships
            </h1>
            <p className="text-3xl mb-6 text-amber-700">
                Search and apply for scholarships with ScholarsGate
            </p>

            {/* Search Bar */}
            <div className="relative  max-w-3xl">
                <div className="flex items-center border rounded-full px-4 py-3 w-full shadow-sm focus-within:ring-2 focus-within:ring-amber-200 transition">
                    <input
                        type="search"
                        placeholder="Search "
                        className="flex-1 outline-none text-gray-700 text-2xl"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Search className="text-gray-500 w-6 h-6" />
                </div>

                {/* Dropdown Results */}
                {filteredScholarships.length > 0 && (
                    <ul className="absolute z-10 bg-white w-full border rounded-lg mt-2 shadow-lg max-h-64 overflow-y-auto scrollbar-hide">
                        {filteredScholarships.map((sch) => (
                            <li
                                key={sch.id}
                                className="px-4 py-3 hover:bg-amber-50 transition cursor-pointer"
                                onClick={() => window.open(sch.link, "_blank")} // opens in new tab
                            >
                                <h3 className="font-bold text-lg">{sch.title}</h3>
                                <p className="text-sm text-gray-600">{sch.description}</p>
                                <p className="text-xs text-gray-500">
                                    {sch.level} • {sch.country}
                                </p>
                            </li> 
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
