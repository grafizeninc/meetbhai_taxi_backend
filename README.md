# Authentication API

This provides details on the authentication endpoints for the application, specifically the `login` and `signup` functionalities.

**Base URL:** `https://meetbhai-taxi-backend.onrender.com/api`

## Endpoints

### 1. Login

**URL:** `/login`

**Method:** `POST`

**Description:** This endpoint allows users to log in to the application by providing their email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Responses:**

- **Success Response:**
    - **Status:** 200 OK
    - **Body:**
      ```json
      {
        "status": "success",
        "token": "jwt_token",
        "data": {
          "user": {
            "_id": "user_id",
            "name": "User Name",
            "email": "user@example.com",
            "phoneNumber": "user_phone_number"
          }
        }
      }
      ```
- **Error Responses:**
    - **Missing Email or Password:**
        - **Status:** 404 Not Found
        - **Body:**
          ```json
          {
            "status": "fail",
            "message": "Please provide email or password"
          }
          ```
    - **Invalid Email or Password:**
        - **Status:** 401 Unauthorized
        - **Body:**
          ```json
          {
            "status": "fail",
            "message": "Email or Password is wrong"
          }
          ```

### 2. Signup

**URL:** `/signup`

**Method:** `POST`

**Description:** This endpoint allows new users to create an account by providing necessary information such as name, email, password, and phone number.

**Request Body:**

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "userpassword",
  "passwordConfirm": "userpassword",
  "phoneNumber": "userphonenumber"
}
```

**Responses:**

- **Success Response:**
    - **Status:** 201 Created
    - **Body:**
      ```json
      {
        "status": "success",
        "token": "jwt_token",
        "data": {
          "user": {
            "_id": "user_id",
            "name": "User Name",
            "email": "user@example.com",
            "phoneNumber": "user_phone_number"
          }
        }
      }
      ```
