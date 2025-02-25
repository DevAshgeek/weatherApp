/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./WeatherTemplate.css";
import CurrentWeather from "../../sections/CurrentWeather/CurrentWeather";
import TodaysWeather from "../../sections/TodaysWeather/TodaysWeather";
import HourlyWeather from "../../sections/HourlyWeather/HourlyWeather";
import DailyWeather from "../../sections/DailyWeather/DailyWeather";
import MnthlyWeather from "../../sections/MnthlyWeather/MnthlyWeather";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";

const WeatherTemplate = ({ latitude, longitude, location, country }) => {
  const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;
  // console.log(APIKEY);
  const lat = latitude;
  const lon = longitude;

  const [todWeath, setTodWeath] = useState({});
  const [daydate, setdaydate] = useState({
    date: "",
    day: "",
    month: "",
    year: "",
  });
  const [hoursWeather, setHoursWeather] = useState([]);
  const [dlweather, setDlWeather] = useState([]);
  const [monthlyWeather, setMonthlyWeather] = useState([]);
  const [currresult, setCurrResult] = useState({});
  const scrollRef = useRef(null);

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
      return null;
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

      // console.log(validWeatherData);
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
      <Navbar />
      <Routes>
        {/* current weather */}
        <Route
          path="/"
          element={
            <CurrentWeather
              currresult={currresult}
              formatUnixTimestamp={formatUnixTimestamp}
              location={location}
              country={country}
            />
          }
        />

        {/* todays weather */}
        <Route
          path="/today"
          element={
            <TodaysWeather
              todWeath={todWeath}
              formatUnixTimestamp={formatUnixTimestamp}
              daydate={daydate}
            />
          }
        />

        {/* hourly weather */}
        <Route
          path="/hourly"
          element={
            <HourlyWeather
              daydate={daydate}
              hoursWeather={hoursWeather}
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
              scrollRef={scrollRef}
            />
          }
        />

        {/* daily weather of a week */}

        <Route path="/daily" element={<DailyWeather dlweather={dlweather} />} />

        {/* monthly weather */}
        <Route
          path="/monthly"
          element={
            <MnthlyWeather
              monthlyWeather={monthlyWeather}
              formatUnixDate={formatUnixDate}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default WeatherTemplate;
