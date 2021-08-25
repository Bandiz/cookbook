import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";

import "./Search.scss";

export default function Search() {
  return (
    <div className="search">
      <div className="search-icon">
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: "inputRoot",
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
