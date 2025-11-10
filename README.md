# Fullstack Authentication App# Fullstack Authentication App# Fullstack Authentication App# Fullstack Authentication App# Fullstack Authentication App# Fullstack Authentication App



A complete authentication system with Node.js/Express backend and React frontend featuring user authentication and design editor.



## PrerequisitesA complete authentication system with Node.js/Express backend and React frontend featuring user authentication and design editor.



- Node.js (v14 or higher)

- MongoDB (local or MongoDB Atlas)

## PrerequisitesA complete authentication system with Node.js/Express backend and React frontend featuring user authentication and design editor.

## Quick Setup



### 1. Install Dependencies

```bash- Node.js (v14 or higher)

npm run install:all

```- MongoDB (local or MongoDB Atlas)



### 2. Environment Setup## PrerequisitesA complete authentication system with Node.js/Express backend and React frontend featuring user authentication and design editor.

Create `.env` file in `/backend` directory:

```env## Quick Setup

MONGO_URI=mongodb://localhost:27017/fullstack-auth

JWT_SECRET=your-secret-key-here

PORT=5000

```### 1. Install Dependencies



### 3. Run the Application```bash- Node.js (v14 or higher)

```bash

npm run devnpm run install:all

```

```- MongoDB (local or MongoDB Atlas)

This starts:

- Backend: http://localhost:5000

- Frontend: http://localhost:3000

### 2. Environment Setup## PrerequisitesA complete authentication system with Node.js/Express backend and React frontend featuring user authentication and design editor.A complete authentication system with Node.js/Express backend and React frontend featuring user authentication and design editor.

## Available Scripts

Create `.env` file in `/backend` directory:

- `npm run dev` - Start both frontend and backend

- `npm run install:all` - Install all dependencies```env## Quick Setup

- `npm run build` - Build frontend for production

MONGO_URI=mongodb://localhost:27017/fullstack-auth

## Manual Setup (Alternative)

JWT_SECRET=your-secret-key-here

### Backend

```bashPORT=5000

cd backend

npm install```### 1. Install Dependencies

npm run dev

```



### Frontend### 3. Run the Application```bash- Node.js (v14 or higher)

```bash

cd frontend```bash

npm install

npm startnpm run devnpm run install:all

```

```

## Project Structure

```- MongoDB (local or MongoDB Atlas)

```

fullstack-auth-app/This starts:

├── backend/

│   ├── config/- Backend: http://localhost:5000

│   │   └── database.js         # MongoDB connection

│   ├── controllers/- Frontend: http://localhost:3000

│   │   ├── authController.js   # Authentication logic

│   │   └── designController.js # Design management### 2. Environment Setup## Prerequisites## Prerequisites

│   ├── middleware/

│   │   └── auth.js             # JWT verification## Available Scripts

│   ├── models/

│   │   ├── User.js             # User modelCreate `.env` file in `/backend` directory:

│   │   └── Design.js           # Design model

│   ├── routes/- `npm run dev` - Start both frontend and backend

│   │   ├── auth.js             # Authentication routes

│   │   └── designs.js          # Design routes- `npm run install:all` - Install all dependencies```env## Quick Setup

│   ├── utils/

│   │   └── generateToken.js    # JWT token generation- `npm run build` - Build frontend for production

│   ├── package.json

│   └── server.js               # Express serverMONGO_URI=mongodb://localhost:27017/fullstack-auth

├── frontend/

│   ├── public/## Manual Setup (Alternative)

│   │   └── index.html

│   ├── src/JWT_SECRET=your-secret-key-here

│   │   ├── components/

│   │   │   ├── Dashboard.js### Backend

│   │   │   ├── Login.js

│   │   │   └── Register.js```bashPORT=5000

│   │   ├── context/

│   │   │   └── AuthContext.js   # Authentication contextcd backend

│   │   ├── pages/

│   │   │   ├── Home.jsnpm install```### 1. Install Dependencies

