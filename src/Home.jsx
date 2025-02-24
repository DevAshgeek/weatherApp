import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import TitleSection from "./components/TitleSection/TitleSection";
import WeatherTemplate from "./components/WeatherTemplate/WeatherTemplate";
import "./Home.css";
import Footer from "./components/Footer/Footer";
const Home = () => {
  const [lat, setLat] = useState();
  const [lon, setlon] = useState();
  const [cont, setCont] = useState();
  const [location, setLocation] = useState("New York");
  return (
    <div className="home-pg">
      <TitleSection location={location} country={cont} />
      <SearchBar
        latitude={lat}
        longitude={lon}
        location={location}
        country={cont}
        setLat={setLat}
        setlon={setlon}
        setCountry={setCont}
        setLocation={setLocation}
      />
      {lat && lon && (
        <WeatherTemplate
          latitude={lat}
          longitude={lon}
          location={location}
          country={cont}
        />
      )}
      <Footer location={location} country={cont} />
    </div>
  );
};

export default Home;
