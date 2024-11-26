## Nenenj Loan App
Nenenj Loan App is a comprehensive web application that facilitates user authentication, loan application processing, and payment tracking. Designed to be intuitive and efficient, the app provides a seamless way for users to apply for loans and manage their financial activities online.

## Features
> User Registration & Login: Secure user authentication using JWT.
> Loan Application: Users can apply for loans with details like amount, duration, and purpose.
> Loan Management: Tracks loan status, including pending, approved, or rejected loans.
> Interactive Frontend: Real-time loan calculators and form validation using JavaScript.
> Responsive Design: Built with Bootstrap for mobile-first responsiveness.

## Technologies Used
Frontend
HTML5
CSS3
JavaScript
Bootstrap 5
Backend
Node.js with Express.js
MongoDB with Mongoose
JWT for authentication
bcrypt for password hashing

## Getting Started
# Prerequisites
Node.js installed
MongoDB set up locally or on a cloud platform (e.g., MongoDB Atlas)
Git installed
Installation
Clone the repository: git clone https://github.com/your-username/nenenj-loan-app.git
cd nenenj-loan-app

Set up the backend: cd backend
npm install
Configure the environment variables: Create a .env file in the backend directory with the following: env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

Start the backend server: node app.js
Open the index.html file in your preferred browser to view the frontend.

## API Endpoints
Authentication
POST /api/auth/register: Register a new user.
Request Body: { username, password }
POST /api/auth/login: Login as a user.
Request Body: { username, password }

## Loan Management
POST /api/loans/apply: Apply for a loan.
Request Body: { userId, amount, duration, purpose }
GET /api/loans/user-loans/:userId: Get all loans for a user.

## Usage
Register: Create a new account via the registration form.
Login: Log in using your credentials to access the dashboard.
Apply for a Loan: Use the loan form to submit an application.
Manage Loans: View the status of your loans on your user dashboard.

## Project Structure
nenenj-loan-app/
├── backend/
│   ├── models/
│   │   ├── user.js
│   │   └── loan.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── loans.js
│   ├── app.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── index.html
│   └── loan.html
└── README.md

## Future Improvements
Add admin functionality for loan approval/rejection.
Implement email notifications for loan updates.
Integrate payment gateway for loan repayments.
Add dashboards with advanced analytics.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.


