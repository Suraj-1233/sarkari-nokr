# Sarkari Service - Government Job Portal

A full-stack web application for managing and displaying government job notifications (Sarkari Naukri) in India. Built with Angular frontend and Spring Boot backend, using MongoDB Atlas for data storage.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Component Documentation](#component-documentation)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Security](#security)

---

## 🎯 Overview

Sarkari Service is a modern, responsive web platform that aggregates and displays government job notifications. The application provides:

- **Public Interface**: Browse job listings by category, view detailed job information
- **Admin Panel**: Create, update, and delete job postings with rich content (lists, tables)
- **Responsive Design**: Mobile-first approach with consistent red/maroon theme
- **Secure Authentication**: JWT-based admin authentication

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Angular 15.2.0
- **Language**: TypeScript 4.9.4
- **Styling**: CSS3 with responsive design
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **UI Components**: Angular Material 15.2.9

### Backend
- **Framework**: Spring Boot 3.2.2
- **Language**: Java 17+
- **Database**: MongoDB Atlas
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **Validation**: Jakarta Validation

### Infrastructure
- **Database**: MongoDB Atlas (Cloud)
- **Containerization**: Docker
- **Web Server**: Nginx (for frontend production)

---

## ✨ Features

### Public Features
- ✅ Browse job listings by category/type
- ✅ View detailed job information
- ✅ Responsive design for all devices
- ✅ Search and filter capabilities
- ✅ Dynamic content rendering (lists, tables)
- ✅ Latest updates ticker
- ✅ Quick access cards

### Admin Features
- ✅ Secure login with JWT authentication
- ✅ Create new job postings
- ✅ Update existing postings
- ✅ Delete job postings
- ✅ Rich content editor (lists, tables)
- ✅ Drag-and-drop content blocks
- ✅ Date management

### Technical Features
- ✅ RESTful API architecture
- ✅ CORS configuration
- ✅ Error handling and validation
- ✅ Loading states
- ✅ Responsive grid layouts
- ✅ Consistent color scheme
- ✅ SEO-friendly meta tags

---

## 📁 Project Structure

```
sarkari-nokr/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/mongo/
│   │       │   ├── controller/     # REST Controllers
│   │       │   ├── model/            # Data Models
│   │       │   ├── repository/     # MongoDB Repositories
│   │       │   ├── service/         # Business Logic
│   │       │   ├── config/          # Configuration (Security, CORS, JWT)
│   │       │   └── util/            # Utilities
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml                   # Maven Dependencies
│   ├── Dockerfile               # Docker Configuration
│   └── SETUP.md                 # Backend Setup Guide
│
├── frontend/                    # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── Admin/            # Admin Components
│   │   │   │   ├── login/        # Login Component
│   │   │   │   ├── post-input/   # Create Post Component
│   │   │   │   ├── update-post/  # Update Post Component
│   │   │   │   └── crud-buttons/ # CRUD Operations
│   │   │   ├── users/            # Public Components
│   │   │   │   ├── header/       # Site Header
│   │   │   │   ├── header-links/ # Welcome Banner & Quick Access
│   │   │   │   ├── jobs/         # Job Listing Page
│   │   │   │   ├── job-page/     # Job Detail Page
│   │   │   │   ├── section/      # Category Sections
│   │   │   │   ├── type-list/    # Type-based Listing
│   │   │   │   └── users/        # Main Landing Page
│   │   │   ├── services/         # Angular Services
│   │   │   │   ├── record.service.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── http.interceptor.ts
│   │   │   ├── constants/       # API Endpoints
│   │   │   └── model/            # TypeScript Models
│   │   ├── assets/               # Static Assets
│   │   └── styles.css            # Global Styles
│   ├── package.json
│   ├── angular.json
│   └── dockerfile               # Frontend Docker Config
│
├── docker-compose.yml           # Local Development
├── docker-compose.atlas.yml     # Production with Atlas
└── README.md                    # This File
```

---

## 📋 Prerequisites

### Backend
- Java 17 or higher
- Maven 3.6+
- MongoDB Atlas account (or local MongoDB)

### Frontend
- Node.js 16+ and npm
- Angular CLI 15.2.11

### Optional
- Docker and Docker Compose (for containerized deployment)

---

## 🚀 Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Set Environment Variables:**
   ```bash
   export MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority"
   export JWT_SECRET="your-jwt-secret-key-minimum-32-characters"
   export CORS_ALLOWED_ORIGINS="http://localhost:4200,https://www.servicesarkari.com"
   export INIT_ADMIN_ENABLED=true
   export INIT_ADMIN_USERNAME=admin
   export INIT_ADMIN_PASSWORD=your-secure-password
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **After first run, disable admin initialization:**
   ```bash
   export INIT_ADMIN_ENABLED=false
   ```

**For detailed MongoDB Atlas setup, see:** `backend/SETUP.md`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   Edit `src/app/constants/api-endpoints.ts`:
   ```typescript
   BASE_URL: 'http://localhost:8080'  // For local development
   // or
   BASE_URL: 'https://your-backend-url.com'  // For production
   ```

4. **Run development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

5. **Access the application:**
   Open browser at `http://localhost:4200`

### Docker Setup (Optional)

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **For MongoDB Atlas:**
   ```bash
   docker-compose -f docker-compose.atlas.yml up -d
   ```

---

## 📡 API Documentation

### Base URL
```
Production: https://backend-service-rbor.onrender.com
Development: http://localhost:8080
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin"
}
```

### Records Endpoints

#### Get All Records
```http
GET /records
Authorization: Bearer {token}  # Required for protected endpoints
```

#### Get Record by ID
```http
GET /records/{id}
```

#### Get Records by Type
```http
GET /records/type/{type}
Example: GET /records/type/Government%20Jobs
```

#### Create Record
```http
POST /records
Authorization: Bearer {token}
Content-Type: application/json

{
  "typeOfPost": "Government Jobs",
  "title": "Job Title",
  "nameOfPost": "Post Name",
  "postDate": "2025-01-15T10:00:00",
  "shortInformation": "Brief description",
  "data": [
    {
      "title": "Section Title",
      "dataType": "list",
      "data": ["Item 1", "Item 2"]
    },
    {
      "title": "Table Section",
      "dataType": "table",
      "columns": [
        {"name": "Column1", "type": "text"},
        {"name": "Column2", "type": "list"}
      ],
      "data": [
        {"Column1": "Value1", "Column2": ["List Item"]}
      ]
    }
  ]
}
```

#### Update Record
```http
PUT /records/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  // Same structure as Create
}
```

#### Delete Record
```http
DELETE /records/{id}
Authorization: Bearer {token}
```

### Response Formats

**Success Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "typeOfPost": "Government Jobs",
  "title": "Job Title",
  ...
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "status": 400
}
```

---

## 🧩 Component Documentation

### Public Components

#### Header Component (`users/header`)
- **Purpose**: Site header with logo and title
- **Features**: Responsive design, centered layout
- **Usage**: `<app-header></app-header>`

#### Header Links Component (`users/header-links`)
- **Purpose**: Welcome banner, scrolling news, quick access cards
- **Features**: Animated scrolling, gradient cards
- **Inputs**: `middleLinks`, `coloredBoxes`

#### Users Component (`users/users`)
- **Purpose**: Main landing page with category sections
- **Features**: Grid layout, section cards
- **Route**: `/`

#### Jobs Component (`users/jobs`)
- **Purpose**: Individual job detail page
- **Features**: Dynamic content rendering, meta tags
- **Route**: `/jobs/:id`

#### Section Component (`users/section`)
- **Purpose**: Category section cards
- **Features**: List display, "Show More" button
- **Inputs**: `data` (Section model)

### Admin Components

#### Login Component (`Admin/login`)
- **Purpose**: Admin authentication
- **Features**: Form validation, JWT token storage
- **Route**: `/admin/login`

#### Post Input Component (`Admin/post-input`)
- **Purpose**: Create new job postings
- **Features**: Rich content editor, drag-and-drop
- **Route**: `/admin/post-input`

#### Update Post Component (`Admin/update-post`)
- **Purpose**: Edit existing postings
- **Features**: Pre-filled forms, content editing
- **Route**: `/admin/update-post`

### Services

#### Record Service (`services/record.service.ts`)
- **Methods**:
  - `getAllRecords()`
  - `getRecordById(id)`
  - `getRecordsByType(type)`
  - `createRecord(record)`
  - `updateRecord(id, record)`
  - `deleteRecord(id)`

#### Auth Service (`services/auth.service.ts`)
- **Methods**:
  - `login(username, password)`
  - `logout()`
  - `isAuthenticated()`
  - `getToken()`

---

## 🌐 Deployment

### Backend Deployment (Render/Heroku)

1. **Set Environment Variables:**
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CORS_ALLOWED_ORIGINS`
   - `INIT_ADMIN_ENABLED=false`

