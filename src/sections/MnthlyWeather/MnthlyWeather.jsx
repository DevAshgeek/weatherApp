/* eslint-disable react/prop-types */
import React from "react";
import "./MnthlyWeather.css";

const MnthlyWeather = ({ monthlyWeather, formatUnixDate }) => {
  return (
    <div className="mtlyweathcont weathercontainers" id="mtlyweathcont">
      <div className="mtlywhead wthshead">
        <span className="mtlywttl wthsttl">Monthly Weather</span>
      </div>
      <hr className="wthshr" />
      <div className="mtlywbd">
        {monthlyWeather.map((data, index) => (
          <div key={index} className="mtlywedwrap">
            <div className="mtlyday day-header">
              <strong className="day-content mday">
                {formatUnixDate(data.dt).day}
              </strong>
              <strong className="day-content mdate">
                {formatUnixDate(data.dt).date} / {formatUnixDate(data.dt).month}
              </strong>
            </div>
            <div className="mtlytemp day-header">
              <span className="day-content mtemp">
                Temp:{(data.temp - 273.15).toFixed(0)}° C
              </span>
              <span className="day-content">Humidity:{data.humidity}</span>
            </div>
            <div className="mtlydesc day-header">
              {data.weather[0]?.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MnthlyWeather;
