import { useState, useEffect, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useFetchStores } from "@/hooks/useFetchStores";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { data: stores, isLoading: isFetchingStores, error } = useFetchStores();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedValue = localStorage.getItem("searchValue");
    if (savedValue) {
      setSearchValue(savedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchValue", searchValue);
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setIsDropdownVisible(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsDropdownVisible(false);
      setHighlightedIndex(-1);
    } else if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredStores.length - 1)
      );
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      event.preventDefault();
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      const selectedStore = filteredStores[highlightedIndex];
      if (selectedStore) {
        navigate(`/shop/${selectedStore.store_id}`);
      }
    }
  };

  const filteredStores = useMemo(() => {
    if (!stores) return [];
    return Array.isArray(stores)
      ? stores.filter((store) =>
          store.shop_name?.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];
  }, [stores, searchValue]);

  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current && highlightedIndex >= 0) {
      const listItems = dropdownRef.current.querySelectorAll("li");
      const highlightedItem = listItems[highlightedIndex];
      if (highlightedItem) {
        highlightedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex]);

  if (isFetchingStores) return <p>Loading stores...</p>;
  if (error) return <p>Error fetching stores: {error.message}</p>;

  return (
    <div className="relative flex flex-col">
      <form className="relative">
        <div className="flex items-center">
          <span className="absolute left-3">
            <FontAwesomeIcon icon={faSearch} className="text-text shadow-sm" />
          </span>
          <input
            id="search-bar"
            ref={searchInputRef}
            className="p-1 pl-10 input input-sm rounded-xl text-md text-text placeholder-text bg-secondary"
            type="text"
            placeholder={t("Search")}
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>
      {isDropdownVisible && searchValue !== "" && (
        <div
          ref={dropdownRef}
          className={`absolute bg-secondary rounded-xl w-48 z-50 top-full left-0 shadow-lg ${
            filteredStores.length > 0 ? "block" : "hidden"
          }`}
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <ul className="text-sm text-text">
            {filteredStores.map((store, index) => (
              <Link to={`/shop/${store.store_id}`} key={store.store_id}>
                <li
                  className={`p-2 hover:bg-text hover:text-bg rounded-xl ${
                    index === highlightedIndex ? "bg-text text-bg" : ""
                  }`}
                >
                  {store.shop_name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
