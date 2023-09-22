import PropTypes from "prop-types"; // Import PropTypes untuk melakukan validasi prop.
import { useState } from "react"; // Import useState dari React untuk menggunakan state.
import { useNavigate } from "react-router-dom"; // Import useNavigate dari React Router untuk navigasi.
import { PencilFill, TrashFill } from "react-bootstrap-icons";

const PageItem = ({ todo, onDelete, onChecked }) => {
  const [isChecked, setIsChecked] = useState(todo.complete);
  // Buat state isChecked untuk mengontrol checkbox. Inisialisasi dengan nilai dari prop todo.

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    // Fungsi yang akan dipanggil saat checkbox berubah.
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    onChecked(todo);
  };

  const handleEditClick = () => navigate(`/${todo.id}/edit`, { state: { todo } });
  // Fungsi yang akan dipanggil saat tombol edit diklik. Langsung navigasikan ke halaman edit dengan data todo.

  return (
    <div className={`py-2 px-4 mb-2 d-flex align-items-center section-container ${isChecked && "completed-todo"}`}>
      <p className="w-100 mb-0">{todo.task}</p>

      <div className="d-flex">
        <div className="p-2 d-flex align-items-center justify-content-center">
          <input className="form-check-input" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        </div>
        <button className="btn text-warning" onClick={handleEditClick}>
          <PencilFill />
        </button>

        <button className="btn text-danger" onClick={() => onDelete(todo.id)}>
          <TrashFill />
        </button>
      </div>
    </div>
  );
};

PageItem.propTypes = {
  // Prop 'todo' harus berupa objek.
  todo: PropTypes.object,
  onDelete: PropTypes.func,
  onChecked: PropTypes.func,
};

export default PageItem;
