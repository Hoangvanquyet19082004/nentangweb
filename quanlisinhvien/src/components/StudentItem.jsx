// src/components/StudentItem.jsx
import React from 'react';

export default function StudentItem({ student, onDelete, onEdit }) {
  return (
    <tr>
      <td>#{student.id}</td>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.year}</td>
      <td>{student.major}</td>
      <td>{student.gpa}</td>
      <td>
        <button
          className="btn btn-sm btn-warning me-2"
          onClick={() => onEdit(student.id)}
        >
          Sửa
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(student.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}
