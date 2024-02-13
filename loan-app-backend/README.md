# Loan API Management

## Overview
This project is a web application for managing loans and repayments. It allows users to apply for loans, admins to approve or reject loan requests, and users to repay their loans.

## Technology Stack
- **Framework**: Laravel
- **Frontend**: React.js
- **Database**: MySQL
- **Authentication**: Laravel Sanctum

## Architecture
- **MVC Pattern**: We chose Laravel as the backend framework because of its robust MVC architecture, which separates the application's logic into models, views, and controllers, making it easy to maintain and scale.

## Database Design
- **Normalized Schema**: We opted for a normalized database schema to minimize data redundancy and improve data integrity. This includes tables for users, loans, repayments, and loan approvals.
- **Foreign Key Constraints**: Foreign key constraints are used to establish relationships between tables, ensuring referential integrity and enabling cascading operations.

## Authentication
- **Token-based Authentication**: Laravel Sanctum is used for token-based authentication. It provides a simple and secure way to authenticate users for API requests.

## User Roles
- **Admin and User Roles**: We implemented two user roles: admin and user. Admins have the authority to approve or reject loan requests, while users can apply for loans and make repayments.

## API Endpoints
- **RESTful API**: The project follows RESTful principles for designing API endpoints, making it easy to understand and consume.
- **Resource Controllers**: Laravel resource controllers are used to handle CRUD operations for loans, repayments, and loan approvals.

## Frontend
- **React.js**: We chose React.js for the frontend framework due to its flexibility, reusability, and performance. It allows for building interactive and responsive user interfaces.

## Testing
- **Unit and Feature Tests**: We have included unit tests to test individual components and feature tests to test user interactions and workflows. This ensures the reliability and stability of the application.

## Running the Application:
To run the application locally, follow these steps:
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `composer install`
4. Create a database with the name: `DB_LoanAPP`
5. Customize the database configuration in: `.env` in my case change `DB_DATABASE=laravel` to  `DB_DATABASE=DB_LoanAPP`
6. Migrate database: `php artisan migrate`
7. Running seeder to generate user in database: `php artisan db:seed --class=UserSeeder`
8. Start the development server: `php artisan serve`

## User Information Seeder:
| Username   | Password        | Role    |
|------------|-----------------|---------|
| test       | test            | user    |
| admin      | admin           | admin   |

## Users

- `POST /users`: Register a new user.
  - **Example Input:**
    ```json
    {
      "username": "john_doe",
      "name": "john",
      "password": "secretpassword"
    }
    ```
  - **Example Output:**
    ```json
    {
        "data": {
            "id": 1,
            "username": "john_doe",
            "name": "jhon",
            "role": "user"
	    }
    }
    ```

- `POST /users/login`: Log in as an existing user.
  - **Example Input:**
    ```json
    {
      "username": "john_doe",
      "password": "secretpassword"
    }
    ```
  - **Example Output:**
    ```json
    {
      "id": 1,
      "username": "john_doe",
      "name": "jhon",
      "token": "3ba32cec-2540-450f-90bd-9b9c0a9672c2"
    }
    ```

## Authenticated User Routes

All routes below require authentication through the `ApiAuthMiddleware`.

### User Management

- `GET /users/current`: Get information about the current authenticated user.
  - **Example Output:**
    ```json
    {
        "data": {
            "id": 4,
            "username": "john_doe",
            "name": "jhon",
            "token": "3ba32cec-2540-450f-90bd-9b9c0a9672c2",
            "role": "user"
        }
    }
    ```

- `PATCH /users/current`: Update information for the current authenticated user.
  - **Example Input:**
    ```json
    {
      "name": "Updated Name"
    }
    ```
  - **Example Output:**
    ```json
    {
      "message": "User information updated successfully."
    }
    ```

- `DELETE /users/logout`: Log out the current authenticated user.
  - **Example Output:**
    ```json
    {
      "message": "User logged out successfully."
    }
    ```

### Loans

- `POST /loans`: Submit a new loan request.
  - **Example Input:**
    ```json
    {
      "amount": 5000,
      "term": 12
    }
    ```
  - **Example Output:**
    ```json
    {
        "data": {
            "id": 1,
            "amount": 5000,
            "term": 12,
            "due_date": "2023-01-01",
            "state": "PENDING",
        }
    }
    ```

- `GET /list-loans/{loanId?}`: List all loans or get details for a specific loan (optional: loanId parameter).
  - **Example Output (List All Loans):**
    ```json
    [
      {
        "data": {
            "id": 1,
            "amount": 5000,
            "term": 12,
            "due_date": "2022-02-01",
            "state": "PENDING",
        }
      },
      // ... other loans
    ]
    ```
  - **Example Output (Get Details for a Specific Loan):**
    ```json
    {
        "loan_details": {
            "id": 1,
            "amount": "5000",
            "term": 12,
            "due_date": "2024-01-24",
            "state": "APPROVED",
            "repayments": [
                {
                    "id": 1,
                    "loan_id": 1,
                    "amount": "416.67",
                    "due_date": "2024-01-31",
                    "state": "PENDING"
                },
                // ... other loans
            ]
        }
    }
    ```

- `POST /repay-loan/{loanId}`: Repay a loan.
  - **Example Input:**
    ```json
    {
      "repayment_amount": 1000
    }
    ```
  - **Example Output:**
    ```json
    {
      "loan_id": 1,
      "repayment": {
        // ... repayment details
      }
    }
    ```

### Loan Approval (Admin Only)

- `POST /loans/{loanId}/approve`: Approve a loan (Admin Only).
  - **Example Output:**
    ```json
    {
      "loan_id": 1,
      "user_id": 2,
      "message": "Loan approved successfully."
    }
    ```

- `GET /loans/details`: Get details of a loan, including repayments and approval history.
  - **Example Output:**
    ```json
    {
      "loan_details": {
        // ... loan details
        "approval_history": [
          // ... approval history details
        ],
        "repayments": [
          // ... repayment details
        ]
      }
    }
    ```
