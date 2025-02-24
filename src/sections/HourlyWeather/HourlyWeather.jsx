/* eslint-disable react/prop-types */
import React from "react";

const HourlyWeather = ({
  daydate,
  hoursWeather,
  scrollLeft,
  scrollRef,
  scrollRight,
}) => {
  return (
    <div className="hourlyweather weathercontainers" id="hourlyweather">
      <div className="hrwhead wthshead">
        <span className="hrwttl wthsttl">Hourly Weather</span>
        <span className="hrwtm wthstm">
          {daydate?.date} / {daydate?.month} / {daydate?.year}
        </span>
      </div>
      <hr className="wthshr" />
      <div className="hrwbd wthsbd">
        <div className="hrwmain wthsmain">
          <button className="scroll-btn left-arrow" onClick={scrollLeft}>
            &#9664;
          </button>

          <div className="hrslides" ref={scrollRef}>
            {hoursWeather.map((weather, index) => (
              <span key={index} id={weather.id} className="hrwed">
                <span className="hrsval">{weather.time} UTC</span>
                <span className="hrtemp">
                  {(weather.temp - 273.15).toFixed(2)}° C
                </span>
                <span className="hrlywed">
                  <img
                    src={
                      weather?.icon
                        ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
                        : ""
                    }
                    width={50}
                    height={50}
                    alt=""
                  />
                  <span className="hrdes">{weather.description}</span>
                </span>

                <span className="hrlyvis">
                  Vis: {weather.visibility / 1000} km
                </span>
              </span>
            ))}
          </div>
          <button className="scroll-btn right-arrow" onClick={scrollRight}>
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
