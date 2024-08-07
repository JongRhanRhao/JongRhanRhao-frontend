import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const savedValue = localStorage.getItem(searchValue);
    if (savedValue) {
      setSearchValue(savedValue);
    }
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem("searchValue", searchValue);
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="justify-end flex">
      <form className="relative">
        <div className="flex items-center">
          <span className="absolute left-3">
            <FontAwesomeIcon icon={faSearch} className="text-primary" />
          </span>
          <input
            id="search-bar"
            className="rounded-md p-1 pl-10 text-md font-sans"
            type="text"
            placeholder="Search club name..."
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
