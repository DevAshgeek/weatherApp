import React from "react";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import "./Dropdown.css";

const Dropdown = ({ setClicked, location, country }) => {
  const dropdownRef = useRef(null);

  const toggleclicked = () => {
    setClicked(false);
  };

  const gotoWeatherDetials = (e) => {
    const clickedElement = e.target;
    console.log(e.target.attributes[1]);
    const clickedElementName = e.target.getAttribute("name");
    let elementtotarget = null;
    switch (clickedElementName) {
      case "lttd":
        elementtotarget = document.getElementById("todweather");
        break;
      case "lthr":
        elementtotarget = document.getElementById("hourlyweather");
        break;
      case "ltdly":
        elementtotarget = document.getElementById("dailyweather");
        break;
      case "ltmtly":
        elementtotarget = document.getElementById("mtlyweathcont");
        break;
      default:
        console.error("Invalid element name:", clickedElement);
        return;
    }

    if (elementtotarget) {
      elementtotarget.scrollIntoView({ behavior: "smooth", block: "start" });
      toggleclicked();
    } else {
      console.error("Target element not found:", clickedElementName);
    }
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
        className="litems litem1"
        name="lttd"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        Today
      </span>
      <span
        className="litems litem2"
        name="lthr"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        Hourly
      </span>
      <span
        className="litems litem3"
        name="ltdly"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        Daily
      </span>
      <span
        className="litems litem4"
        name="ltmtly"
        onClick={(e) => {
          gotoWeatherDetials(e);
        }}
      >
        Monthly
      </span>
    </div>
  );
};

export default Dropdown;
