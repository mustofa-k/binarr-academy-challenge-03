import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import axios from "axios";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const API_URL = "http://localhost:8000/todos";

  const [query, setQuery] = useState("");
  const [isRefresh, setIsRefresh] = useState(true);
  const [todos, setTodos] = useState([]);
  const [queryResults, setQueryResults] = useState([]);

  useEffect(() => {
    // Effek ini akan dijalankan ketika komponen dimuat (mount) dan saat isRefresh berubah menjadi false.
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL); // Mengambil data dari API.
        setTodos(response.data); // Menyimpan data yang diambil ke dalam state todos.
      } catch (err) {
        console.error(err); // Menangani kesalahan jika pengambilan data gagal.
      }
    };

    if (isRefresh) {
      fetchData(); // Memanggil fetchData
      setIsRefresh(false); // Setelah mengambil data, nonaktifkan isRefresh.
    }
  }, [isRefresh]);

  const addTodoHandler = async (text) => {
    try {
      const id = uuid(); // Membuat ID unik menggunakan library uuid.
      const todo = { id, task: text, complete: false }; // Membuat objek todo baru.
      await axios.post(API_URL, todo); // Mengirim data todo baru ke API.
      setIsRefresh(true); 
    } catch (err) {
      console.error(err); 
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Menghapus todo berdasarkan ID.
      setIsRefresh(true);
    } catch (err) {
      console.error(err); // Menangani kesalahan jika penghapusan gagal.
    }
  };

  const checkedTodoHandler = async (todo) => {
    try {
      todo.complete = !todo.complete; // Mengganti status complete todo.
      await axios.put(`${API_URL}/${todo.id}`, todo); // Mengupdate todo di API.
    } catch (err) {
      console.error(err);
    }
  };

  const editTodoHandler = async (todo, newTask) => {
    try {
      const updatedTodo = { ...todo, task: newTask }; // Membuat salinan todo dengan perubahan task.
      await axios.put(`${API_URL}/${todo.id}`, updatedTodo);
      setIsRefresh(true);
    } catch (err) {
      console.error(err);
    }
  };
  // Reset hasil pencarian jika query kosong.
  const searchHandler = (e, query) => {
    e.preventDefault();
    if (query.length === 0) {
      setQueryResults([]);
      return;
    }
    // Menyaring todos berdasarkan query pencarian.
    setQueryResults(todos.filter((todo) => todo.task.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <TodoContext.Provider
      value={{
        query,
        setQuery,
        queryResults,
        searchHandler,
        deleteTodoHandler,
        checkedTodoHandler,
        addTodoHandler,
        editTodoHandler,
        todos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

TodoContextProvider.propTypes = {
  children: PropTypes.node,
};
