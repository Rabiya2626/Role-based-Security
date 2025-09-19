🔐Role-Based Admin Dashboard




A full-stack web application with role-based access control. Users, Admins, and Managers have separate dashboards and permissions. Users can edit their profiles, Admins can view users, and Managers can edit both users and admins.


🌟 Features

Role-based Authentication: User, Admin, Manager

Signup/Login with JWT & bcrypt

Profile Management: first name, last name, age, email, education, employment, experience

Separate Dashboards for each role

Manager Permissions: edit user and admin profiles

Real-time Updates across dashboards


🛠 Tech Stack

Frontend: React.js, Axios

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT, bcrypt

Other: CORS, dotenv


⚡ Setup & Installation
Backend

Navigate to the server folder:

cd server


Install dependencies:

npm install



Create a .env file with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret



Start the server:

npm start

Frontend

Navigate to the client folder:

cd client


Install dependencies:

npm install


Start the client:

npm start


Open your browser at http://localhost:3000.

📷 Screenshots
1️⃣ User Dashboard

2️⃣ Admin Dashboard

3️⃣ Manager Dashboard

👨‍💻 Usage

Signup/Login as User, Admin, or Manager

Redirected to respective dashboard:

User Dashboard: Edit personal profile

Admin Dashboard: Edit own profile, view users

Manager Dashboard: Edit own profile, edit users & admins

Profile updates are synced across dashboards

🤝 Contributing

Fork the repository

Create a new branch:

git checkout -b feature/your-feature


Commit changes:

git commit -m "Add your feature"


Push branch:

git push origin feature/your-feature


Open a pull request# Role-based-Authentication
