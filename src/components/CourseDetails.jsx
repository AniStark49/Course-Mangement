import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(
          `https://run.mocky.io/v3/78b43cf1-cc58-4b84-81a8-422afaf4bb63`
        );
        const data = await response.json();

        if (data.length > 0) {
          setCourse(data[id-1]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id-1]);

  const handleSyllabusToggle = () => {
    setIsSyllabusExpanded(!isSyllabusExpanded);
  };

  return (
    <div className="contain-heading">
      <h1>Course Details</h1>
      <div className="courseDetailsContainer">
        <div className="detailsContent">
          <h2 className="subHeading">{course.name}</h2>
          <p className="text">Instructor: {course.instructor}</p>
          <p className="text">Description: {course.description}</p>
          <p className="text">Enrollment Status: {course.enrollmentStatus}</p>
          <p className="text">Duration: {course.duration}</p>
          <p className="text">Schedule: {course.schedule}</p>
          <p className="text">Location: {course.location}</p>
          <p className="text">
            Prerequisites: {course.prerequisites?.join(", ")}
          </p>
          <div className="syllabus">
            <h3 onClick={handleSyllabusToggle} className="syllabus-title">
              Syllabus {isSyllabusExpanded ? "▲" : "▼"}
            </h3>
            {isSyllabusExpanded && (
              <ul>
                {course.syllabus?.map((item) => (
                  <li key={item.week}>
                    <strong>Week {item.week}:</strong> {item.topic} -{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
