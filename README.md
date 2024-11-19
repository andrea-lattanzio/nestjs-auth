<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>   <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="gcp" width="40" height="40"/>

# NestJS Authentication Project

## Overview

This is a **NestJS** project that implements robust authentication and authorization functionalities. The project ensures secure access control using **JWT (JSON Web Tokens)** and provides seamless third-party login with **Google OAuth**. It utilizes **Mongoose** to interact with **MongoDB**, offering a structured and efficient way to manage user data.

## Key Features

- **JWT-based Authentication**: Ensures secure API access with token-based authentication.
- **Google OAuth Integration**: Allows users to log in using their Google accounts for a convenient login experience.
- **Role-Based Access Control**: Implements fine-grained authorization by assigning roles to users and restricting access to specific resources based on their roles.
- **Password Encryption**: Ensures passwords are stored securely by encrypting them using hashing algorithms.
- **Mongoose for MongoDB**: Simplifies database operations and ensures a consistent data structure.

## Technical Details

- The authentication logic leverages the **Passport** library for managing authentication strategies.
- Passwords are hashed and stored securely to prevent unauthorized access even if the database is compromised.
- Role-based access is implemented to differentiate permissions for users (e.g., Manager, Member, etc.).

## Prerequisites

- Node.js and npm installed.
- MongoDB instance running.
- Google API credentials for OAuth.
