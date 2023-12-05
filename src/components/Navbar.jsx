import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
        Student Dashboard
      </Link>
    </nav>
  );
};

export default Navbar;
