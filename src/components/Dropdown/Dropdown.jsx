import React from "react";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import "./Dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = ({ setClicked, location, country }) => {
  const dropdownRef = useRef(null);

  const toggleclicked = () => {
    setClicked(false);
  };

  const gotoWeatherDetials = (e) => {
    e.preventDefault();
    toggleclicked();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleclicked();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdn" ref={dropdownRef}>
      <span className="currlocation">
        <strong>
          {location}, {country}
        </strong>
        <IoClose
          className="closebtn"
          color="black"
          size={30}
          onClick={() => toggleclicked()}
        />
      </span>
      <hr />
      {/* <span className="hrused"></span> */}

      <span
        className="litems litem5"
        name="ltcurr"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        <Link to="/">Current</Link>
      </span>
      <span
        className="litems litem1"
        name="lttd"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        <Link to="/today">Today</Link>
      </span>
      <span
        className="litems litem2"
        name="lthr"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        <Link to="/hourly">Hourly</Link>
      </span>
      <span
        className="litems litem3"
        name="ltdly"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        <Link to="/daily">Daily</Link>
      </span>
      <span
        className="litems litem4"
        name="ltmtly"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        <Link to="/monthly">Monthly</Link>
      </span>
    </div>
  );
};

export default Dropdown;