│   │   │   ├── NewHome.js

│   │   │   ├── Editor.jsnpm run dev

│   │   │   └── CanvaEditor.js   # Design editor

│   │   ├── services/```

│   │   │   └── authService.js   # API service

│   │   ├── styles/

│   │   │   └── theme.css        # Global styles

│   │   ├── App.js### Frontend### 3. Run the Application```bash- Node.js (v14 or higher)- Node.js (v14 or higher)

│   │   └── index.js

│   └── package.json```bash

├── package.json                 # Root package.json for dev scripts

└── README.mdcd frontend```bash

```

npm install

## Environment Variables

npm startnpm run devnpm run install:all

### Backend (.env file in `/backend` directory)

```env```

MONGO_URI=mongodb://localhost:27017/fullstack-auth

JWT_SECRET=your-very-long-secret-key-here-make-it-complex```

PORT=5000

NODE_ENV=development## Project Structure

```

```- MongoDB (local or MongoDB Atlas)- MongoDB (local or MongoDB Atlas)

### Frontend (.env file in `/frontend` directory)

```env```

PORT=3000

REACT_APP_API_URL=http://localhost:5000/apifullstack-auth-app/This starts:

```

├── backend/

## MongoDB Setup Options

│   ├── config/- Backend: http://localhost:5000

### Option 1: Local MongoDB

1. Install MongoDB Community Edition│   │   └── database.js         # MongoDB connection

2. Start MongoDB service

3. Use connection string: `mongodb://localhost:27017/fullstack-auth`│   ├── controllers/- Frontend: http://localhost:3000



### Option 2: MongoDB Atlas (Cloud)│   │   ├── authController.js   # Authentication logic

1. Create account at https://mongodb.com/atlas

2. Create a cluster│   │   └── designController.js # Design management### 2. Environment Setup

3. Get connection string and replace in `.env` file

4. Update connection string format:│   ├── middleware/

   ```env

   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fullstack-auth?retryWrites=true&w=majority│   │   └── auth.js             # JWT verification## Available Scripts

   ```

│   ├── models/

## API Endpoints

│   │   ├── User.js             # User modelCreate `.env` file in `/backend` directory:

### Authentication

- `POST /api/auth/register` - Register a new user│   │   └── Design.js           # Design model

- `POST /api/auth/login` - Login user

- `GET /api/auth/profile` - Get user profile (protected)│   ├── routes/- `npm run dev` - Start both frontend and backend



### Designs│   │   ├── auth.js             # Authentication routes

- `GET /api/designs` - Get user's designs (protected)

- `POST /api/designs` - Create new design (protected)│   │   └── designs.js          # Design routes- `npm run install:all` - Install all dependencies```env## Quick Setup## Quick Setup

- `GET /api/designs/:id` - Get specific design (protected)

- `PUT /api/designs/:id` - Update design (protected)│   ├── utils/

- `DELETE /api/designs/:id` - Delete design (protected)

│   │   └── generateToken.js    # JWT token generation- `npm run build` - Build frontend for production

## Usage

│   ├── package.json

1. **Start the application** using `npm run dev` from the root directory

2. **Open your browser** and visit http://localhost:3000│   └── server.js               # Express serverMONGO_URI=mongodb://localhost:27017/fullstack-auth

3. **Register a new account** or login with existing credentials

4. **Access the dashboard** after successful authentication├── frontend/

5. **Use the design editor** to create and manage designs

│   ├── public/## Manual Setup (Alternative)

## Technologies Used

│   │   └── index.html

### Backend

- Express.js - Web framework│   ├── src/JWT_SECRET=your-secret-key-here

- MongoDB with Mongoose - Database

- JSON Web Tokens (JWT) - Authentication│   │   ├── components/

- bcryptjs - Password hashing

- CORS - Cross-origin requests│   │   │   ├── Dashboard.js### Backend

- dotenv - Environment variables

- nodemon - Development server│   │   │   ├── Login.js



