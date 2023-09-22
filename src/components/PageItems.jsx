/* eslint-disable no-mixed-spaces-and-tabs */
import PageItem from "./PageItem";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../context/Context";
import { useState } from "react";
import { useContext } from "react";


const PageItems = () => {
  const { todos, queryResults, deleteTodoHandler, checkedTodoHandler,} = useContext(TodoContext);

  const [filter, setFilter] = useState("all");

  const results = queryResults.length !== 0 ? queryResults : todos;

  const filteredTodos = filter === "all" ? results : filter === "done" ? results.filter((todo) => todo.complete === true) : filter === "todo" && results.filter((todo) => todo.complete === false);

  const navigate = useNavigate();

  return (
    
    <section className="mb-5">
      <div className="filter-container">
      <h2 className="text-center mb-3">TodoList</h2>
      <div className="d-flex flex-row gap-4 mb-2">
        <button className="btn w-100 color-primary" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn w-100 color-primary" onClick={() => setFilter("done")}>
          Done
        </button>
        <button className="btn w-100 color-primary" onClick={() => setFilter("todo")}>
          Todo
        </button>
		<button className="btn color-primary w-100" onClick={() => navigate("new")}>
          Add new Task
        </button>
      </div>
	  </div>
      <ul className="list-unstyled">
        {filteredTodos.length !== 0 ? (
          [...filteredTodos].reverse().map((todo) => (
            <li key={todo.id}>
              <PageItem todo={todo} onDelete={deleteTodoHandler} onChecked={checkedTodoHandler} />
            </li>
          ))
        ) : (
          <h3 className="text-center p-5 my-3 border border-1 rounded-2 text-black-50">No task available</h3>
        )}
      </ul>
      
    </section>
  );
};

PageItem.propTypes = {
  todos: PropTypes.array,
  onDelete: PropTypes.func,
  onChecked: PropTypes.func,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

export default PageItems;
