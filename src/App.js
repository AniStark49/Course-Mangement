// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import CourseListing from './components/CourseListing';
import CourseDetails from './components/CourseDetails';
import StudentDashboard from './components/StudentDashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"  element={<CourseListing/>} />
        <Route path="/courses/:id" element={<CourseDetails/>} />
        <Route path="/dashboard" element={<StudentDashboard/>} />
      </Routes >
    </Router>
  );
};

export default App;

