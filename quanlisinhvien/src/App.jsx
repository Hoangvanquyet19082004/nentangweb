// src/App.jsx
import React, { useEffect, useState } from 'react';
import studentsData from './data';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

export default function App() {
  const [ready, setReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const existing = localStorage.getItem('students');
    if (!existing) {
      localStorage.setItem('students', JSON.stringify(studentsData));
    }
    setReady(true);
  }, []);

  const handleAdd = () => {
    setEditMode(false);
    setEditId(null);
    setShowModal(true);
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setEditId(id);
    setShowModal(true);
  };

  if (!ready) {
    return <div>Đang khởi tạo dữ liệu…</div>;
  }

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Quản lý Sinh viên</a>
          <div>
            <button className="btn btn-outline-primary me-2" onClick={handleAdd}>
              Thêm sinh viên
            </button>
          </div>
        </div>
      </nav>

      <StudentList onEdit={handleEdit} />

      {/* Modal Bootstrap */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? 'Sửa sinh viên' : 'Thêm sinh viên'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <StudentForm
                  editMode={editMode}
                  id={editId}
                  onClose={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