### Frontend│   │   │   └── Register.js```bashPORT=5001

- React 18 - UI framework

- React Router DOM - Client-side routing│   │   ├── context/

- Context API - State management

- Axios - HTTP requests│   │   │   └── AuthContext.js   # Authentication contextcd backend

- CSS3 - Styling

- Create React App - Build tooling│   │   ├── pages/



### Development Tools│   │   │   ├── Home.jsnpm install```### 1. Install Dependencies### 1. Install Dependencies

- Concurrently - Run multiple scripts

- ESLint - Code linting│   │   │   ├── NewHome.js

- Webpack - Module bundling (via CRA)

│   │   │   ├── Editor.jsnpm run dev

## Troubleshooting

│   │   │   └── CanvaEditor.js   # Design editor

### Port Conflicts

- If port 3000 is in use, React will automatically suggest the next available port│   │   ├── services/```

- If port 5000 is in use, modify the `PORT` value in `/backend/.env`

│   │   │   └── authService.js   # API service

### MongoDB Connection Issues

- Ensure MongoDB is running locally, or│   │   ├── styles/

- Check your MongoDB Atlas connection string

- Verify network access and firewall settings│   │   │   └── theme.css        # Global styles



### Dependencies Issues│   │   ├── App.js### Frontend### 3. Run the Application```bash```bash

- Run `npm run install:all` to ensure all dependencies are installed

- Clear node_modules and reinstall if needed:│   │   └── index.js

  ```bash

  rm -rf node_modules package-lock.json│   └── package.json```bash

  npm run install:all

  ```├── package.json                 # Root package.json for dev scripts



### Build Issues└── README.mdcd frontend```bash

- Check Node.js version (should be v14+)

- Ensure all environment variables are properly set```

- Check console for specific error messages

npm install

## Contributing

## Environment Variables

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/amazing-feature`)npm startnpm run devnpm run install:allnpm run install:all

