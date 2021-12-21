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

Field      | Type   | Required | Unique | Notes
-----------|--------|----------|--------|-----------------------------------
first_name | string | no       | no     |
last_name  | string | no       | no     |
email      | string | yes      | yes    | must be a validly formatted email
username   | string | yes      | yes    | must contain at least 3 characters
password   | string | yes      | no     | must contain at least 6 characters

**Successful Output:**

```
{
  "message": "New user registered, successfully!",
  "userInfo": {
    "email": "ustormcloak@windhelm.net",
    "id": 9,
    "name": "Ulfric Stormcloak",
    "username": "ulfric_stormcloak"
  }
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
  "message": "Welcome, ulfric_stormcloak!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVsZnJjwacFDG9ybWNsb2FrIiwiaWF0IjoxNjQwMTE1NTc5LCJleHAiOjE2NDAxMTkxNzl9.W91ZGiSYKFbJdzt9G4JRjS6H3AV040Ia46PMFwvTUh0"
}
```