2. **Build Command:**
   ```bash
   mvn clean package
   ```

3. **Start Command:**
   ```bash
   java -jar target/spring-boot-mongo-1.0.0.jar
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy `dist/` folder**

3. **Configure API endpoint** in `api-endpoints.ts` to production URL

### Docker Deployment

```bash
# Build images
docker build -t sarkari-backend ./backend
docker build -t sarkari-frontend ./frontend

# Run containers
docker-compose up -d
```

---

## 🔐 Environment Variables

### Backend

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/sara` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-min-32-chars` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `http://localhost:4200,https://example.com` |
| `INIT_ADMIN_ENABLED` | Enable admin user creation | `true` or `false` |
| `INIT_ADMIN_USERNAME` | Initial admin username | `admin` |
| `INIT_ADMIN_PASSWORD` | Initial admin password | `secure-password` |

### Frontend

Configure in `src/app/constants/api-endpoints.ts`:
```typescript
BASE_URL: 'https://your-backend-url.com'
```

---

## 🔒 Security

### Implemented Security Features

- ✅ JWT-based authentication
- ✅ Password encryption (BCrypt)
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention (MongoDB)
- ✅ XSS protection
- ✅ Secure HTTP headers

### Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** for sensitive data
3. **Rotate JWT secrets** regularly
4. **Enable HTTPS** in production
5. **Limit CORS origins** to trusted domains
6. **Use strong passwords** for admin accounts
7. **Keep dependencies updated**

