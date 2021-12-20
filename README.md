# What To Do?

### Open Source Planner App

Got some things you need to jot down? "What To Do" has your back.

## DISCLAIMER

This software is provided as-is, and is currently in the alpha state of development. This app is not feature complete, nor ready for release. Use at your own risk.

## Endpoints

### User Authentication

#### [POST] /api/auth/register

Allows users to register for a new account

**Accepted Inputs:**

Field      | Type   | Required | Notes
-----------|--------|----------|-----------------------------------
first_name | string | no       |
last_name  | string | no       |
email      | string | yes      | must be a validly formatted email
username   | string | yes      | must contain at least 3 characters
password   | string | yes      | must contain at least 6 characters

**Successful Output:**

```
{
  message: "User registered, successfully!"
}
```

#### [POST] /api/auth/login

Allows previously registered users to sign into their account

**Accepted Inputs:**

Field    | Type   | Required
---------|--------|---------
username | string | yes
password | string | yes

**Successful Output:**

```
{
  message: "Welcome, USERNAME!",
  token: "login token would be here"
}
```
