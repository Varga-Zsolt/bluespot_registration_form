# Introduction

This is a one-page application built with React that consists of a form used to send data to an API.
The form includes four fields: input email, input password, long bio, and a submit button.

## Instructions for running the application
- Clone the repository to your local machine
- Install the dependencies by running `npm install`
- Start the development server by running `npm start`
- Open a web browser and navigate to http://localhost:3000 to see the form in action.

## Validation Rules

- `Email` field should be a valid email address
- `Password`
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one digit
  - At least one special character (@, $, !, %, *, ?, &)
  - A minimum length of 8 characters
- `Bio`
  - At least 5 characters
  - Maximum 100 characters

### Server side validation
If the email equals `varga.zsolt.gergo@gmail.com`, server will send `422` `Email has been already taken` error

## Mocking

I used **Mock Service Worker** to mock the backend functionality