---

## 📝 Data Model

### MongoRecord Structure

```typescript
{
  id: string;
  typeOfPost: string;        // Category/Type
  title: string;             // Job Title
  nameOfPost: string;        // Post Name
  postDate: Date;            // Posting Date
  shortInformation: string; // Brief Description
  data: Array<{              // Content Sections
    title: string;
    dataType: "list" | "table";
    data: any;               // List items or table data
    columns?: Array<{        // For tables
      name: string;
      type: "text" | "list";
    }>;
  }>;
}
```

---

## 🎨 Design System

### Color Scheme
- **Primary**: `#9d2235` → `#c92a42` (Red/Maroon gradient)
- **Secondary**: `#f9fafb` (Light gray for secondary elements)
- **Text**: `#374151` (Dark gray)
- **Background**: `#ffffff` (White)

### Typography
- **Font Family**: Poppins
- **Header**: 16px, 700 weight, uppercase
- **Body**: 14px, 400 weight
- **Footer**: 13px, 500 weight

### Responsive Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: < 480px

---

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string format
   - Verify network access in Atlas
   - Ensure credentials are correct

2. **CORS Errors**
   - Add frontend URL to `CORS_ALLOWED_ORIGINS`
   - Check backend CORS configuration

3. **JWT Token Expired**
   - Re-login to get new token
   - Check token expiration settings

4. **Build Errors**
   - Clear `node_modules` and reinstall
   - Check Node.js version compatibility
   - Verify Angular CLI version

---

## 📚 Additional Resources

- [Backend Setup Guide](./backend/SETUP.md)
- [MongoDB Atlas Setup](./backend/MONGODB_ATLAS_SETUP.md)
- [Quick Start Guide](./QUICK_START_ATLAS.md)
- [UI Design Improvements](./UI_DISIGN_IMPROVEMENTS.md)
- [Fixes Summary](./FIXES_SUMMARY.md)

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

For issues and questions:
- Check existing documentation
- Review setup guides
- Contact the development team

---

**Last Updated**: January 2025
**Version**: 1.0.0

