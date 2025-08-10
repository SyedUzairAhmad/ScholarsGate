import { Calendar, GraduationCap } from "lucide-react";
import { ScholarshipProvider } from "../context/ScholarshipContext";

export default function ScholarshipCard({ title, description, level, deadLine, site, country }) {
    return (
        <div className="overflow-hidden">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-md w-80 < p-6 transition hover:shadow-xl hover:scale-[1.01] duration-300">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-amber-800">{title}</h2>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {description.length > 120 ? description.substring(0, 117) + "..." : description}
                    </p>
                </div>

                {/* Info Section */}
                <div className="flex items-center gap-2 mt-4 text-sm text-amber-700 font-medium">
                    <GraduationCap className="w-4 h-4" />
                    <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs">
                        Level: {level}
                    </span>
                </div>
                {/* Country Section */}
                <div className="flex items-center justify-between mt-6 text-sm text-amber-800">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold">Country:</span>
                    </div>
                    <span className="font-bold text-amber-700">{country}</span>
                </div>

                {/* Deadline Section */}
                <div className="flex items-center justify-between mt-6 text-sm text-amber-800">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold">Deadline:</span>
                    </div>
                    <span className="font-bold text-amber-700">{deadLine}</span>
                </div>

                {/* Action Button */}

                <div className="mt-6">
                    <a
                        href={site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block bg-amber-500 hover:bg-amber-600 text-white text-center font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-200"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
}
