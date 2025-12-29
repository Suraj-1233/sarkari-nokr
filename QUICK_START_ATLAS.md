# Quick Start Guide - MongoDB Atlas

## 🚀 Fast Setup (5 minutes)

### Step 1: Get Your Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your password and `<database>` with `sara`

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority
```

### Step 2: Set Environment Variables

**Linux/Mac:**
```bash
export MONGODB_URI="mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority"
export JWT_SECRET="your-secret-key-min-32-chars"
export CORS_ALLOWED_ORIGINS="http://localhost:4200,https://www.servicesarkari.com"
export INIT_ADMIN_ENABLED=true
export INIT_ADMIN_USERNAME=admin
export INIT_ADMIN_PASSWORD=your-secure-password
```

**Windows (PowerShell):**
```powershell
$env:MONGODB_URI="mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority"
$env:JWT_SECRET="your-secret-key-min-32-chars"
$env:CORS_ALLOWED_ORIGINS="http://localhost:4200,https://www.servicesarkari.com"
$env:INIT_ADMIN_ENABLED="true"
$env:INIT_ADMIN_USERNAME="admin"
$env:INIT_ADMIN_PASSWORD="your-secure-password"
```

### Step 3: Configure Network Access in Atlas

1. In Atlas dashboard → **"Network Access"**
2. Click **"Add IP Address"**
3. For development: Add `0.0.0.0/0` (allows all IPs)
4. For production: Add your server's specific IP

### Step 4: Run the Application

```bash
cd backend
mvn spring-boot:run
```

### Step 5: Verify Admin User Created

Check the logs - you should see:
```
✅ Default admin user created: admin
```

### Step 6: Disable Admin Initialization

After first run, disable it:
```bash
export INIT_ADMIN_ENABLED=false
```

## 🐳 Using Docker with Atlas

### Option 1: Using docker-compose.atlas.yml

1. Create `.env` file:
```bash
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
CORS_ALLOWED_ORIGINS=http://localhost:4200,https://www.servicesarkari.com
INIT_ADMIN_ENABLED=true
INIT_ADMIN_USERNAME=admin
INIT_ADMIN_PASSWORD=your-password
```

2. Run:
```bash
docker-compose -f docker-compose.atlas.yml up --build
```

### Option 2: Update docker-compose.yml

In `docker-compose.yml`, change backend environment:
```yaml
environment:
  - MONGODB_URI=${MONGODB_URI}  # Use Atlas
  # Remove or comment out: - SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/sara
```

## ✅ Verify Everything Works

1. **Backend is running:** http://localhost:8080
2. **Login works:** Use admin credentials
3. **Database connection:** Check logs for "Connected to MongoDB"

## 🔒 Security Checklist

- [ ] Connection string is in environment variable (not in code)
- [ ] JWT secret is strong (32+ characters)
- [ ] Network access is configured in Atlas
- [ ] Admin initialization is disabled after first run
- [ ] Database user has appropriate permissions

## 📚 More Help

- Detailed setup: `backend/SETUP.md`
- Atlas specific: `backend/MONGODB_ATLAS_SETUP.md`
- Full review: `PROJECT_REVIEW.md`

---

**Need help?** Check the detailed guides in the `backend/` directory.

