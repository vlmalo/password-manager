STEPS TO START BACKEND:

1. This will start an empty database. The schema will be created when started the application.

` docker run -d -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_USER=backend -e POSTGRES_PASSWORD=backend -e POSTGRES_DB=userlist_db -p 5432:5432 postgres:13`

Wait for the container to start. You can check its status with:

`docker ps`

2.  Run Spring Boot Backend
Open a terminal and navigate to your backend project directory, use the command below to start backend, or use:
Run 'BackendApplication' button (green start button)

`./mvnw spring-boot:run`