3. Commit your changes (`git commit -m 'Add amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)### Backend (.env file in `/backend` directory)

5. Open a Pull Request

```env```

## License

MONGO_URI=mongodb://localhost:27017/fullstack-auth

This project is licensed under the MIT License.

JWT_SECRET=your-very-long-secret-key-here-make-it-complex```

## Support

PORT=5000

If you encounter any issues:

1. Check the troubleshooting section aboveNODE_ENV=development## Project Structure

2. Ensure all prerequisites are installed

3. Verify environment variables are correctly set```

4. Check that ports 3000 and 5000 are available
``````

### Frontend (.env file in `/frontend` directory - optional)

```env```

REACT_APP_API_URL=http://localhost:5000/api

```fullstack-auth-app/This starts:



## MongoDB Setup Options├── backend/



### Option 1: Local MongoDB│   ├── config/- Backend: http://localhost:5001

1. Install MongoDB Community Edition

2. Start MongoDB service│   │   └── database.js         # MongoDB connection

3. Use connection string: `mongodb://localhost:27017/fullstack-auth`

│   ├── controllers/- Frontend: http://localhost:3000

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://mongodb.com/atlas│   │   ├── authController.js   # Authentication logic

2. Create a cluster

3. Get connection string and replace in `.env` file│   │   └── designController.js # Design management### 2. Environment Setup### 2. Environment Setup

4. Update connection string format:

   ```env│   ├── middleware/

   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fullstack-auth?retryWrites=true&w=majority

   ```│   │   └── auth.js             # JWT verification## Available Scripts



## API Endpoints│   ├── models/



### Authentication│   │   ├── User.js             # User modelCreate `.env` file in `/backend` directory:Create `.env` file in `/backend` directory:

- `POST /api/auth/register` - Register a new user

- `POST /api/auth/login` - Login user│   │   └── Design.js           # Design model

- `GET /api/auth/profile` - Get user profile (protected)

│   ├── routes/- `npm run dev` - Start both frontend and backend

### Designs

- `GET /api/designs` - Get user's designs (protected)│   │   ├── auth.js             # Authentication routes

- `POST /api/designs` - Create new design (protected)

- `GET /api/designs/:id` - Get specific design (protected)│   │   └── designs.js          # Design routes- `npm run install:all` - Install all dependencies```env```env

- `PUT /api/designs/:id` - Update design (protected)

- `DELETE /api/designs/:id` - Delete design (protected)│   ├── utils/



## Usage│   │   └── generateToken.js    # JWT token generation- `npm run build` - Build frontend for production



1. **Start the application** using `npm run dev` from the root directory│   ├── package.json

2. **Open your browser** and visit http://localhost:3000

3. **Register a new account** or login with existing credentials│   └── server.js               # Express serverMONGO_URI=mongodb://localhost:27017/fullstack-authMONGO_URI=mongodb://localhost:27017/fullstack-auth

4. **Access the dashboard** after successful authentication

5. **Use the design editor** to create and manage designs├── frontend/



## Technologies Used│   ├── public/## Manual Setup (Alternative)



### Backend│   │   └── index.html

- Express.js - Web framework

- MongoDB with Mongoose - Database│   ├── src/JWT_SECRET=your-secret-key-hereJWT_SECRET=your-secret-key-here

- JSON Web Tokens (JWT) - Authentication

- bcryptjs - Password hashing│   │   ├── components/

- CORS - Cross-origin requests

- dotenv - Environment variables│   │   │   ├── Dashboard.js### Backend

- nodemon - Development server

│   │   │   ├── Login.js

### Frontend

- React 18 - UI framework│   │   │   └── Register.js```bashPORT=5001PORT=5001

- React Router DOM - Client-side routing

- Context API - State management│   │   ├── context/

- Axios - HTTP requests

- CSS3 - Styling│   │   │   └── AuthContext.js   # Authentication contextcd backend

- Create React App - Build tooling

│   │   ├── pages/

### Development Tools

- Concurrently - Run multiple scripts│   │   │   ├── Home.jsnpm install``````

- ESLint - Code linting

- Webpack - Module bundling (via CRA)│   │   │   ├── NewHome.js



## Troubleshooting│   │   │   ├── Editor.jsnpm run dev



### Port Conflicts│   │   │   └── CanvaEditor.js   # Design editor

- If port 3000 is in use, React will automatically suggest the next available port

- If port 5000 is in use, modify the `PORT` value in `/backend/.env`│   │   ├── services/```



### MongoDB Connection Issues│   │   │   └── authService.js   # API service

- Ensure MongoDB is running locally, or

- Check your MongoDB Atlas connection string│   │   ├── styles/

- Verify network access and firewall settings

│   │   │   └── theme.css        # Global styles

### Dependencies Issues

- Run `npm run install:all` to ensure all dependencies are installed│   │   ├── App.js### Frontend### 3. Run the Application### 

- Clear node_modules and reinstall if needed:

  ```bash│   │   └── index.js

  rm -rf node_modules package-lock.json

  npm run install:all│   └── package.json```bash

  ```

├── package.json                 # Root package.json for dev scripts

### Build Issues

- Check Node.js version (should be v14+)└── README.mdcd frontend```bash```bash

- Ensure all environment variables are properly set

- Check console for specific error messages```



## Contributingnpm install



1. Fork the repository## Environment Variables

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)npm startnpm run dev in frondend in one terminal and npm run in  backend in another terminal

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request### Backend (.env file in `/backend` directory)



## License```env```



This project is licensed under the MIT License.MONGO_URI=mongodb://localhost:27017/fullstack-auth



## SupportJWT_SECRET=your-very-long-secret-key-here-make-it-complex``````



If you encounter any issues:PORT=5000

1. Check the troubleshooting section above

2. Ensure all prerequisites are installedNODE_ENV=development## Project Structure

3. Verify environment variables are correctly set

