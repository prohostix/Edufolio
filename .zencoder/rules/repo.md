---
description: Repository Information Overview
alwaysApply: true
---

# EduFolio Repository Information

## Repository Summary

EduFolio is a full-stack educational platform for managing universities, academic programs, and student enquiries. It features a React-based frontend with a modern UI for browsing and an admin panel for management, and a Node.js/Express backend API with MongoDB database for data persistence.

## Repository Structure

This is a **monorepo** containing two independent subprojects:

- **Frontend**: React + Vite SPA for public browsing and admin management
- **Backend**: Express.js REST API with MongoDB and JWT authentication

### Main Directory Organization

- `Frontend/`: Client-side application (React + Vite)
- `Backend/`: Server-side API (Express.js + MongoDB)

---

## Projects

### Frontend (edufolio-frontend)

**Configuration File**: `Frontend/package.json`  
**Entry Point**: `Frontend/src/main.jsx`  
**Dev Server**: http://localhost:5173

#### Language & Runtime

**Language**: JavaScript (React)  
**Node Version**: Required (not explicitly specified, recommend Node 16+)  
**Build System**: Vite 7.2.4  
**Package Manager**: npm

#### Directory Structure

- `src/`: Main source directory
  - `pages/`: Page components (Home, Programs, Universities, About, Contact, Admin section)
  - `components/`: Reusable React components (including Admin layout)
  - `services/`: API service layer
  - `context/`: React Context for state management
  - `main.jsx`: Application entry point
  - `App.jsx`: Root router configuration

#### Dependencies

**Main Dependencies**:
- `react`: ^18.2.0 - UI library
- `react-dom`: ^18.2.0 - DOM rendering
- `react-router-dom`: ^6.21.0 - Client-side routing
- `axios`: ^1.6.2 - HTTP client for API calls

**Development Dependencies**:
- `vite`: ^7.2.4 - Build tool and dev server
- `@vitejs/plugin-react`: ^4.2.1 - React plugin for Vite
- `@types/react`: ^18.2.43 - TypeScript types
- `@types/react-dom`: ^18.2.17 - TypeScript types

#### Build & Installation

```bash
npm install
npm run dev          # Start development server (port 5173)
npm run build        # Production build
npm run preview      # Preview production build
```

#### Application Routes

**Public Routes**:
- `/` - Home page
- `/programs` - Programs listing
- `/programs/:slug` - Program details
- `/universities` - Universities listing
- `/universities/:slug` - University details
- `/about` - About page
- `/contact` - Contact page

**Admin Routes**:
- `/admin` or `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard
- `/admin/universities/add` - Add university
- `/admin/universities/edit/:id` - Edit university
- `/admin/programs/add` - Add program
- `/admin/programs/edit/:id` - Edit program

#### Development Server Configuration

Vite is configured with:
- Hot Module Replacement (HMR)
- Proxy to backend API: `/api` → `http://localhost:5000`

---

### Backend (edufolio-backend)

**Configuration File**: `Backend/package.json`  
**Entry Point**: `Backend/server.js`  
**API Base URL**: http://localhost:5000

#### Language & Runtime

**Language**: JavaScript (Node.js)  
**Node Version**: Required (not explicitly specified, recommend Node 14+)  
**Runtime Type**: CommonJS (`"type": "commonjs"`)  
**Package Manager**: npm

#### Directory Structure

- `server.js`: Main Express application entry point
- `config/`: Configuration files
  - `db.js`: MongoDB connection setup
- `routes/`: API route handlers
  - `adminRoutes.js`, `publicRoutes.js`, `universityRoutes.js`, `programRoutes.js`, `enquiryRoutes.js`, `uploadRoutes.js`
- `controllers/`: Business logic for each route
  - `adminController.js`, `authController.js`, `publicController.js`, `universityController.js`, `programController.js`, `enquiryController.js`, `uploadController.js`
- `models/`: Mongoose schemas
  - `Admin.js`, `University.js`, `Program.js`, `Enquiry.js`
- `middleware/`: Express middleware (authentication, validation)
- `uploads/`: Directory for uploaded files
- `.env`: Environment variables file
- `scripts/`: Utility scripts

#### Dependencies

**Main Dependencies**:
- `express`: ^4.21.2 - Web framework
- `mongoose`: ^8.20.1 - MongoDB ODM
- `cors`: ^2.8.5 - Cross-origin resource sharing
- `dotenv`: ^16.6.1 - Environment variable loading
- `jsonwebtoken`: ^9.0.2 - JWT authentication
- `bcryptjs`: ^2.4.3 - Password hashing
- `slugify`: ^1.6.6 - URL slug generation

**Development Dependencies**:
- `nodemon`: ^3.1.11 - Auto-restart on file changes

#### Environment Variables

**`.env` Configuration**:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edufolio
JWT_SECRET=edufolio_super_secret_key_2024_make_it_very_long_and_secure
JWT_EXPIRE=30d
NODE_ENV=development
```

#### Build & Installation

```bash
npm install
npm start          # Start production server (port 5000)
npm run dev        # Start with nodemon (development with auto-reload)
```

#### API Routes

- `GET /` - Health check endpoint
- `POST /api/admin/login` - Admin authentication
- `GET/POST /api/admin/universities` - University management
- `GET/POST /api/admin/programs` - Program management
- `GET/POST /api/admin/enquiries` - Enquiry management
- `GET /api/public/*` - Public endpoints
- `/uploads` - File upload and serve

#### Database Configuration

- **Database**: MongoDB
- **Connection**: Local or remote via `MONGODB_URI`
- **Default URI**: `mongodb://localhost:27017/edufolio`
- **Collections**: Admin, University, Program, Enquiry (derived from models)

#### CORS Configuration

Allowed origins:
- `http://localhost:5173` (Frontend dev server)
- `http://localhost:3000` (Alternative frontend)
- `http://127.0.0.1:5173`

---

## Cross-Project Integration

- **Frontend** proxies `/api` requests to **Backend** at `http://localhost:5000`
- **Backend** serves MongoDB-backed REST API with JWT authentication
- **Frontend** uses Axios for HTTP requests with automatic API base URL via Vite proxy
- CORS is configured to allow frontend requests from allowed origins

## Development Workflow

1. **Install dependencies**: Run `npm install` in both `Frontend/` and `Backend/` directories
2. **Start Backend**: `cd Backend && npm run dev` (runs on port 5000)
3. **Start Frontend**: `cd Frontend && npm run dev` (runs on port 5173)
4. **Access Application**: Open `http://localhost:5173` in browser
5. **Backend Health Check**: `http://localhost:5000/`

---

## Technology Stack Summary

| Component | Technology |
|-----------|-----------|
| Frontend Framework | React 18.2.0 |
| Frontend Build Tool | Vite 7.2.4 |
| Backend Framework | Express.js 4.21.2 |
| Database | MongoDB 8.20.1 |
| Authentication | JWT + bcryptjs |
| HTTP Client | Axios 1.6.2 |
| Routing (Frontend) | React Router 6.21.0 |
| Dev Server Tool (Backend) | Nodemon 3.1.11 |
