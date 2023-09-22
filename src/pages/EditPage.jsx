import { ListTask } from "react-bootstrap-icons";
import { SkipBackward } from "react-bootstrap-icons";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TodoContext } from "../context/Context";

const EditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const todo = location.state.todo;
  const { editTodoHandler } = useContext(TodoContext);
  const [text, setText] = useState(todo.task);

  const Save = (e) => {
    e.preventDefault();
    editTodoHandler(todo, text);
    navigate("/");
  };

  return (
    <main className="container">
      <h2 className="text-center my-3">Edit Todo</h2>
      <form>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Add new task" value={text} onChange={(e) => setText(e.target.value)} aria-label="Search" aria-describedby="basic-addon1" />
          <span className="input-group-text color-primary" id="basic-addon1">
            <ListTask />
          </span>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            <SkipBackward />
          </button>
          <button className="btn color-primary w-100" onClick={Save}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditPage;
