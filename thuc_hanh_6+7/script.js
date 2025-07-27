const form       = document.getElementById('studentForm');
const tableBody  = document.getElementById('studentTableBody');
const thongBao   = document.getElementById('thongBao');
const btnSave    = document.getElementById('btnSave');
const btnReset   = document.getElementById('btnReset');
let selectedRow  = null;

function showMessage(msg) {
  thongBao.innerText = msg;
  setTimeout(() => thongBao.innerText = '', 3000);
}

function xoaDong(btn) {
  if (!confirm('Bạn có chắc chắn muốn xoá?')) return;
  btn.closest('tr').remove();
  rebuildStt();
  showMessage('Xoá thành công!');
  resetForm();
}

function suaDong(btn) {
  selectedRow = btn.closest('tr');
  document.getElementById('maSV').value     = selectedRow.cells[1].innerText;
  document.getElementById('hoTen').value    = selectedRow.cells[2].innerText;
  document.getElementById('email').value    = selectedRow.cells[3].innerText;
  document.querySelector(`input[name="gioiTinh"][value="${selectedRow.cells[4].innerText}"]`).checked = true;
  document.getElementById('ngaySinh').value = selectedRow.cells[5].innerText;
  document.getElementById('ghiChu').value   = selectedRow.cells[6]?.innerText || '';
  btnSave.innerText = 'Cập nhật';
}

function rebuildStt() {
  Array.from(tableBody.rows).forEach((row, i) => row.cells[0].innerText = i + 1);
}

function resetForm() {
  form.reset();
  selectedRow = null;
  btnSave.innerText = 'Thêm sinh viên';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const maSV     = document.getElementById('maSV').value.trim();
  const hoTen    = document.getElementById('hoTen').value.trim();
  const email    = document.getElementById('email').value.trim();
  const gioiTinh = document.querySelector('input[name="gioiTinh"]:checked')?.value;
  const ngaySinh = document.getElementById('ngaySinh').value;
  const ghiChu   = document.getElementById('ghiChu').value.trim();

  if (!maSV || !hoTen || !email || !gioiTinh || !ngaySinh) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  if (!(/^\S+@\S+\.\S+$/.test(email))) {
    alert('Email không hợp lệ!');
    return;
  }

  if (selectedRow) {
    selectedRow.cells[1].innerText = maSV;
    selectedRow.cells[2].innerText = hoTen;
    selectedRow.cells[3].innerText = email;
    selectedRow.cells[4].innerText = gioiTinh;
    selectedRow.cells[5].innerText = ngaySinh;
    selectedRow.cells[6].innerText = ghiChu;
    showMessage('Cập nhật thành công!');
  } else {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = tableBody.rows.length + 1;
    row.insertCell(1).innerText = maSV;
    row.insertCell(2).innerText = hoTen;
    row.insertCell(3).innerText = email;
    row.insertCell(4).innerText = gioiTinh;
    row.insertCell(5).innerText = ngaySinh;
    row.insertCell(6).innerText = ghiChu;
    row.insertCell(7).innerHTML = `
      <button onclick="suaDong(this)"><i class='fas fa-edit'></i></button>
      <button onclick="xoaDong(this)"><i class='fas fa-trash'></i></button>
    `;
    showMessage('Thêm sinh viên thành công!');
  }

  resetForm();
});

btnReset.addEventListener('click', resetForm);
