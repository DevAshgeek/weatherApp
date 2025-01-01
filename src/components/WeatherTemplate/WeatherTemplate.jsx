import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./WeatherTemplate.css";

const WeatherTemplate = ({ latitude, longitude }) => {
  const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;
  console.log(APIKEY);
  const lat = latitude;
  const lon = longitude;
  const [todWeath, setTodWeath] = useState({});

  const scrollRef = useRef(null);

  const [daydate, setdaydate] = useState({
    date: "",
    day: "",
    month: "",
    year: "",
  });

  const [hoursWeather, setHoursWeather] = useState([]);
  const [dlweather, setDlWeather] = useState([]);
  const [monthlyWeather, setMonthlyWeather] = useState([]);
  // const monthlyWeath = [];
  const hoursWeatherData = [];

  // let daydate = {};
  let daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  const [currresult, setCurrResult] = useState({});

  // generic functionalities
  const formatUnixDate = (timestamp) => {
    const dateDetails = new Date(timestamp * 1000); // Convert to milliseconds
    return {
      date: dateDetails.getUTCDate().toString().padStart(2, "0"),
      day: daysInWeek[dateDetails.getUTCDay()],
      month: (dateDetails.getUTCMonth() + 1).toString().padStart(2, "0"),
      year: dateDetails.getUTCFullYear().toString(),
    };
  };

  const formatUnixTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const hours = date.getUTCHours().toString().padStart(2, "0"); // Get hours in 24-hour format
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Get minutes
    return `${hours}:${minutes}`; // Return as HH:MM
  };

  // console.log(formatUnixDate(currentTimestamp).date);

  // convert date to unix format
  function convertDateToUnix(dateString) {
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date)) {
      console.error("Invalid Date:", dateString);
      return null; // Return null if the date is invalid
    }
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
  }

  // For scrollbar functionality of hourly data
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" }); // Adjust scroll amount
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" }); // Adjust scroll amount
    }
  };

  const getCurrentWeather = async () => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKEY}`
      );

      const resultdata = (await result.data.current) || {};
      // console.log(resultdata);
      if (resultdata) setCurrResult(resultdata);
    } catch (e) {
      console.log(e);
    }
  };

  // get todays data
  const getTodayWeather = async () => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`
      );

      const resultData = (await result?.data?.daily) || [];

      if (resultData.length > 0) {
        setTodWeath(resultData[0]);
        const formattedDate = formatUnixDate(resultData[0].dt);
        setdaydate(formattedDate);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // get hourly data
  const getHourlyWeather = async () => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`
      );

      const resultData = (await result?.data?.hourly) || [];

      if (resultData.length > 0) {
        for (let i = 0; i < 24; i++) {
          const formattedHours = formatUnixTimestamp(await resultData[i].dt);
          const hoursdata = await resultData[i];
          hoursWeatherData.push({
            id: `${resultData[i].dt}`,
            time: formattedHours,
            temp: hoursdata?.temp,
            description: hoursdata?.weather[0]?.description,
            feels_like: hoursdata?.feels_like,
            visibility: hoursdata?.visibility,
            icon: hoursdata?.weather[0]?.icon,
          });
        }
        setHoursWeather(hoursWeatherData);
      }
      // console.log(hoursWeather);
    } catch (e) {
      console.log(e);
    }
  };

  // Set daily weather data
  const getDailyWeather = async () => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`
      );

      const resultData = (await result?.data?.daily) || [];
      if (resultData.length > 0) {
        for (let i = 0; i < resultData.length; i++) {
          const formattedDate = formatUnixDate(resultData[i]?.dt);
          resultData[i].dt = formattedDate;
        }
        setDlWeather([...resultData]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMonthlyWeather = async () => {
    try {
      const formattedDate = formatUnixDate(Date.now() / 1000);
      const currentMonth = parseInt(formattedDate.month);
      const currentYear = parseInt(formattedDate.year);

      // Get the number of days in the current month
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

      // Generate all timestamps for the month in one pass
      const timestamps = Array.from({ length: daysInMonth }, (_, i) => {
        const dateStr = `${currentYear}-${currentMonth}-${(i + 1)
          .toString()
          .padStart(2, "0")}`;
        return convertDateToUnix(dateStr);
      }).filter(Boolean); // Filter out any invalid dates

      // Perform all API calls in parallel
      const weatherData = await Promise.all(
        timestamps.map((timestamp) =>
          axios
            .get(
              `https://api.openweathermap.org/data/3.0/onecall/timemachine`,
              {
                params: {
                  lat,
                  lon,
                  dt: timestamp,
                  appid: APIKEY,
                },
              }
            )
            .then((res) => res.data.data[0]) // Extract the relevant data
            .catch((error) => {
              console.error(
                `Error fetching weather for timestamp ${timestamp}:`,
                error
              );
              return null; // Handle errors gracefully
            })
        )
      );

      // Filter out any failed responses
      const validWeatherData = weatherData.filter((data) => data);

      // Update state
      setMonthlyWeather(validWeatherData);

      console.log(validWeatherData);
    } catch (e) {
      console.error("Error fetching monthly weather:", e);
    }
  };

  useEffect(() => {
    async function getdata() {
      await getCurrentWeather();
      await getTodayWeather();
      await getHourlyWeather();
      await getDailyWeather();
      await getMonthlyWeather();
    }
    getdata();
    // console.log(monthlyWeather);
  }, [lat, lon]);

  return (
    <div className="wtcont">
      {/* current weather */}
      <div className="currweather" id="currweather">
        <div className="currhead">
          <span className="currttl">Current Weather</span>
          <span className="currtm">
            {formatUnixTimestamp(currresult.dt)} UTC
          </span>
        </div>
        <hr className="currhr" />
        <div className="currbd">
          <div className="currmain">
            <span className="mainlf">
              <span className="weath">
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
                <span className="weathDetail">
                  {currresult?.weather?.[0]?.description}
                </span>
              </span>

              <span className="temp">
                <span className="acctemp">
                  <strong>Temp:</strong>{" "}
                  {((currresult.temp - 32) / 1.8).toFixed(1)}° C
                </span>
                <span className="flike">
                  <strong>feels like:</strong>{" "}
                  {((currresult.feels_like - 32) / 1.8).toFixed(1)}° C
                </span>
              </span>
            </span>

            <span className="mainrt"></span>
          </div>
          <div className="currsec">
            <span className="windval">
              <strong>Wind:</strong> {currresult.wind_deg} <strong>m/s</strong>,{" "}
              <strong>degrees:</strong> {currresult.wind_deg} <strong>°</strong>
            </span>
            {/* <hr className="sechr" /> */}
            <span className="humidityval">
              <strong>Humidity:</strong> {currresult.humidity}{" "}
              <strong>%</strong>
            </span>
            {/* <hr className="sechr" /> */}
            <span className="visval">
              <strong>Visibility:</strong> {currresult.visibility / 1000} km
            </span>
          </div>
        </div>
      </div>
      {/* todays weather */}
      <div className="todweather" id="todweather">
        <div className="todhead">
          <span className="todttl">Todays Weather</span>
          <span className="todtm">
            {daydate?.day}, {daydate?.date} / {daydate?.month} / {daydate?.year}
          </span>
        </div>
        <hr className="todhr" />
        <div className="todbd">
          <div className="todmain">
            <span className="todsumm">{todWeath.summary}</span>
            <span className="toddtl">
              <span className="todleft">
                <span className="srise">
                  <strong>SUNRISE</strong>{" "}
                  <img
                    src={`https://openweathermap.org/img/wn/01d@2x.png`}
                    width={50}
                    height={50}
                    alt=""
                  />{" "}
                  {formatUnixTimestamp(todWeath.sunrise)} UTC
                </span>
                <span className="sset">
                  <strong>SUNSET</strong>{" "}
                  <img
                    src={`https://openweathermap.org/img/wn/01n@2x.png`}
                    width={50}
                    height={50}
                    alt=""
                  />{" "}
                  {formatUnixTimestamp(todWeath.sunset)} UTC
                </span>
              </span>
              <span className="todright">
                <span className="tempmax">
                  <strong>Max Temperature:</strong>{" "}
                  {(todWeath?.temp?.max - 273.15).toFixed(2)}° C
                </span>
                <span className="tempmin">
                  <strong>Min Temperature:</strong>{" "}
                  {(todWeath?.temp?.min - 273.15).toFixed(2)}° C
                </span>
                <span className="tongtemp">
                  <strong>Temperature at night:</strong>{" "}
                  {(todWeath?.temp?.night - 273.15).toFixed(2)}° C
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* hourly weather */}
      <div className="hourlyweather" id="hourlyweather">
        <div className="hrwhead">
          <span className="hrwttl">Hourly Weather</span>
          <span className="todtm">
            {daydate?.date} / {daydate?.month} / {daydate?.year}
          </span>
        </div>
        <hr className="hrwhr" />
        <div className="hrwbd">
          <div className="hrwmain">
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
      {/* daily weather of a week */}
      <div className="dailyweather" id="dailyweather">
        <div className="dlywhead">
          <span className="dlywttl">Daily Weather</span>
        </div>
        <hr className="dlyhr" />
        <div className="dlywbd">
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
      {/* monthly weather */}
      <div className="mtlyweathcont" id="mtlyweathcont">
        <div className="mtlywhead">
          <span className="mtlywttl">Monthly Weather</span>
        </div>
        <hr className="mtlyhr" />
        <div className="mtlywbd">
          {monthlyWeather.map((data, index) => (
            <div key={index} className="mtlywedwrap">
              <div className="mtlyday day-header">
                <strong className="day-content mday">
                  {formatUnixDate(data.dt).day}
                </strong>
                <strong className="day-content mdate">
                  {formatUnixDate(data.dt).date} /{" "}
                  {formatUnixDate(data.dt).month}
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
    </div>
  );
};

export default WeatherTemplate;