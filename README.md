# Workshop Booking Management System

A full-stack CRUD application developed with modern DevOps practices, featuring automated CI/CD workflows and secure cloud deployment.

## Project Overview
This project is a Workshop Booking Management System designed to allow users to browse, book, and manage workshop sessions.

## Features

### User Features
- User registration and login (JWT authentication)
- Browse categories

### Admin Features
- Create, update, and delete categories

## Tech Stack

### Frontend
- React
- Axios

### Backend
- Node.js
- MongoDB

### Authentication
- JSON Web Token (JWT)

## Project Structure
/backend
/models
/routes
/controllers
/middleware
/test
/config

/frontend
/components
/context
/pages

## Installation & Setup

### 
1. Clone the repository
git clone (https://github.com/serrain/ifn636_WorkshopBookingSystem.git)

2. Install dependencies
# backend
npm install
# frontend
npm install

3. Create a .env file in the backend folder:
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the project
# start backend
npm server.js
# start frontend
npm start


## Author
Boyuan Chen