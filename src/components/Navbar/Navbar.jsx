import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { path: "/", label: "Current" },
  { path: "/hourly", label: "Hourly" },
  { path: "/today", label: "Todays" },
  { path: "/daily", label: "Daily" },
  { path: "/monthly", label: "Monthly" },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="nav-wrapper">
      <nav className="nav-container">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={pathname === path ? "isactive-link" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
