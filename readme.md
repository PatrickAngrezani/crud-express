# User CRUD Backend

This project is a simple backend developed with **Node.js + TypeScript**, using **Express** as the main framework.  
It implements a **User CRUD** with support for a **PostgreSQL database (via TypeORM)**, **Redis caching**, and **messaging integration (AWS SQS / RabbitMQ)**.

---

##  Features

- Create, Read, Update, and Delete users.  
- Pagination support for listing users.  
- Validation using **class-validator**.  
- Error handling with user-friendly messages.  
- JWT-based authentication to secure endpoints.  
- Integration with **Redis** for caching.  
- Messaging queue integration for asynchronous processing (AWS SQS or RabbitMQ).  

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
git clone github.com/PatrickAngrezani/
cd user-crud-backend
npm install
```

## Environment Variables

Create a .env file in the root directory:

```env
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/mydb
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

## Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

<!-- ## Testing

Run all tests:

```bash
npm run test'
``` -->

## Project Structure
```bash
src/
 ├── app.ts          # Express app configuration
 ├── server.ts       # Application entry point
 ├── database/       # TypeORM data source config
 ├── entities/       # Database entities
 ├── dto/            # Data Transfer Objects
 ├── controllers/    # Route controllers
 ├── services/       # Business logic
 ├── repositories/   # TypeORM repositories
 ├── routes/         # Entrypoint to API endpoints
 ├── middleware/     # intercept request flow
```
## API endpoints

Create User

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

Get Users

```http
GET /users
```


Get User

```http
GET /user/:id
```


Update User

```http
PUT /user/:ìd
Content-Type: application/json
```


```json
{
  "name": "updated1",
  "email": "updated1@email.com",
  "phone": "1234567890"
}
```

Delete User

```http
DELETE /user/:ìd
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


<!-- ```bash
```

```bash
```
```bash
```

```bash
``` -->