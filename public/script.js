const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const courseInput = document.getElementById('course');
const studentIdInput = document.getElementById('studentId');
const studentTableBody = document.getElementById('studentTableBody');

const API_URL = "/api/students";
let students = [];

// Fetch students on load
window.onload = async () => {
  const res = await fetch(API_URL);
  students = await res.json();
  renderStudents();
};

// Form Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const studentData = {
    name: nameInput.value,
    course: courseInput.value
  };

  if (studentIdInput.value) {
    // Update
    const res = await fetch(`${API_URL}/${studentIdInput.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });
    const updated = await res.json();
    students = students.map(s => s._id === updated._id ? updated : s);
  } else {
    // Create
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });
    const created = await res.json();
    students.push(created);
  }

  form.reset();
  studentIdInput.value = "";
  renderStudents();
});

// Render student list
function renderStudents() {
  studentTableBody.innerHTML = "";
  students.forEach(({ _id, name, course }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${course}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="editStudent('${_id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteStudent('${_id}')">Delete</button>
      </td>
    `;
    studentTableBody.appendChild(row);
  });
}

// Edit student
window.editStudent = (id) => {
  const student = students.find(s => s._id === id);
  if (student) {
    nameInput.value = student.name;
    courseInput.value = student.course;
    studentIdInput.value = student._id;
  }
};

// Delete student
window.deleteStudent = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  students = students.filter(s => s._id !== id);
  renderStudents();
};
