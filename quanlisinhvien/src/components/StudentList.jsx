// src/components/StudentList.jsx
import React, { useEffect, useState } from 'react';
import StudentItem from './StudentItem';

export default function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  const handleDelete = id => {
    if (window.confirm('Xác nhận xóa sinh viên này?')) {
      const updated = students.filter(s => s.id !== id);
      localStorage.setItem('students', JSON.stringify(updated));
      setStudents(updated);
    }
  };

  return (
    <table className="table table-striped table-hover">
      <thead className="table-primary">
        <tr>
          <th>ID</th><th>Họ và tên</th><th>Email</th><th>Năm nhập học</th>
          <th>Ngành</th><th>GPA</th><th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <StudentItem key={student.id} student={student} onDelete={handleDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
}
