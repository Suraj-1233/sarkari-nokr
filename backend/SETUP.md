# Backend Setup Guide

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- MongoDB Atlas account (or local MongoDB)

## MongoDB Atlas Setup

### Step 1: Get Your Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Login to your account
3. Click on "Connect" for your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<database>` with `sara` (or your preferred database name)

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority
```

### Step 2: Configure Network Access

1. In Atlas, go to "Network Access"
2. Add your IP address (or use `0.0.0.0/0` for development - **NOT recommended for production**)
3. For production, whitelist only your server IPs

### Step 3: Create Database User

1. In Atlas, go to "Database Access"
2. Create a new database user with read/write permissions
3. Save the username and password securely

## Environment Variables

Set these environment variables (or use `.env` file):

```bash
# MongoDB Atlas Connection String
# Format: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority

# JWT Secret (generate a strong secret)
# Generate with: openssl rand -base64 32
JWT_SECRET=your-super-secret-key-at-least-32-characters-long

# CORS Allowed Origins (comma-separated, no spaces)
CORS_ALLOWED_ORIGINS=http://localhost:4200,https://www.servicesarkari.com,https://sarkari-nokr.vercel.app
```

## Initial Admin User Setup

### Option 1: Using Environment Variables (Recommended)

Set these environment variables before first startup:

```bash
INIT_ADMIN_ENABLED=true
INIT_ADMIN_USERNAME=admin
INIT_ADMIN_PASSWORD=your-secure-password-here
```

**⚠️ IMPORTANT:** After the admin user is created, set `INIT_ADMIN_ENABLED=false` to prevent accidental recreation.

### Option 2: Using MongoDB Atlas Compass or Shell

1. Connect to your Atlas cluster using MongoDB Compass or Atlas Shell
2. Select the `sara` database
3. Create a `users` collection
4. Insert the admin user:

```javascript
use sara
db.users.insertOne({
  username: "admin",
  password: "$2a$10$YourBcryptHashedPasswordHere",
  role: "ADMIN",
  enabled: true
})
```

To generate a BCrypt hash:
- Use online tool: https://bcrypt-generator.com/
- Or use this Java code:
```java
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
String hashedPassword = encoder.encode("your-password");
System.out.println(hashedPassword);
```

### Option 3: Using DataInitializer (Already Implemented)

The `DataInitializer` class will automatically create the admin user on first startup if environment variables are set (see Option 1).

## Running the Application

### Quick Start with MongoDB Atlas

1. **Set Environment Variables:**
   ```bash
   export MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority"
   export JWT_SECRET="your-jwt-secret-key-here"
   export CORS_ALLOWED_ORIGINS="http://localhost:4200,https://www.servicesarkari.com"
   export INIT_ADMIN_ENABLED=true
   export INIT_ADMIN_USERNAME=admin
   export INIT_ADMIN_PASSWORD=your-secure-password
   ```

2. **Run the Application:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **After First Run:**
   - Disable admin initialization: `export INIT_ADMIN_ENABLED=false`
   - Or remove the environment variables

### Alternative: Using application.properties

1. Copy `application.properties.example` to `application.properties`
2. **DO NOT** put your real Atlas connection string in the file
3. Instead, set `MONGODB_URI` as environment variable
4. Run: `mvn spring-boot:run`

### For Production Deployment (Render, Heroku, etc.)

Set these environment variables in your hosting platform:
- `MONGODB_URI` - Your Atlas connection string
- `JWT_SECRET` - Strong secret key
- `CORS_ALLOWED_ORIGINS` - Your production domains
- `INIT_ADMIN_ENABLED=false` - Disable after first setup

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `application.properties` with real credentials
- Always use environment variables in production
- Rotate JWT secrets regularly
- Use strong passwords for admin accounts
- Enable HTTPS in production

