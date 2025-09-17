# User CRUD Backend

This project is a simple backend developed with **Node.js + TypeScript**, using **Express** as the main framework.  
It implements a **User CRUD** with support for a **PostgreSQL database (via TypeORM)**.

---

##  Features

- Create, Read, Update, and Delete users with **Postgres** e **TypeORM**.  
- Validation using **class-validator**.  
- Error handling with user-friendly messages.  
- JWT-based authentication to secure endpoints.  
- Integration with **Redis** for caching.  
- Automated testing with **Jest** (unit and integration tests).  

---

##  Tech Stack

- **Node.js** + **TypeScript**  
- **Express**  
- **TypeORM** (PostgreSQL)  
- **Jest** (unit and integration testing)  
<!-- - **Redis** (cache layer) e  -->
<!-- - **AWS SQS / RabbitMQ** (messaging)   -->
---

##  Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/PatrickAngrezani/crud-express
cd crud-express
npm install
```

## Environment Variables

Create a .env file in the root directory:

```env
DB_PORT=5432
DB_HOST=db
DB_USERNAME=dbuser
DB_PASSWORD=dbpassword
DB_NAME=dbname
JWT_SECRET=your-secret-jwt
PORT=3000
REDIS_URL=redis://localhost:6379
```

## Running the Project

### Development

```bash
docker-compose up --build
docker-compose up -d
```

<!-- ## Testing

Run all tests:

```bash
npm run test'
``` -->

## Project Structure
```bash
src/
 ├── controllers/    # Route controllers
 ├── database/       # TypeORM data source config
 ├── dto/            # Data Transfer Objects
 ├── entities/       # Database entities
 ├── middleware/     # Intercept request flow
 ├── routes/         # Entrypoint to API endpoints
 ├── services/       # Business logic
 ├── app.ts          # Express app configuration
 ├── server.ts       # Application entry point
```
## API endpoints

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "login@email.com",
  "password": "password"
}
```

### Create User

```http
POST /user
Content-Type: application/json
```


```json
{
  "name": "created1",
  "email": "created1@email.com",
  "phone": "1234567890"
}
```

### Get Users

```http
GET /api/users
```


### Get User

```http
GET /api/user/:id
```


### Update User

```http
PUT /api/user/:ìd
Content-Type: application/json
```

```json
{
  "name": "updated1",
  "email": "updated1@email.com",
  "phone": "1234567890"
}
```

### Delete User

```http
DELETE /api/user/:ìd
```

## Authentication 

```makefile
Authorization: Bearer <jwt-token>
```

<!-- ## Messaging Integration

The system integrates with AWS SQS or RabbitMQ to handle asynchronous tasks such as sending notifications or background jobs. -->

<!-- ## Caching with Redis

The Redis cache layer is used to optimize frequently accessed queries (for example, getAllUsers).
Cache entries are invalidated automatically whenever records are updated or deleted. -->