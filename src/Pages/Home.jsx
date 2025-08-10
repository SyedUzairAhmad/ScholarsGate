import React from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, DollarSign, Award } from "lucide-react";
import Features from "../components/Features";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className=" pt-24 min-h-screen bg-gradient-to-r from-amber-300 to-amber-100 p-10 text-white font-sans">


        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-20 ml-10 space-x-3">
          {/* Left Text Section */}
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-amber-900 leading-tight mb-4">
              Find Your Dream <br /> Scholarships
            </h1>
            <p className="text-3xl mb-6 text-amber-700">
              Search and apply for scholarships with ScholarsGate
            </p>
            <div className="flex items-center border rounded-full px-4 py-3 w-full shadow-sm">
              <input
                type="search"
                placeholder="Search scholarships"
                className="flex-1 outline-none text-gray-700 text-2xl"
              />
              <Search className="text-gray-500 w-6 h-6" />
            </div>

            {/* Cards */}
            <div className="flex items-end space-x-6 mt-10 ">

              <Link to="/Scholarships" >
                <div className="flex flex-col items-center bg-amber-300 shadow-md rounded-xl p-6 w-52 border-1 border-gray-50
            transform transition-transform duration-300 hover:scale-110 hover:cursor-pointer">
                  <GraduationCap className="w-10 h-10 text-amber-100 mb-3" />
                  <h3 className="text-lg font-semibold">Browse Scholarships</h3>
                  <p className="text-gray-600 text-center text-sm mt-2">
                    Explore thousands of scholarships
                  </p>
                </div></Link>

              <p className="text-3xl text-gray-500 ">
                Find, apply, and secure <br /> scholarships  for your dream universities abroad.
              </p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative mt-10 lg:mt-0 mr-10">
            <img
              src="https://imgs.search.brave.com/-VUr4pSuJFPqfuIjD4gj_0ESy7KiG6bRiKPCKK9jq9Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/Z3JhZHVhdGlvbi1j/YXAtb24tdG9wLW9m/LWJvb2tzLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA" // Replace with your image path
              alt="Graduate"
              className="w-[400px] h-[450px] min-h-[200px] min-w  -[150] object-cover rounded-3xl shadow-lg"
            />
            <div className="absolute bottom-4 right-4 bg-blue-100 p-4 rounded-xl shadow-md">
              <Award className="w-12 h-12 text-blue-800" />
            </div>
          </div>
        </div>
      </div>

      <Features />
      {/* About Section */}
      <motion.section
      id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}  // animation triggers once when 50% visible
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10 mb-16 scroll-mt-45"
      >
        <h2 className="text-4xl font-extrabold text-amber-600 mb-6">About ScholarsGate</h2>
        <p className="text-gray-800 text-lg leading-relaxed mb-4">
          At ScholarsGate, we believe that education is the most powerful tool to transform lives.
          Our mission is to bridge the gap between scholarship providers and students seeking
          opportunities worldwide, creating an accessible platform where dreams meet reality.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Whether you're a scholarship provider aiming to reach talented students or a student
          searching for financial aid, our platform streamlines the entire process.
          We offer up-to-date scholarship listings, easy application procedures, and direct
          communication channels.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Join us as we empower learners to unlock their potential, overcome financial barriers,
          and pursue academic excellence. Together, let's open the doors to a brighter future.
        </p>
      </motion.section>

      {/* Contact Section */}
      <motion.section
      id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}  // animation triggers once when 50% visible
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto scroll-mb- bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-amber-600 mb-6">Contact Us</h2>
        <p className="text-gray-700 text-lg mb-3">Have questions? Reach out to us!</p>
        <ul className="text-gray-700 text-lg space-y-2">
          <li><strong>Email:</strong> support@scholarsgate.com</li>
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>
          <li><strong>Address:</strong> 123 Education Lane, Learning City, Country</li>
        </ul>
      </motion.section>

    </>
  );
}
