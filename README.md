# Course Selling Backend Web Application

A backend web application for an online course selling platform built with **Node.js**, **Express.js**, and **MongoDB**. This project provides secure authentication, role-based access control, and REST APIs for course creation, course listing, purchasing workflows, and purchased course management.

---

## Features

* **User Authentication** using JWT
* **Admin Authentication** for course management
* **Role-based Authorization**
* **Course Creation & Management**
* **Course Listing APIs**
* **Purchase Courses Workflow**
* **Purchased Courses Tracking**
* **MongoDB Integration** for scalable data storage
* **Protected Routes** with middleware

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT (JSON Web Token)
* **Tools:** Postman, Git, GitHub

---

## Project Structure

```bash
Course_Selling_Backend_WebApp/
├── config/          # Database configuration
├── middleware/      # Auth middleware
├── models/          # MongoDB schemas
├── routes/          # API routes (admin, user, course)
├── controllers/     # Business logic (if applicable)
├── .env             # Environment variables
├── index.js         # Entry point
└── package.json
```

---

## API Endpoints

### User Routes

* `POST /api/v1/user/signup` → Register user
* `POST /api/v1/user/signin` → Login user
* `GET /api/v1/user/courses` → Get all available courses
* `POST /api/v1/user/purchase` → Purchase course
* `GET /api/v1/user/purchasedCourses` → Get purchased courses

### Admin Routes

* `POST /api/v1/admin/signup` → Register admin
* `POST /api/v1/admin/signin` → Login admin
* `POST /api/v1/admin/course` → Create course
* `PUT /api/v1/admin/course/:id` → Update course
* `GET /api/v1/admin/courses` → Get all created courses

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Nitinjangir004/Course_Selling_Backend_WebApp.git
cd Course_Selling_Backend_WebApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the Server

```bash
npm start
```

Server will run on:

```bash
http://localhost:5000
```

---

## Testing

Use **Postman** or similar tools to test API endpoints.

---

## Learning Outcomes

* Built secure REST APIs with Express.js
* Learned JWT authentication and route protection
* Implemented MongoDB schemas and data relationships
* Improved backend architecture and API design skills

---

## Future Improvements

* Add payment gateway integration
* Add course reviews and ratings
* Add file upload for course thumbnails
* Deploy backend on cloud (AWS / Render)

---

## Author

**Nitin Jangir**

* GitHub: [https://github.com/Nitinjangir004](https://github.com/Nitinjangir004)
* LinkedIn: [https://www.linkedin.com/in/nitin-jangir-023a11289](https://www.linkedin.com/in/nitin-jangir-023a11289)
