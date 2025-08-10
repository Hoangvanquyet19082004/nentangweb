// src/components/StudentForm.jsx
import React, { useEffect, useState } from 'react';

export default function StudentForm({ editMode, id, onClose }) {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    year: '',
    major: '',
    gpa: '',
    password: '',
    confirm: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && id) {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const found = students.find(s => s.id.toString() === id.toString());
      if (found) setStudent({ ...found, password: '', confirm: '' });
    }
  }, [editMode, id]);

  const validate = () => {
    const e = {};
    if (!student.name || student.name.length > 100) e.name = 'Tên không hợp lệ';
    if (!student.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) e.email = 'Email không hợp lệ';
    if (!student.year || student.year < 2000 || student.year > new Date().getFullYear()) e.year = 'Năm nhập học không hợp lệ';
    if (!student.major) e.major = 'Chưa chọn ngành học';
    if (!student.gpa || student.gpa < 0 || student.gpa > 4) e.gpa = 'GPA phải từ 0 đến 4';
    if (!student.password || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(student.password))
      e.password = 'Mật khẩu chưa đúng yêu cầu';
    if (!student.confirm || student.confirm !== student.password) e.confirm = 'Mật khẩu xác nhận không khớp';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const updatedStudent = {
      id: editMode ? id : Date.now().toString(),
      name: student.name,
      email: student.email,
      year: parseInt(student.year),
      major: student.major,
      gpa: parseFloat(student.gpa)
    };
    if (editMode) {
      const index = students.findIndex(s => s.id.toString() === id.toString());
      students[index] = updatedStudent;
    } else {
      students.push(updatedStudent);
    }
    localStorage.setItem('students', JSON.stringify(students));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-12">
        <label className="form-label">Họ và tên</label>
        <input
          type="text"
          className="form-control"
          value={student.name}
          onChange={e => setStudent({ ...student, name: e.target.value })}
        />
        {errors.name && <div className="text-danger small">{errors.name}</div>}
      </div>
      <div className="col-12">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={student.email}
          onChange={e => setStudent({ ...student, email: e.target.value })}
        />
        {errors.email && <div className="text-danger small">{errors.email}</div>}
      </div>
      <div className="col-6">
        <label className="form-label">Năm nhập học</label>
        <input
          type="number"
          className="form-control"
          value={student.year}
          onChange={e => setStudent({ ...student, year: e.target.value })}
        />
        {errors.year && <div className="text-danger small">{errors.year}</div>}
      </div>
      <div className="col-6">
        <label className="form-label">Ngành học</label>
        <select
          className="form-select"
          value={student.major}
          onChange={e => setStudent({ ...student, major: e.target.value })}
        >
          <option value="">-- Chọn ngành --</option>
          <option value="CNTT">Công nghệ thông tin</option>
          <option value="Kinh tế">Kinh tế</option>
          <option value="Y">Y</option>
          <option value="Luật">Luật</option>
          <option value="Ngôn ngữ">Ngôn ngữ</option>
        </select>
        {errors.major && <div className="text-danger small">{errors.major}</div>}
      </div>
      <div className="col-6">
        <label className="form-label">GPA</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={student.gpa}
          onChange={e => setStudent({ ...student, gpa: e.target.value })}
        />
        {errors.gpa && <div className="text-danger small">{errors.gpa}</div>}
      </div>
      <div className="col-12">
        <label className="form-label">Mật khẩu quản trị</label>
        <input
          type="password"
          className="form-control"
          value={student.password}
          onChange={e => setStudent({ ...student, password: e.target.value })}
        />
        {errors.password && <div className="text-danger small">{errors.password}</div>}
      </div>
      <div className="col-12">
        <label className="form-label">Xác nhận mật khẩu</label>
        <input
          type="password"
          className="form-control"
          value={student.confirm}
          onChange={e => setStudent({ ...student, confirm: e.target.value })}
        />
        {errors.confirm && <div className="text-danger small">{errors.confirm}</div>}
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-success">
          {editMode ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
        </button>
      </div>
    </form>
  );
}
