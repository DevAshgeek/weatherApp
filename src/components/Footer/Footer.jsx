import React from "react";
import "./Footer.css";
import { socialdetails } from "../../utils/data";
const Footer = ({ location, country }) => {
  // const navigateToSec = (e) => {
  //   const pressedbtn = e.target.getAttribute("id");
  //   let elementtotarget = null;
  //   switch (pressedbtn) {
  //     case "todbtn":
  //       elementtotarget = document.getElementById("todweather");
  //       break;
  //     case "hrbtn":
  //       elementtotarget = document.getElementById("hourlyweather");
  //       break;
  //     case "dlybtn":
  //       elementtotarget = document.getElementById("dailyweather");
  //       break;
  //     case "mtlybtn":
  //       elementtotarget = document.getElementById("mtlyweathcont");
  //       break;
  //     default:
  //       console.error("Invalid element", e.target);
  //       return;
  //   }

  //   if (elementtotarget) {
  //     elementtotarget.scrollIntoView({ behavior: "smooth", block: "start" });
  //   } else {
  //     console.error("Target element not found:", e.target);
  //   }
  // };
  return (
    <div className="wrapper">
      <hr className="fthr" />
      <div className="locsection">
        <span className="pre">You are seeing weather of</span>
        <span className="loc">
          {location}, {country}
        </span>
      </div>
      {/* <div className="nav">
        <span className="navbtns" id="todbtn" onClick={navigateToSec}>
          today
        </span>
        <span className="navbtns" id="hrbtn" onClick={navigateToSec}>
          hourly
        </span>
        <span className="navbtns" id="dlybtn" onClick={navigateToSec}>
          daily
        </span>
        <span className="navbtns" id="mtlybtn" onClick={navigateToSec}>
          monthly
        </span>
      </div> */}
      <div className="author">
        <span>Designed and developed with ❤️ by Ashutosh Yadav</span>
      </div>

      <div className="socialscont">
        {socialdetails.map((s, i) => (
          <a
            key={i}
            target="_blank"
            rel="noopener noreferrer"
            className="socials"
            href={s.href}
          >
            <img src={s.src} alt={s.alt} width={30} height={30} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
