/* eslint-disable react/prop-types */
import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({
  currresult,
  formatUnixTimestamp,
  location,
  country,
}) => {
  return (
    <div className="currweather weathercontainers" id="currweather">
      <div className="currhead wthshead">
        <span className="currttl wthsttl">Current Weather</span>
        <span className="currtm wthstm">
          {location}, {country} / {formatUnixTimestamp(currresult.dt)} UTC
        </span>
      </div>
      <hr className="wthshr" />
      <div className="currbd wthsbd">
        <div className="currmain wthsmain">
          <span className="currmainlf">
            <span className="currweath">
              <img
                src={
                  currresult?.weather?.[0]?.icon
                    ? `https://openweathermap.org/img/wn/${currresult.weather[0].icon}@2x.png`
                    : ""
                }
                width={100}
                height={100}
                alt=""
              />
              <span className="currweathDetail">
                {currresult?.weather?.[0]?.description}
              </span>
            </span>
          </span>

          <span className="currmainrt">
            <span className="currtemp">
              <span className="curracctemp">
                <strong>Temp:</strong>{" "}
                {((currresult.temp - 32) / 1.8).toFixed(1)}° C
              </span>
              <span className="flike">
                <strong>feels like:</strong>{" "}
                {((currresult.feels_like - 32) / 1.8).toFixed(1)}° C
              </span>
            </span>
          </span>
        </div>
        <div className="currsec">
          <span className="currwindval">
            <strong>Wind:</strong> {currresult.wind_deg} <strong>m/s</strong>,{" "}
            <strong>degrees:</strong> {currresult.wind_deg} <strong>°</strong>
          </span>
          {/* <hr className="sechr" /> */}
          <span className="currhumidityval">
            <strong>Humidity:</strong> {currresult.humidity} <strong>%</strong>
          </span>
          {/* <hr className="sechr" /> */}
          <span className="currvisval">
            <strong>Visibility:</strong> {currresult.visibility / 1000} km
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