4. Check that ports 3000 and 5000 are available```



### Frontend (.env file in `/frontend` directory - optional)

```env```

REACT_APP_API_URL=http://localhost:5000/api

```fullstack-auth-app/This starts:This starts:



## MongoDB Setup Options├── backend/



### Option 1: Local MongoDB│   ├── config/ Backend: http://localhost:5001

1. Install MongoDB Community Edition

2. Start MongoDB service│   │   └── database.js         # MongoDB connection

3. Use connection string: `mongodb://localhost:27017/fullstack-auth`

│   ├── controllers/ Frontend: http://localhost:3001

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://mongodb.com/atlas│   │   ├── authController.js   # Authentication logic

2. Create a cluster

3. Get connection string and replace in `.env` file│   │   └── designController.js # Design management

4. Update connection string format:

   ```env│   ├── middleware/

   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fullstack-auth?retryWrites=true&w=majority

   ```│   │   └── auth.js             # JWT verification## Available Scripts## Available Scripts



## API Endpoints│   ├── models/



### Authentication│   │   ├── User.js             # User model

- `POST /api/auth/register` - Register a new user

- `POST /api/auth/login` - Login user│   │   └── Design.js           # Design model

- `GET /api/auth/profile` - Get user profile (protected)

│   ├── routes/- `npm run dev` - Start both frontend and backend- `npm run dev` - Start both frontend and backend

### Designs

- `GET /api/designs` - Get user's designs (protected)│   │   ├── auth.js             # Authentication routes

- `POST /api/designs` - Create new design (protected)

- `GET /api/designs/:id` - Get specific design (protected)│   │   └── designs.js          # Design routes- `npm run install:all` - Install all dependencies- `npm run install:all` - Install all dependencies

- `PUT /api/designs/:id` - Update design (protected)

- `DELETE /api/designs/:id` - Delete design (protected)│   ├── utils/



## Usage│   │   └── generateToken.js    # JWT token generation- `npm run build` - Build frontend for production- `npm run build` - Build frontend for production



1. **Start the application** using `npm run dev` from the root directory│   ├── package.json

2. **Open your browser** and visit http://localhost:3000

3. **Register a new account** or login with existing credentials│   └── server.js               # Express server

4. **Access the dashboard** after successful authentication

5. **Use the design editor** to create and manage designs├── frontend/



## Technologies Used│   ├── public/## Manual Setup (Alternative)## Manual Setup (Alternative)



### Backend│   │   └── index.html

- Express.js - Web framework

- MongoDB with Mongoose - Database│   ├── src/

- JSON Web Tokens (JWT) - Authentication

- bcryptjs - Password hashing│   │   ├── components/

- CORS - Cross-origin requests

- dotenv - Environment variables│   │   │   ├── Dashboard.js### Backend### Backend

- nodemon - Development server

│   │   │   ├── Login.js

### Frontend

- React 18 - UI framework│   │   │   └── Register.js```bash```bash

- React Router DOM - Client-side routing

- Context API - State management│   │   ├── context/

- Axios - HTTP requests

- CSS3 - Styling│   │   │   └── AuthContext.js   # Authentication contextcd backendcd backend

- Create React App - Build tooling

│   │   ├── pages/

### Development Tools

- Concurrently - Run multiple scripts│   │   │   ├── Home.jsnpm installnpm install

- ESLint - Code linting

- Webpack - Module bundling (via CRA)│   │   │   ├── NewHome.js



## Troubleshooting│   │   │   ├── Editor.jsnpm run devnpm run dev



### Port Conflicts│   │   │   └── CanvaEditor.js   # Design editor

- If port 3000 is in use, React will automatically suggest the next available port

- If port 5000 is in use, modify the `PORT` value in `/backend/.env`│   │   ├── services/``````



### MongoDB Connection Issues│   │   │   └── authService.js   # API service

- Ensure MongoDB is running locally, or

- Check your MongoDB Atlas connection string│   │   ├── styles/

- Verify network access and firewall settings

│   │   │   └── theme.css        # Global styles

