import React, { useState } from "react";
import WeatherPhoto from "../../assets/photos/weather photo.jpeg";
import "./TitleSection.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Dropdown from "../Dropdown/Dropdown";
const TitleSection = ({ location, country }) => {
  const [clicked, setClicked] = useState(false);

  const updateclicked = () => {
    if (clicked) setClicked(false);
    else setClicked(true);
  };

  const scrollOnTop = () => {
    const targetel = document.getElementById("sbarwrap");
    targetel.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="titlewrapper" id="ttlwr">
      <div className="title-sec">
        <div className="left">
          <span className="ttl-img">
            <img
              src={WeatherPhoto}
              width={25}
              height={25}
              alt="weather photo"
            />
          </span>
          <span className="ttl-name" onClick={scrollOnTop}>
            <p>AeroWeather</p>
          </span>
        </div>
        <div className="right">
          <div className="menucont">
            {clicked ? (
              <Dropdown
                setClicked={setClicked}
                location={location}
                country={country}
              />
            ) : (
              <GiHamburgerMenu
                className="menu-bar"
                color="white"
                size={25}
                onClick={updateclicked}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleSection;
