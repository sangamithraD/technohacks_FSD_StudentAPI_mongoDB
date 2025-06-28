# 🎓 Student Records API - TechnoHacks Internship Project

This project is a simple **CRUD Web Application** built as part of the **Full Stack Development Internship at TechnoHacks**. It allows users to manage student records using a clean UI and a RESTful backend.

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, Bootstrap 5, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (with Mongoose ODM)

## 🚀 Features

- Add new students
- View all students in a table
- Edit student details
- Delete student records
- RESTful API integration with MongoDB

## 📂 Folder Structure

technohacks-restapi-studentapi/
├── public/
│ ├── index.html
│ ├── script.js
│ └── style.css
├── models/
│ └── Student.js
├── .env
├── server.js
└── README.md
## ▶️ How to Run

1.Clone this repository:
git clone https://github.com/sangamithraD/technohacks_FSD_StudentAPI_mongoDB.git
cd technohacks-restapi-studentapi
2. Install dependencies:
npm install
3. Add your MongoDB URI in `.env`:
MONGO_URI=your_mongodb_connection_string
4. Start the server:
node server.js
5. Open the app:
http://localhost:3000/

## 📬 API Endpoints

- `GET /api/students` — Get all students  
- `POST /api/students` — Add a new student  
- `PUT /api/students/:id` — Update a student  
- `DELETE /api/students/:id` — Delete a student
  
### ✅ Developed by [Sangamithra D](https://github.com/sangamithraD)
Linkedin Post : https://www.linkedin.com/posts/sangamithra-d-8a4092301_task2-fullstackdevelopment-mernstack-activity-7344732724160528384-PoPr?utm_source=share&utm_medium=member_android&rcm=ACoAAE0Te3wBDPpSmrzX8PUb8qeOgFjMumrLltk