### Dependencies Issues

- Run `npm run install:all` to ensure all dependencies are installed│   │   ├── App.js### Frontend### Frontend

- Clear node_modules and reinstall if needed:

  ```bash│   │   └── index.js

  rm -rf node_modules package-lock.json

  npm run install:all│   └── package.json```bash```bash

  ```

├── package.json                 # Root package.json for dev scripts

### Build Issues

- Check Node.js version (should be v14+)└── README.mdcd frontendcd frontend

- Ensure all environment variables are properly set

- Check console for specific error messages```



## Contributingnpm installnpm install



1. Fork the repository## Environment Variables

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)npm run devnpm run dev

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request### Backend (.env file in `/backend` directory)



## License```env``````



This project is licensed under the MIT License.MONGO_URI=mongodb://localhost:27017/fullstack-auth



## SupportJWT_SECRET=your-very-long-secret-key-here-make-it-complex



If you encounter any issues:PORT=5001

1. Check the troubleshooting section above

2. Ensure all prerequisites are installedNODE_ENV=development## Technologies## Technologies

3. Verify environment variables are correctly set

4. Check that ports 3000 and 5000 are available```



### Frontend (.env file in `/frontend` directory - optional)

```env**Backend:** Express.js, MongoDB, JWT, bcryptjs  **Backend:** Express.js, MongoDB, JWT, bcryptjs  

REACT_APP_API_URL=http://localhost:5001/api

```**Frontend:** React, Context API, Axios  **Frontend:** React, Context API, Axios  



## MongoDB Setup Options**Dev Tools:** Concurrently, Nodemon**Dev Tools:** Concurrently, Nodemon



### Option 1: Local MongoDB

1. Install MongoDB Community Edition

2. Start MongoDB service## Troubleshooting## Troubleshooting

3. Use connection string: `mongodb://localhost:27017/fullstack-auth`



### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://mongodb.com/atlas- **Port conflicts:** Change ports in `.env` files- **Port conflicts:** Change ports in `.env` files

2. Create a cluster

3. Get connection string and replace in `.env` file- **MongoDB issues:** Ensure MongoDB is running or check Atlas connection- **MongoDB issues:** Ensure MongoDB is running or check Atlas connection

4. Update connection string format:

   ```env- **Dependencies:** Run `npm run install:all`- **Dependencies:** Run `npm run install:all`

   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fullstack-auth?retryWrites=true&w=majority│   ├── controllers/

   ```│   │   ├── authController.js   # Authentication logic

│   │   └── designController.js # Design management

## API Endpoints│   ├── middleware/

│   │   └── auth.js             # JWT verification

### Authentication│   ├── models/

- `POST /api/auth/register` - Register a new user│   │   ├── User.js             # User model

- `POST /api/auth/login` - Login user│   │   └── Design.js           # Design model

- `GET /api/auth/profile` - Get user profile (protected)│   ├── routes/

│   │   ├── auth.js             # Authentication routes

### Designs│   │   └── designs.js          # Design routes

- `GET /api/designs` - Get user's designs (protected)│   ├── utils/

- `POST /api/designs` - Create new design (protected)│   │   └── generateToken.js    # JWT token generation

- `GET /api/designs/:id` - Get specific design (protected)│   ├── package.json

- `PUT /api/designs/:id` - Update design (protected)│   └── server.js               # Express server

- `DELETE /api/designs/:id` - Delete design (protected)├── frontend/

│   ├── public/

## Usage│   │   └── index.html

│   ├── src/

1. **Start the application** using `npm run dev` from the root directory│   │   ├── components/

2. **Open your browser** and visit http://localhost:3000│   │   │   ├── Dashboard.js

3. **Register a new account** or login with existing credentials│   │   │   ├── Login.js

4. **Access the dashboard** after successful authentication│   │   │   └── Register.js

5. **Use the design editor** to create and manage designs│   │   ├── context/

│   │   │   └── AuthContext.js   # Authentication context

