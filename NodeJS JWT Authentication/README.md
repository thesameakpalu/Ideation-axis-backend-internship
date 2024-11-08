# JWT -Based Authentication

Welcome to the JWT Authentication & Email Verification API! This API is built with Node.Js, Express, and MongoDB to handle user authentication, including registration, and email verification.

## BASE URL
http://localhost:5000/api/auth

## Endpoints
### 1.Register a New User
Registers a new user by creating an account with an email and password. A verification email is sent upon successful registration.
### URL: /register
### Method: POST
### Content-Type: application/json
### Request Body:
{
    "email": "emanac@example.com"
    "password": "selectedpassword"
}
### Response:
#### Success(201)
{
    "message": "User registered. Please verify your email."
}
#### Error (500)
{
    "error": "An error message explaining what went wrong."
}


## 2.Verify Email Address
This endpoint verifies the user’s email when they click the verification link sent to their inbox.

### URL: /verify-email
### Method: GET
### Query Parameter: 
token (The verification token included in the link)
### Example URL:
 http://localhost:5000/api/auth/verify-email?token=YOUR_TOKEN_HERE
 ### Response:
 #### Success (200)
{
  "message": "Email verified successfully."
}
#### Error (400)
{
  "error": "Invalid or expired token."
}


## JWT-Based Authentication
All protected routes require a JWT token to access. Here’s how to use it:

Include the JWT token in the Authorization header for requests to protected routes.
### Example Header:
Authorization: Bearer YOUR_JWT_TOKEN_HERE
### Sample Error Responses for Protected Routes
If f a protected route is accessed without a valid JWT token, the response will look like:
### Unauthorized (401):
{
  "error": "Unauthorized access."
}


## Setup and Configuration

### Environment Variables
The following environment variables need to be set up in a .env file:

MONGO_URI: Your MongoDB connection string.
JWT_SECRET: A secret key for signing JWT tokens.
EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY: Configurations for sending emails with EmailJS.

## Run the Server
To start the server, use:
"node server.js"
Or, if using nodemon for automatic restarts:
" nodemon server.js
"
## Additional Notes
### Security:
 Passwords are hashed using bcrypt, and JWT tokens are used to protect user data.
 ### Best Practices:
 Error handling and proper status codes are implemented for clear client-side error management.
### Code Quality
The project is modular, with separate files for routes, controllers, and configurations, making it easy to maintain and extend.
