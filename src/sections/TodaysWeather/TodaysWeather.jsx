/* eslint-disable react/prop-types */
import React from "react";
import "./TodaysWeather.css";

const TodaysWeather = ({ todWeath, formatUnixTimestamp, daydate }) => {
  return (
    <div className="todweather weathercontainers" id="todweather">
      <div className="todhead wthshead">
        <span className="todttl wthsttl">Todays Weather</span>
        <span className="todtm wthstm">
          {daydate?.day}, {daydate?.date} / {daydate?.month} / {daydate?.year}
        </span>
      </div>
      <hr className="wthshr" />
      <div className="todbd wthsbd">
        <div className="todmain wthsmain">
          <span className="toddtl">
            <span className="todleft">
              <span className="todsumm">{todWeath.summary}</span>
            </span>
            <span className="todright">
              <span className="todrtsd todtemps">
                <img
                  className="todwedicon"
                  src={
                    todWeath?.weather?.[0]?.icon
                      ? `https://openweathermap.org/img/wn/${todWeath.weather[0].icon}@2x.png`
                      : ""
                  }
                  width={60}
                  height={60}
                />
                <span className="todwedicondes">
                  {todWeath?.weather?.[0]?.description}
                </span>
              </span>
              <span className="todtemps tempmax">
                <strong>Max Temp:</strong>{" "}
                {(todWeath?.temp?.max - 273.15).toFixed(2)}° C
              </span>
              <span className="todtemps tempmin">
                <strong>Min Temp:</strong>{" "}
                {(todWeath?.temp?.min - 273.15).toFixed(2)}° C
              </span>
              <span className="todtemps tongtemp">
                <strong>Temp at night:</strong>{" "}
                {(todWeath?.temp?.night - 273.15).toFixed(2)}° C
              </span>
            </span>
          </span>
          <span className="todwdes">
            <span className="srise">
              <strong>Sunrise</strong>{" "}
              <img
                src={`https://openweathermap.org/img/wn/01d@2x.png`}
                width={50}
                height={50}
                alt=""
              />{" "}
              <span>{formatUnixTimestamp(todWeath.sunrise)} UTC</span>
            </span>
            <span className="sset">
              <strong>Sunset</strong>{" "}
              <img
                src={`https://openweathermap.org/img/wn/01n@2x.png`}
                width={50}
                height={50}
                alt=""
              />{" "}
              <span>{formatUnixTimestamp(todWeath.sunset)} UTC</span>
            </span>
            <span className="todpr toddesitm">
              <strong className="toditmsttl">Atm. Pres</strong>
              <span className="toditmval">{todWeath.pressure} hPa</span>
            </span>
            <span className="todhmd toddesitm">
              <strong className="toditmsttl">Humidity</strong>
              <span className="toditmval">{todWeath.humidity} %</span>
            </span>

            <span className="toddewp toddesitm">
              <strong className="toditmsttl">Dew_point</strong>
              <span className="toditmval"> {todWeath.dew_point} ° C</span>
            </span>
            <span className="todwind toddesitm">
              <strong className="toditmsttl">Wind</strong>
              <span className="toditmval">
                {todWeath.wind_speed} m/s, {todWeath.wind_deg} °
              </span>
            </span>
            <span className="todclouds toddesitm">
              <strong className="toditmsttl">Clouds</strong>
              <span className="toditmval">{todWeath.clouds} %</span>
            </span>
            {todWeath?.pop ? (
              <span className="todpop toddesitm">
                <strong className="toditmsttl">Precip</strong>
                <span className="toditmval">{todWeath.pop * 100} %</span>
              </span>
            ) : (
              <></>
            )}
            {todWeath?.rain && (
              <span className="todrain toddesitm">
                <strong className="toditmsttl">Rainfall</strong>
                <span className="toditmval">{todWeath.rain} mm</span>
              </span>
            )}
            {todWeath?.snow && (
              <span className="todsnow toddesitm">
                <strong className="toditmsttl">Snowfall</strong>
                <span className="toditmval">{todWeath.snow} mm</span>
              </span>
            )}
            <span className="toduvi toddesitm">
              <strong className="toditmsttl">UV Index</strong>
              <span className="toditmval">{todWeath.uvi}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodaysWeather;
