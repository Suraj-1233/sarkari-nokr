# MongoDB Atlas Setup Guide

## Quick Setup Steps

### 1. Get Your Connection String

1. Login to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Select your cluster
3. Click **"Connect"** button
4. Choose **"Connect your application"**
5. Select **"Java"** and version **"3.6 or later"**
6. Copy the connection string

**Example connection string:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority
```

### 2. Update Connection String

Replace these parts in the connection string:
- `<password>` → Your database user password
- `<database>` → `sara` (or your database name)

**Final format:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority
```

### 3. Set Environment Variable

**Linux/Mac:**
```bash
export MONGODB_URI="mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority"
```

**Windows (Command Prompt):**
```cmd
set MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority
```

**Windows (PowerShell):**
```powershell
$env:MONGODB_URI="mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority"
```

### 4. Configure Network Access

1. In Atlas dashboard, go to **"Network Access"**
2. Click **"Add IP Address"**
3. For development: Add `0.0.0.0/0` (allows all IPs - **use only for testing**)
4. For production: Add your server's specific IP address

### 5. Verify Database User

1. Go to **"Database Access"** in Atlas
2. Ensure your database user has:
   - **Read and write** permissions
   - Access to the `sara` database (or your database name)

## Testing the Connection

After setting the environment variable, start your application:

```bash
cd backend
mvn spring-boot:run
```

Check the logs - you should see:
```
✅ Connected to MongoDB Atlas successfully
```

If you see connection errors:
- Verify your connection string format
- Check network access settings
- Verify database user credentials
- Ensure the database name is correct

## Common Issues

### Issue: "Authentication failed"
**Solution:** 
- Verify username and password in connection string
- Check database user permissions in Atlas

### Issue: "Connection timeout"
**Solution:**
- Add your IP address to Network Access whitelist
- Check firewall settings

### Issue: "Database not found"
**Solution:**
- Atlas creates databases automatically on first write
- Or create the database manually in Atlas

## Security Best Practices

1. **Never commit connection strings** to Git
2. **Use environment variables** for all sensitive data
3. **Rotate passwords** regularly
4. **Restrict network access** to specific IPs in production
5. **Use strong passwords** for database users
6. **Enable MongoDB Atlas encryption** at rest

## Production Deployment

For production (Render, Heroku, AWS, etc.):

1. Set `MONGODB_URI` in your hosting platform's environment variables
2. Set `JWT_SECRET` as environment variable
3. Set `CORS_ALLOWED_ORIGINS` with your production domains
4. Whitelist only your server IPs in Atlas Network Access
5. Use Atlas M10+ cluster for production workloads

## Example Environment Variables for Production

```bash
MONGODB_URI=mongodb+srv://prod-user:strong-password@cluster0.xxxxx.mongodb.net/sara?retryWrites=true&w=majority
JWT_SECRET=your-production-jwt-secret-min-32-chars
CORS_ALLOWED_ORIGINS=https://www.servicesarkari.com,https://servicesarkari.com
INIT_ADMIN_ENABLED=false
```

---

**Need Help?** Check MongoDB Atlas [Documentation](https://docs.atlas.mongodb.com/)

