import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { markCourseCompleted } from "../actions";
import "../styles/StudentDashboard.css";

const StudentDashboard = ({ enrolledCourses, markCourseCompleted }) => {
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/78b43cf1-cc58-4b84-81a8-422afaf4bb63"
        );
        const data = await response.json();
        setCourses([...data, ...enrolledCourses]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [enrolledCourses]);

  const handleMarkCompleted = (courseId) => {
    markCourseCompleted(courseId);
    setCompletedCourses([...completedCourses, courseId]);
  };

  const getStatusColorClass = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "open";
      case "closed":
        return "closed";
      case "in progress":
        return "in-progress";
      default:
        return "";
    }
  };

  return (
    <div className="student-dashboard">
      <h1>Your Courses</h1>
      {courses.map((course) => (
        <div
          key={course.id}
          className={`course-card ${
            completedCourses.includes(course.id) ? "completed" : ""
          }`}
        >
          <h2>{course.name}</h2>
          <h4>Instructor  : {course.instructor}</h4>
          <img
            src={course.thumbnail}
            alt={course.name}
            className="course-thumbnail"
          />
          <div className="course-details">
            <p>Duration: {course.duration}</p>
            <p>Schedule: {course.schedule}</p>
            <p>Location: {course.location}</p>
            <p>Prerequisites: {course.prerequisites.join(", ")}</p>
            <div className="syllabus">
              <h3>Syllabus</h3>
              <ul>
                {course.syllabus.map((item) => (
                  <li key={item.week}>
                    <strong>Week {item.week}:</strong> {item.topic} -{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            </div>
            <div className="progress-bar-container">
              <div
                className={`progress-bar ${getStatusColorClass(
                  course.enrollmentStatus
                )}`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span
              className={`enrollment-status ${getStatusColorClass(
                course.enrollmentStatus
              )}`}
            ></span>
            {completedCourses.includes(course.id) && (
              <span className="tick-mark">&#10003;</span>
            )}
          </div>
          <button
  className={`mark-button ${
    completedCourses.includes(course.id) ? "completed" : ""
  }`}
  onClick={() => handleMarkCompleted(course.id)}
  style={{
    cursor: completedCourses.includes(course.id) ? "not-allowed" : "pointer",
  }}
>
  Mark as Completed
</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  enrolledCourses: state.enrolledCourses,
});

export default connect(mapStateToProps, { markCourseCompleted })(
  StudentDashboard
);
