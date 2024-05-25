import { useState } from "react";
import "./searchBar.scss";

function SearchBar() {
  const [query, setQuery] = useState({
    game: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type"></div>
      <form>
        <input type="text" name="game" placeholder="Search game..." />
        <button>
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
