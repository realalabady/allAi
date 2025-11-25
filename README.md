# Full-Stack MVP with Authentication

A complete full-stack MVP application with React + Vite frontend and NestJS backend, featuring JWT authentication, i18next internationalization (English/Arabic), protected routes, and role-based authorization.

## Tech Stack

### Frontend

- **React** + **Vite** - Modern React framework with fast build tooling
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **i18next** - Internationalization (English + Arabic)
- **Axios** - HTTP client with interceptors

### Backend

- **NestJS** - Progressive Node.js framework
- **Prisma ORM** - Next-generation ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication (access + refresh tokens)
- **bcrypt** - Password hashing
- **Passport** - Authentication middleware

## Project Structure

```
.
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── api/       # Axios instance and API calls
│   │   ├── components/# React components
│   │   ├── context/   # AuthContext
│   │   ├── i18n/      # i18next configuration and translations
│   │   ├── pages/     # Page components (Landing, Login, Register, Dashboard)
│   │   ├── types/     # TypeScript type definitions
│   │   └── utils/     # Utility functions
│   └── ...
├── backend/           # NestJS backend application
│   ├── src/
│   │   ├── modules/   # Feature modules (auth, user, prisma)
│   │   ├── guards/    # JWT and Roles guards
│   │   ├── decorators/# Custom decorators (@Roles)
│   │   ├── dto/       # Data Transfer Objects
│   │   └── interfaces/# TypeScript interfaces
│   └── prisma/        # Prisma schema and migrations
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MyVite
```

### 2. Database Setup

#### Install PostgreSQL

**Windows:**

- Download and install from [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
- During installation, remember the password you set for the `postgres` user

**macOS:**

```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Create Database

1. Open PostgreSQL command line or pgAdmin
2. Create a new database:

```sql
CREATE DATABASE mydb;
```

Or using command line:

```bash
psql -U postgres
CREATE DATABASE mydb;
\q
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
# Create a .env file in the backend directory with the following:
```

Create `backend/.env` file:

```env
# Database
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/mydb?schema=public"

# JWT Secrets (generate strong random strings)
JWT_ACCESS_SECRET="your-super-secret-access-token-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-token-key-change-this-in-production"

# Server
PORT=3001

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"
```

**Generate JWT Secrets:**
You can generate secure random strings using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this twice to get two different secrets for access and refresh tokens.

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server (development mode)
npm run start:dev
```

The backend will be running on `http://localhost:3001`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
# Create a .env file in the frontend directory:
```

Create `frontend/.env` file (optional):

```env
VITE_API_URL=http://localhost:3001
```

```bash
# Start the development server
npm run dev
```

The frontend will be running on `http://localhost:3000`

## Running the Application

### Development Mode

1. **Start the database** (if not running as a service):

   ```bash
   # Windows
   # PostgreSQL should run as a Windows service automatically

   # macOS
   brew services start postgresql

   # Linux
   sudo systemctl start postgresql
   ```

2. **Start the backend** (in `backend/` directory):

   ```bash
   npm run start:dev
   ```

3. **Start the frontend** (in `frontend/` directory):

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Production Build

**Backend:**

```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**

```bash
cd frontend
npm run build
# Serve the dist/ folder with a web server (nginx, Apache, etc.)
```

## API Endpoints

### Authentication Endpoints

- `POST /auth/register` - Register a new user

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/login` - Login and get tokens

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/refresh` - Refresh access token

  ```json
  {
    "refreshToken": "your-refresh-token"
  }
  ```

- `GET /auth/me` - Get current user (protected)
  - Requires: Bearer token in Authorization header

### User Endpoints (Admin Only)

- `GET /users` - Get all users (Admin only)
- `GET /users/:id` - Get user by ID (Admin only)

## Features

### Authentication

- ✅ User registration with email and password
- ✅ User login with JWT tokens (access + refresh)
- ✅ Automatic token refresh on 401 errors
- ✅ Protected routes on frontend
- ✅ JWT authentication guards on backend

### Authorization

- ✅ Role-based access control (USER, ADMIN)
- ✅ Admin-only protected routes
- ✅ Role guards and decorators

### Internationalization

- ✅ Full i18next setup with English and Arabic
- ✅ Language switcher component
- ✅ RTL support for Arabic
- ✅ All UI text, labels, buttons, and error messages translated

### UI/UX

- ✅ Modern, clean design with TailwindCSS
- ✅ Responsive layout
- ✅ Form validation with error messages
- ✅ Loading states
- ✅ Error handling

## Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

## Environment Variables

### Backend (.env)

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_ACCESS_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

### Frontend (.env)

- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists: `psql -U postgres -l`

### Port Already in Use

- Change PORT in backend/.env
- Or kill the process using the port:

  ```bash
  # Windows
  netstat -ano | findstr :3001
  taskkill /PID <PID> /F

  # macOS/Linux
  lsof -ti:3001 | xargs kill
  ```

### Prisma Issues

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# View database in Prisma Studio
npx prisma studio
```

## Development Tips

1. **Prisma Studio**: Run `npx prisma studio` in the backend directory to view/edit database data
2. **API Testing**: Use Postman or Thunder Client to test API endpoints
3. **Type Safety**: All API responses are typed and shared between frontend and backend
4. **Token Expiry**: Access tokens expire in 15 minutes, refresh tokens in 7 days

## Security Notes

- ⚠️ **Never commit `.env` files** - They contain sensitive secrets
- ⚠️ **Change JWT secrets** in production
- ⚠️ **Use strong passwords** for database
- ⚠️ **Enable HTTPS** in production
- ⚠️ **Set proper CORS** origins in production

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the repository.
