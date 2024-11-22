# Password Manager

This project is a full-stack password manager application built using **Spring Boot** for the backend, **Angular** for the frontend, and **PostgreSQL** for the database. The application is containerized using **Docker** and can be easily run on any system with Docker and Docker Compose installed.

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