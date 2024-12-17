import { useDispatch, useSelector } from "react-redux";
import {
  API_KEY,
  HAMBURGER_MENU,
  USER_LOGO,
  YOUTUBE_LOGO,
  YOUTUBE_SEARCH_API,
  YOUTUBE_SEARCH_SUGGESTIONS,
} from "../utils/constants";
import { openMenu, toggleMenu } from "../utils/appSlice";
import { useEffect, useRef, useState } from "react";
import { cacheResults, searchVideos } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate()
  // Ref to detect clicks inside the suggestion box
  const suggestionsRef = useRef(null);
  const searchCache = useSelector((store) => store.search.suggestions);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        /**
         *  searchCache = {
         *     "iphone": ["iphone 11", "iphone 14"]
         *  }
         *  searchQuery = iphone
         */
        setSearchSuggestions(searchCache[searchQuery]);
      } else {
        fetchSearchData();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const fetchSearchData = async () => {
    const response = await fetch(YOUTUBE_SEARCH_SUGGESTIONS + searchQuery);
    const json = await response.json();
    setSearchSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const handleMouseDown = (e) => {
    // Prevent blur when clicking inside suggestions
    e.preventDefault();
  };

  const handleBlur = (e) => {
    // Close suggestions when focus is lost and click is outside input or suggestions
    if (suggestionsRef.current  && !suggestionsRef.current.contains(e.relatedTarget)) {
      setShowSuggestions(false);
    }
  };

  const handleClick = (value) => {
    fetchSearchVideos(value)
  };

  const fetchSearchVideos  = async(value) => {
    const response =await fetch(YOUTUBE_SEARCH_API+value+'&key='+API_KEY);
    const json = await response.json();
    dispatch(searchVideos(json?.items))
    navigate("/")
    dispatch(openMenu())
    setShowSuggestions(false)
    setSearchQuery('')
  }

  return (
    <div className="grid grid-flow-col p-3 m-2 sticky top-0 bg-white z-10">
      <div className="flex col-span-1">
        <img
          src={HAMBURGER_MENU}
          alt="hamburger"
          className="h-8 cursor-pointer"
          onClick={() => toggleMenuHandler()}
        />
        <img alt="youtube" src={YOUTUBE_LOGO} className="h-8 ml-2" />
      </div>

      <div className="col-span-10">
        <div className="mx-64">
          <input
            type="text"
            className="w-3/4 px-10 border border-gray-400 p-2 rounded-l-full"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
          />
          <button className="border border-gray-400 py-2 px-5 bg-gray-100 rounded-r-full">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="mx-64 w-96 shadow-sm rounded-lg bg-white p-2 fixed">
            <ul
              className=""
              ref={suggestionsRef} // Attach ref to the suggestions box
              onMouseDown={handleMouseDown} // Prevent blur on clicking inside suggestions
            >
              {searchSuggestions.map((item) => (
                <li
                  className="m-1 p-2 hover:bg-gray-100 cursor-default"
                  key={item}
                  onClick={() => handleClick(item)}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1 flex justify-end">
        <img alt="user-icon" src={USER_LOGO} className="h-8" />
      </div>
    </div>
  );
};

export default Header;
