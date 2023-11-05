# ICT3103_G24 Project

Welcome to the ICT3103_G24 project repository. This project is structured into two main components: the backend and the frontend. Follow the instructions below to set up and run the project on your local development environment.

## Prerequisites

Before you proceed, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/) (which comes with [npm](http://npmjs.com/))

## Setup Instructions

### Backend Setup

To get the backend up and running, follow these steps:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

```
### Frontend Setup
To set up the frontend, execute the following:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
```

### Environment Configuration
Both the backend and frontend require you to set up environment variables.

### Backend .env Configuration
Create a .env file in the backend directory and include the following variables:

```bash

# MongoDB URI (replace with your actual MongoDB URI) created with mongodb atlas (https://www.mongodb.com/atlas/database)
MONGODB_URI=your_mongodb_uri

# Server Port (can be left as is or changed to your preferred port)
PORT=3001

# JWT Secret (replace with your actual secret)
JWT_SECRET=your_jwt_secret

# Google reCAPTCHA Secret Key (replace with your actual secret key)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```
Replace your_mongodb_uri, your_jwt_secret, and your_recaptcha_secret_key with your actual MongoDB URI, JWT secret, and Google reCAPTCHA secret key.

### Frontend .env Configuration
Create a .env file in the frontend directory with the necessary variables:
```bash
# Google reCAPTCHA Site Key (replace with your actual site key)
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```
Replace your_recaptcha_site_key with your actual Google reCAPTCHA site key.

### Running the Project
With the environment set up, you can now run both parts of the application.

## Local Development Setup

For local development, you may want to point your application to a local server. To do this, you will need to modify the `baseURL` in the `api.js` file within your project.

### Updating the API Base URL

Locate the `api.js` file in your project directory and change the `baseURL` to your local server's address. Here's how you can do it:

1. Open the `api.js` file.
2. Find the line where `axios` is creating an instance with `baseURL`.
3. Replace the existing URL with the local server URL.

For example, change:

```javascript
import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:3001",
});
```

### Backend
```bash
# Inside the backend directory
npm start
```
This command will start the backend server.

### Frontend
```bash
# Inside the frontend directory
npm start
```








