# Project Documentation

## Overview:
This project is a web application built using React.js for the frontend. It provides user authentication and authorization functionalities, allowing users with different roles to access different parts of the application. The project is designed to be modular, scalable, and maintainable.

## Technology Stack:
- **Frontend**: React.js for building the user interface.
- **Routing**: React Router for defining and handling client-side routes.
- **State Management**: Redux for managing application state.
- **Styling**: Tailwind CSS for rapid UI development and customization.
- **Authentication**: JWT (JSON Web Tokens) for authentication and session management.
- **Form Validation**: Formik and Yup for form validation.
- **Notifications**: React-toastify for displaying notifications to the user.
- **HTTP Requests**: Fetch for making HTTP requests to the backend API.

## Running the Application:
To run the application locally, follow these steps:
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your web browser and visit `http://localhost:5173/` to access the application.

## Reviewer Instructions:
1. Use the provided credentials or sign up for a new account.
2. Sign in using the registered credentials.
3. Navigate through different pages and verify functionality based on your role.
4. Test user-specific and admin-specific features to ensure proper access control.
5. Verify error handling, form validation, and notification messages.

## Folder Structure:
The project follows a modular folder structure to maintain code organization and scalability. Here's an overview of the folder structure:
- **`src/`**: Contains all the source code for the frontend.
  - **`assets/`**: Static assets like images, fonts, etc.
  - **`components/`**: Reusable UI components.
  - **`page/`**: Components representing different pages of the application.
  - **`redux/`**: Redux store setup, actions, reducers, and selectors.
  - **`utils/`**: Utility functions and helper methods.
  - **`App.js`**: Main entry point of the application.

## Authentication Flow:
1. **Sign Up**: Users can register for a new account by providing their details.
2. **Sign In**: Registered users can sign in using their credentials.
3. **Authentication**: Upon successful sign-in, the client receives a JWT token from the server.
4. **Authorization**: The client stores the token in local storage and includes it in subsequent requests for authentication.
5. **Access Control**: The server validates the token for each protected route to ensure only authenticated users with appropriate roles can access them.
6. **Role-based Routing**: Client-side routing redirects users to different routes based on their roles (e.g., admin, user).

## Reasoning:
- **React**: Chosen for its component-based architecture, virtual DOM, and robust ecosystem.
- **Redux**: Used for managing application state and ensuring a single source of truth.
- **Tailwind CSS**: Provides utility-first CSS classes for rapid UI development and easy customization.
- **JWT Authentication**: Offers stateless authentication mechanism with token-based validation, enhancing security and scalability.

## Future Enhancements:
- Implement user profile management functionality.
- Add more granular access control and permissions.
- Enhance error handling and validation messages.
- Implement server-side rendering for better SEO and performance.

## Conclusion:
This project aims to provide a robust authentication and authorization system for React.js applications with role-based access control. By leveraging modern web technologies and best practices, it ensures security, scalability, and maintainability.
