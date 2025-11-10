Here’s your **clean, final, and professionally structured README.md** —
fully fixed, duplicates removed, and including your **Atlas URI section**.
You can copy-paste this as your project’s complete README.

---

# 🖼️ Online Poster Designer

A **full-stack Online Poster Designer** built with **Node.js (Express)**, **MongoDB (Atlas)**, and **React.js**.
Features include **user authentication**, **JWT-based security**, and a **poster design editor**.

---

## ⚙️ Prerequisites

* Node.js v14 or higher
* MongoDB Atlas (or local MongoDB)

---

## 🚀 Quick Setup

### 1️⃣ Install Dependencies

```bash
npm run install:all
```

### 2️⃣ Environment Setup

This project already includes a working MongoDB Atlas connection.
You **don’t need to change the `.env` file** — just run it.

```
PORT=5000
MONGO_URI=mongodb+srv://ishika:Ishika%40123@cluster0.7bw3kd1.mongodb.net/fullstack-auth?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

✅ Works for everyone since MongoDB Atlas access is set to `0.0.0.0/0`.

**Run backend:**

```bash
cd backend
npm install
npm run dev
```

If it doesn’t connect, create your own `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=mysecretkey123
NODE_ENV=development
```

and use your own MongoDB Atlas cluster (you can create one for free at [https://cloud.mongodb.com](https://cloud.mongodb.com)).

---

## 🧩 Running the Application

### Option 1 — Run both frontend and backend together

```bash
npm run dev
```

* Backend → [http://localhost:5000](http://localhost:5000)
* Frontend → [http://localhost:3000](http://localhost:3000)
  *(Frontend might take 10–15 seconds to load)*

### Option 2 — Run manually

```bash
cd backend
npm run dev
```

and in another terminal:

```bash
cd frontend
npm run dev
```

---

## 📂 Project Structure

```
Online-Poster-Designer/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── designController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Design.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── designs.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── NewHome.js
│   │   │   ├── Editor.js
│   │   │   └── CanvaEditor.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── styles/
│   │   │   └── theme.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json
```

---

## 🛠️ Available Scripts

| Command               | Description                                        |
| --------------------- | -------------------------------------------------- |
| `npm run dev`         | Start both frontend and backend concurrently       |
| `npm run install:all` | Install all dependencies (root, backend, frontend) |
| `npm run build`       | Build frontend for production                      |
| `npm start`           | Start backend in production mode                   |

---

## 🔌 API Endpoints

### Authentication

* `POST /api/auth/register` → Register a new user
* `POST /api/auth/login` → Login user
* `GET /api/auth/profile` → Get logged-in user profile

### Designs

* `GET /api/designs` → Get user designs
* `POST /api/designs` → Create a new design
* `GET /api/designs/:id` → Get design by ID
* `PUT /api/designs/:id` → Update design
* `DELETE /api/designs/:id` → Delete design

---

## ⚙️ Technologies Used

### Backend

* **Node.js** + **Express.js**
* **MongoDB Atlas** + **Mongoose**
* **JWT** for authentication
* **bcryptjs** for password hashing
* **dotenv**, **cors**, **nodemon**

### Frontend

* **React 18**
* **React Router DOM**
* **Context API** for authentication state
* **Axios** for API calls
* **CSS3**, **Tailwind**, **Create React App**

### Development Tools

* **Concurrently** for running both servers
* **ESLint** for linting
* **Webpack** (via CRA)

---

## 🧠 Troubleshooting

### Port Conflicts

* Change backend port in `/backend/.env` if 5000 is busy.
* Change frontend port in `/frontend/.env` if 3000 is busy.

### MongoDB Issues

* If connection fails, verify the Atlas cluster is active.
* Check IP access settings or create your own cluster.

### Dependencies

```bash
rm -rf node_modules package-lock.json
npm run install:all
```

---

## 🧩 Usage

1. Run `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Register or log in
4. Create, edit, and manage your posters!

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🆘 Support

If you face any issue:

1. Check troubleshooting section
2. Ensure MongoDB is reachable
3. Confirm environment variables are correct
4. Re-install dependencies

---

✅ *Ready to copy this as your final `README.md` for GitHub — perfectly formatted and deploy-ready.*