## Technologies Used│   │   ├── pages/

│   │   │   ├── Home.js

### Backend│   │   │   ├── NewHome.js

- Express.js - Web framework│   │   │   ├── Editor.js

- MongoDB with Mongoose - Database│   │   │   └── CanvaEditor.js   # Design editor

- JSON Web Tokens (JWT) - Authentication│   │   ├── services/

- bcryptjs - Password hashing│   │   │   └── authService.js   # API service

- CORS - Cross-origin requests│   │   ├── styles/

- dotenv - Environment variables│   │   │   └── theme.css        # Global styles

- nodemon - Development server│   │   ├── App.js

│   │   └── index.js

### Frontend│   └── package.json

- React 18 - UI framework├── package.json                 # Root package.json for dev scripts

- React Router DOM - Client-side routing└── README.md

- Context API - State management```

- Axios - HTTP requests

- CSS3 - Styling## Quick Start

- Create React App - Build tooling

### Method 1: Run Everything with One Command (Recommended)

### Development Tools

- Concurrently - Run multiple scripts1. **Clone the repository**

- ESLint - Code linting   ```bash

- Webpack - Module bundling (via CRA)   git clone <your-repo-url>

   cd fullstack-auth-app

## Troubleshooting   ```



### Port Conflicts2. **Install all dependencies**

- If port 3000 is in use, React will automatically suggest the next available port   ```bash

- If port 5001 is in use, modify the `PORT` value in `/backend/.env`   npm run install:all

   ```

### MongoDB Connection Issues

- Ensure MongoDB is running locally, or3. **Set up environment variables**

- Check your MongoDB Atlas connection string   Create a `.env` file in the `backend` directory:

- Verify network access and firewall settings   ```env

   MONGO_URI=mongodb://localhost:27017/fullstack-auth

### Dependencies Issues   JWT_SECRET=your-secret-key-here

- Run `npm run install:all` to ensure all dependencies are installed   PORT=5001

- Clear node_modules and reinstall if needed:   ```

  ```bash

  rm -rf node_modules package-lock.json4. **Start the entire application**

  npm run install:all   ```bash

  ```   npm run dev

   ```

### Build Issues   

- Check Node.js version (should be v14+)   This will start:

- Ensure all environment variables are properly set   - Backend server on http://localhost:5001

- Check console for specific error messages   - Frontend development server on http://localhost:3001



## Contributing### Method 2: Manual Setup (Alternative)



1. Fork the repositoryIf you prefer to run frontend and backend separately:

2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)#### Backend Setup

4. Push to the branch (`git push origin feature/amazing-feature`)1. Navigate to backend directory:

5. Open a Pull Request   ```bash

   cd backend

## License   ```



This project is licensed under the MIT License.2. Install dependencies:

   ```bash

## Support   npm install

   ```

If you encounter any issues:

1. Check the troubleshooting section above3. Create `.env` file with the environment variables shown above

2. Ensure all prerequisites are installed

3. Verify environment variables are correctly set4. Start the backend server:

4. Check that ports 3000 and 5001 are available   ```bash
   npm run dev
   ```
   Backend will run on http://localhost:5001

#### Frontend Setup
1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3001

## Available Scripts

### Root Level Commands
- `npm run dev` - Start both frontend and backend concurrently
- `npm run install:all` - Install dependencies for root, backend, and frontend
- `npm run build` - Build frontend for production
- `npm start` - Start backend in production mode

### Frontend Commands (from `/frontend`)
- `npm run dev` - Start frontend development server on port 3001
- `npm start` - Start frontend development server (default port)
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend Commands (from `/backend`)
- `npm run dev` - Start backend with nodemon for development
- `npm start` - Start backend in production mode

