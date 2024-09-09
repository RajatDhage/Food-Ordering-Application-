import React from "react";
import { BsSearchHeart } from "react-icons/bs";

const Search = (props) => {
  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search your favourite restaurant..."
          id="search_field"
          className="form-control"
        />

        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <BsSearchHeart className="fa fa-search" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
