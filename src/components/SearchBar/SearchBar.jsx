import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchBar.css";
import { CiSearch } from "react-icons/ci";

const SearchBar = (props) => {
  const locc = props.location;
  const [loc, setLoc] = useState(locc);

  // console.log(props.location);

  useEffect(() => {
    const handlefirstsearch = async () => {
      const result = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=c7395ae5805048ba2ea513f21368a7f1`
      );

      const resultval = await result.data;
      const { lat, lon, country } = resultval[0];
      props.setLat(lat);
      props.setlon(lon);
      props.setCountry(country);
    };
    handlefirstsearch();
  }, []);

  useEffect(() => {
    setLoc(props.location); // Sync local state with parent state
  }, [props.location]);

  const handlelocSubmit = async (e) => {
    e.preventDefault();
    if (loc) {
      props.setLocation(loc);
    }

    const result = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=c7395ae5805048ba2ea513f21368a7f1`
    );
    const resultval = await result.data;
    const { lat, lon, country } = resultval[0];

    props.setLat(lat);
    props.setlon(lon);
    props.setCountry(country);
  };

  return (
    <div className="sbar-wrapper" id="sbarwrap">
      <div className="sbar-cont">
        <form className="searchform" onSubmit={handlelocSubmit}>
          <input
            type="text"
            name="searchlocation"
            id="searchloc"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
          <button type="submit" className="btnsub">
            <CiSearch
              className="search-icon"
              color="rgba(55,55,40, 0.9)"
              size={25}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
