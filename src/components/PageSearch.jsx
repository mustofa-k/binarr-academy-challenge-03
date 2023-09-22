
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { TodoContext } from "../context/todoContext";

const PageSearch = () => {
  const { searchHandler } = useContext(TodoContext);
  const [query, setQuery] = useState("");

  return (
    <div className="mb-3 search-container">
      <h2 className="text-center py-2 fw-bold">Aplikasi TodoList</h2>
      <div className="input-group input-group-lg  mt-4">
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Search todo" value={query} onChange={(e) => setQuery(e.target.value)} />
        <span className="input-group-text btn btn-outline-danger .bg-danger" id="inputGroup-sizing-lg" onClick={(e) => searchHandler(e, query)}>
          Search
        </span>
      </div>
    </div>

  );
};

PageSearch.propTypes = {
  onSearchTodo: PropTypes.func,
};

export default PageSearch;
