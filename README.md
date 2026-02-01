# MongoDB Admin Auth API

A Node.js Express API with MongoDB for admin authentication system.

## Features

- Admin registration and login
- JWT token authentication
- Password hashing with bcrypt
- Input validation with Joi
- MongoDB integration with Mongoose
- CORS enabled
- File upload support

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Validation**: Joi
- **ODM**: Mongoose

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd MongoDB
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Copy .env file and update with your MongoDB connection
DB_URL=mongodb://localhost:27017/db_practice
PORT=5000
JWT_SECRET=your-secret-key
```

4. Start the server
```bash
npm start
```

## API Endpoints

### Admin Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/auth/register` | Register new admin |
| POST | `/api/admin/auth/login` | Admin login |
| POST | `/api/admin/auth/logout` | Admin logout |

### Request/Response Format

#### Register Admin
```json
POST /api/admin/auth/register
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Login Admin
```json
POST /api/admin/auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Response Format
```json
{
  "code": 200,
  "message": "Success message",
  "data": {
    "token": "jwt-token",
    "admin": {
      "id": "admin-id",
      "email": "admin@example.com",
      "name": "Admin Name"
    }
  }
}
```

## Project Structure

```
src/
├── config/
│   ├── db.config.js          # Database configuration
│   └── server.config.js      # Server configuration
├── modules/
│   └── admin/
│       └── auth/
│           ├── auth.controller.js  # Auth controllers
│           ├── auth.model.js       # Admin model
│           ├── auth.repository.js  # Database operations
│           ├── auth.routes.js      # Auth routes
│           ├── auth.service.js     # Business logic
│           └── auth.validator.js   # Input validation
├── routes/
│   └── index.js              # Main routes
├── utils/
│   ├── apiResponse.js        # API response utility
│   └── unauthorizedError.js  # Error handling
└── index.js                  # Main server file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `DB_URL` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT secret key | default-secret-key |
| `DOTENV_CONFIG_QUIET` | Disable dotenv messages | true |

## Scripts

- `npm start` - Start server with nodemon
- `npm test` - Run tests (not implemented)

## Error Handling

The API returns consistent error responses:

```json
{
  "code": 400,
  "message": "Error message",
  "data": "Error details"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized
- `409` - Conflict (Admin already exists)
- `500` - Internal Server Error

