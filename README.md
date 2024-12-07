# Password Manager

This project is a full-stack password manager application built using **Spring Boot** for the backend, **Angular** for the frontend, and **PostgreSQL** for the database. The application is containerized using **Docker** and can be easily run on any system with Docker and Docker Compose installed.

## Key Features

### Security Features
- **JWT Authentication**: Secure user authentication with tokens stored in HTTP-only cookies.
- **JPA with Prepared Statements**: Utilizes Java Persistence API (JPA) to abstract database operations and prevent SQL injection attacks through parameterized queries.
- **CSRF Protection**: Guards against unauthorized state-changing requests.
- **AES Encryption**: Passwords stored in the database are encrypted with a unique user-specific key.
- **PBKDF2 Key Derivation**: Converts user-provided passwords into secure AES-compatible keys.
- **CORS Configuration**: Limits API access to trusted origins only.
- **UUIDs**: Used for database identifiers to prevent predictability.
  
### Application Features
- **User Authentication**: Login and registration with encrypted passwords (hashed using bcrypt).
- **Password Management**:
  - Add new password entries.
  - Retrieve stored passwords.
  - Update or delete existing passwords.
- **Dockerized Database**: Simplified PostgreSQL setup with a Docker container.
- **Built-in Validation**: All inputs are validated to ensure secure data handling.

### User Interface Previews

#### Login Page
![Login Page](https://github.com/user-attachments/assets/5bb3298d-55e7-4bf0-88bf-850df1d171d4)

#### Registration Page
![Registration Page](https://github.com/user-attachments/assets/96c65c57-98e9-47a6-8f1d-206ec4508549)

#### Main Menu
![Main Menu](https://github.com/user-attachments/assets/ff3377de-fb21-406b-8f15-1d7561ce99a3)

#### Add/Modify Password Page
![Add/Modify Password](https://github.com/user-attachments/assets/1fa9ab81-2633-45c4-b18a-dad1ac2c511a)

---


## Prerequisites

Ensure you have the following installed on your system:

- **Docker** (version 20.10 or later)
- **Docker Compose** (version 1.29 or later)

## Getting Started

Follow these steps to set up and run the application locally using Docker:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/vlmalo/password-manager.git
cd password-manager
```

### 2. Build and Start the Application

Use Docker Compose to build and start the application. This will set up the backend, frontend, and database containers.
```bash
sudo docker-compose up --build
```
### 3. Access the Application

Once the containers are up and running, you can access the following:

    Frontend: http://localhost:4200
    Backend: http://localhost:8080

The frontend will be available on port 4200, and the backend API will be accessible on port 8080.
### 4. Stopping the Application

To stop the running containers, press Ctrl + C and then run the following command:
```bash
sudo docker-compose down
```
This will stop and remove all running containers.
