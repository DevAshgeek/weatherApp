/* eslint-disable react/prop-types */
import React from "react";

const DailyWeather = ({ dlweather }) => {
  return (
    <div className="dailyweather weathercontainers" id="dailyweather">
      <div className="dlywhead wthshead">
        <span className="dlywttl wthsttl">Daily Weather</span>
      </div>
      <hr className="wthshr" />
      <div className="dlywbd wthsbd">
        {dlweather.map((weather, index) => (
          <span key={index} className="dlywedwrap">
            <span id={weather.id} className="dlywedcont">
              <span className="dlyddt">
                <span className="dlyday">{weather.dt.day} </span>
                <span className="dlydt">
                  {weather.dt.date}/{weather.dt.month}/{weather.dt.year}
                </span>
              </span>

              <span className="dlymid">
                <img
                  className="dlywedicon"
                  src={
                    weather?.weather?.[0]?.icon
                      ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                      : ""
                  }
                  width={60}
                  height={60}
                />

                <span className="dlyweddes">
                  <span className="ddlymaxtemp">
                    {(weather.temp.max - 273.15).toFixed(0)}° C
                  </span>
                  <span className="ddlymintemp">
                    {(weather.temp.min - 273.15).toFixed(0)}° C
                  </span>
                </span>
              </span>
              <span className="dlymiddes">
                <span className="dlydes">
                  {weather?.weather?.[0]?.description}
                </span>
              </span>

              <span className="dlydetails">
                <span className="dlypep">
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/rain.png" // Replace with your precipitation icon
                    alt="precipitation"
                    className="weather-icon"
                    width={30}
                    height={30}
                    color="red"
                  />
                  : {weather.pop} %
                </span>
                <span className="dlyhmd">
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/humidity.png" // Replace with your humidity icon
                    alt="humidity"
                    className="weather-icon"
                    width={25}
                    height={25}
                  />
                  : {weather.humidity} %
                </span>
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DailyWeather;