## Environment Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### MongoDB Setup Options

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/fullstack-auth`

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://mongodb.com/atlas
2. Create a cluster
3. Get connection string and replace in `.env` file
4. Update connection string format:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fullstack-auth?retryWrites=true&w=majority
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Designs
- `GET /api/designs` - Get user's designs (protected)
- `POST /api/designs` - Create new design (protected)
- `GET /api/designs/:id` - Get specific design (protected)
- `PUT /api/designs/:id` - Update design (protected)
- `DELETE /api/designs/:id` - Delete design (protected)

## Environment Variables

### Backend (.env file in `/backend` directory)
```env
MONGO_URI=mongodb://localhost:27017/fullstack-auth
JWT_SECRET=your-very-long-secret-key-here-make-it-complex
PORT=5001
NODE_ENV=development
```

### Frontend (.env file in `/frontend` directory)
```env
PORT=3001
REACT_APP_API_URL=http://localhost:5001/api
```

## Usage

1. **Start the application** using `npm run dev` from the root directory
2. **Open your browser** and visit http://localhost:3001
3. **Register a new account** or login with existing credentials
4. **Access the dashboard** after successful authentication
5. **Use the design editor** to create and manage designs

## Host Access

The frontend is configured to run with host access enabled. When you run `npm run dev`, you'll see output like:

```
Local:            http://localhost:3001
On Your Network:  http://192.168.1.xxx:3001
```

You can access the application from other devices on your network using the "On Your Network" URL.

## Troubleshooting

### Port Conflicts
- If port 3001 is in use, modify the `PORT` value in `/frontend/.env`
- If port 5001 is in use, modify the `PORT` value in `/backend/.env`

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify network access and firewall settings

### Dependencies Issues
- Run `npm run install:all` to ensure all dependencies are installed
- Clear node_modules and reinstall if needed:
  ```bash
  rm -rf node_modules package-lock.json
  npm run install:all
  ```

### Build Issues
- Check Node.js version (should be v14+)
- Ensure all environment variables are properly set
- Check console for specific error messages

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB with Mongoose - Database
- JSON Web Tokens (JWT) - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests
- dotenv - Environment variables
- nodemon - Development server

### Frontend
- React 18 - UI framework
- React Router DOM - Client-side routing
- Context API - State management
- Axios - HTTP requests
- CSS3 - Styling
- Create React App - Build tooling

### Development Tools
- Concurrently - Run multiple scripts
- ESLint - Code linting
- Webpack - Module bundling (via CRA)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify environment variables are correctly set
4. Check that ports 3001 and 5001 are available
- Protected routes and authentication middleware
- Responsive UI with clean styling

## Project Structure

`
fullstack-auth-app/
├── backend/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   └── authController.js   # Authentication logic
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── models/
│   │   └── User.js             # User model
│   ├── routes/
│   │   └── auth.js             # Authentication routes
│   ├── utils/
│   │   └── generateToken.js    # JWT token generation
│   ├── package.json
│   └── server.js               # Express server
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── context/
    │   │   └── AuthContext.js   # Authentication context
    │   ├── services/
    │   │   └── authService.js   # API service
    │   ├── App.js
    │   └── index.js
    └── package.json
`

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup
1. Navigate to backend directory:
   `ash
   cd backend
   `

2. Install dependencies:
   `ash
   npm install
   `

3. Start the server:
   `ash
   npm run dev
   `
   Server will run on http://localhost:5000

### Frontend Setup
1. Navigate to frontend directory:
   `ash
   cd frontend
   `

2. Install dependencies:
   `ash
   npm install
   `

3. Start the React app:
   `ash
   npm start
   `
   App will run on http://localhost:3000

## API Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (protected)

## Environment Variables

Create a .env file in the backend directory:

`
MONGO_URI=mongodb://localhost:27017/fullstack-auth
JWT_SECRET=your-secret-key-here
PORT=5000
`

## Usage

1. Start both backend and frontend servers
2. Visit http://localhost:3000
3. Register a new account or login
4. Access the dashboard after successful authentication

## Technologies Used

### Backend
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React
- Context API for state management
- Axios for HTTP requests
- CSS3 for styling
