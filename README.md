# Next.js Authentication with MongoDB

This project demonstrates how to implement authentication in a **Next.js** application using **MongoDB** as the database. The app covers user registration, login, email verification, and secure password handling.

---

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
- [Authentication Flow](#authentication-flow)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)
- [References](#references)

---

## Technologies

- **Next.js** – React framework for server-side rendering and API routes
- **MongoDB** – Database for storing user data
- **Mongoose** – ODM for MongoDB
- **NodeMailer** – Form Email Verification mail
- **bcryptjs** – Password hashing
- **JWT** – JSON Web Tokens for session management

---

## Features

- User **registration** with email and password
- User **login** and **logout**
- Password **hashing** for security
- **Email verification**
- Session management using **JWT**

---


## Getting Started

1. **Clone the repository**

```bash
git clone <repo-url>
cd <project-folder>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**\
   Create a `.env.local` file with:

```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. Visit `http://localhost:3000` to see the app in action.

---

## Authentication Flow

1. **User Registration**: Users submit their email, name and password via a registration form. Passwords are hashed and stored in MongoDB.
2. **Login**: Users provide credentials. The system validates them and issues a session token.
3. **Protected Routes**: Pages are restricted based on authentication state.
4. **Logout**: JWT token is invalidated.

---

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `NEXTAUTH_URL`: Base URL for the Next.js app

---

## Future Improvements

- Add **OAuth** login with Google/GitHub
- Integrate **role-based access control**
- Add **refresh token mechanism** for longer sessions

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [NodeMailer](https://nodemailer.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB Official Site](https://www.mongodb.com/)

---

## Preview 

<img width="991" height="911" alt="localhost_3000_login" src="https://github.com/user-attachments/assets/5d909242-c2b2-4126-9bee-30d910c4a076" />

<img width="991" height="911" alt="localhost_3000_login (1)" src="https://github.com/user-attachments/assets/064e26e2-c673-47ac-b6db-a52bbb10525a" />

---

**Author:** Sahil Shrestha\
**Date:** August 2025

