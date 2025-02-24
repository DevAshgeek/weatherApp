import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <span>
          <Link to="/current">Current</Link>
        </span>
        <span>
          <Link to="/hourly">Hourly</Link>
        </span>
        <span>
          <Link to="/today">Todays</Link>
        </span>
        <span>
          <Link to="/daily">Daily</Link>
        </span>
        <span>
          <Link to="/monthly">Monthly</Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
