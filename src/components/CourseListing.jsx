import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/CourseListing.css";

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://run.mocky.io/v3/78b43cf1-cc58-4b84-81a8-422afaf4bb63"
        );

        if (Array.isArray(res?.data)) {
          setCourses(res.data);
        } else {
          console.error("Invalid data format. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCourses([]);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="course-listing">
      <h1>Course Listing</h1>
      <div className="search-container">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Course name or Instructor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredCourses.map((course) => (
        <div key={course.id} className="course-card">
          <div className="course-details">
            <h2>{course.name}</h2>
            <p>Instructor: {course.instructor}</p>
            <p>Description: {course.description}</p>
            <div className="link-container">
              <a><Link to={`/courses/${course.id}`}>View Details</Link></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseListing;
