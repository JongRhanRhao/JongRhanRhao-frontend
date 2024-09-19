import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useFetchStores } from "@/hooks/useFetchStores";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: stores, isLoading: isFetchingStores, error } = useFetchStores();

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
  };

  const filteredStores = useMemo(() => {
    if (!stores) return [];
    return stores.filter((store) =>
      store.shop_name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [stores, searchValue]);

  const { t } = useTranslation();

  if (isFetchingStores) return <p>Loading stores...</p>;
  if (error) return <p>Error fetching stores: {error.message}</p>;

  return (
    <div className="relative flex flex-col">
      {" "}
      <form className="relative">
        <div className="flex items-center">
          <span className="absolute left-3">
            <FontAwesomeIcon icon={faSearch} className="text-text shadow-sm" />
          </span>
          <input
            id="search-bar"
            className="p-1 pl-10 input input-sm rounded-xl text-md text-text placeholder-text bg-secondary"
            type="text"
            placeholder={t("Search")}
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
      </form>
      {searchValue !== "" && (
        <div
          className={`absolute bg-secondary overflow-y-auto h-20 rounded-xl w-48 py-2 px-2 z-50 top-full left-0 shadow-lg ${
            filteredStores.length > 0 ? "block" : "hidden"
          }`}
        >
          <ul className="text-sm text-text">
            {filteredStores.map((store) => (
              <Link to={`/shop/${store.store_id}`} key={store.store_id}>
                {" "}
                <li className="p-2 hover:bg-bg/50 rounded-xl">
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
