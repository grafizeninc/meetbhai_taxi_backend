# User Authentication API

This provides details on the authentication endpoints for the application, specifically the `login` and `signup` functionalities.

**Base URL:** `https://meetbhai.eu-4.evennode.com/api`

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


# Admin Authentication 

## Endpoints

### 1. Login

**URL:** `/admin/login`

**Method:** `POST`

**Description:** This endpoint allows admin to log in to the application by providing their email and password.

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "adminpassword"
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

#  Airport Features

## Endpoints

### 1. Fetch All

**URL:** `/airports`

**Method:** `GET`

**Description:** This endpoint allows admins/users to fetch list of Airports.

**Responses:**

- **Success Response:**
    - **Status:** 200 OK
    - **Body:**
      ```json
      {"status":"success","results":3,"data":{"data":[{"_id":"664b5223fe8bad3448a95236","name":"Murtala Muhammed International Airport","code":"LOS","cityName":"Ikeja","dateLogs":"2024-05-20T13:36:36.945Z","__v":0},{"_id":"664b52c0540ecf34e8156887","name":"Nnamdi Azikiwe International Airport","code":"ABV","cityName":"Abuja","dateLogs":"2024-05-20T13:37:36.945Z","__v":0},{"_id":"664b52e9540ecf34e8156888","name":"Port Harcourt International Airport","code":"PHC","cityName":"PortHarcourt","dateLogs":"2024-05-20T12:37:36.945Z","__v":0}]}}
      ```
