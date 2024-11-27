
# Role-Based Authentication System

This project implements a secure role-based authentication system with JWT for user verification, 
integrated with a React.js frontend and Node.js/Express.js backend. MongoDB is used as the database.

## Features
- **Role-Based Access**: Define roles and restrict access to specific endpoints.
- **Authentication**: JWT authentication for secure user verification.
- **Frontend**: A responsive React.js frontend communicates with the backend.
- **Secure Password Handling**: Passwords are hashed using bcrypt.

## Prerequisites
- Node.js (v16 or later)
- MongoDB (local or cloud instance)
- npm or yarn

## Project Structure
### Backend
- `server.js`: Main entry point for the backend.
- `routes/`: API route handlers.
- `middleware/`: Includes authentication and role-based middleware.
- `models/`: Mongoose models for managing user data.

### Frontend
- `src/`: React application source files.
- `src/components/`: Contains reusable React components.

### Environment Variables
#### Backend (`.env`)
```env
PORT=5000
MONGO_URI='your mongo uri'
JWT_AUTHENTICATION_KEY='your jwt key'
```

#### Frontend (`.env`)
```env
REACT_APP_HOST_NAME="your backend host"
```

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd role-based-auth
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the backend environment variables.

3. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory with the frontend environment variables.

4. **Run MongoDB**:
   Ensure MongoDB is running on your system or connect to a MongoDB Atlas instance.

5. **Start the Application**:
   - **Backend**: 
     ```bash
     cd backend
     npm start
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm start
     ```

## API Endpoints
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signin`: Login with email and password.
- `GET /api/admin`: Access protected resources for admin login.
- `GET /api/user`: Access protected resources for user login.
- `GET /api/moderator`: Access protected resources for moderator login.

## Security Highlights
- **Environment Isolation**: Secrets and keys are stored in environment variables.
- **Password Security**: All passwords are hashed before storage using bcrypt.
- **JWT Expiry**: Tokens are issued with an expiry for enhanced security.

## Note
These are just example endpoints and we can use more endpoints

## Working
Use the fetchUserType function to get the type of the user so that they can access only their endpoints.