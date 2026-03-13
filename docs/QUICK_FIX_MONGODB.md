# 🚀 Quick Fix: MongoDB Replica Set Error

## The Error You're Seeing

```
MongoDB replica set configuration required
```

## ⚡ Fastest Solution (5 Minutes)

### Option A: Use Docker (Recommended)

1. **Make sure Docker Desktop is running**

2. **Start MongoDB**
   ```powershell
   docker-compose up -d
   ```

3. **Wait 30 seconds** for initialization

4. **Update your `.env.local`** file:
   ```env
   MONGODB_URI=mongodb://admin:password123@localhost:27017/portfolio?authSource=admin&replicaSet=rs0
   ```

5. **Push database schema**
   ```powershell
   npx prisma db push
   ```

6. **Start your app**
   ```powershell
   npm run dev
   ```

✅ **Done!** Your MongoDB is now configured with replica set.

---

### Option B: Use MongoDB Atlas (Cloud - Free)

1. **Go to** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create free account** and cluster (M0 Free tier)

3. **Get connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update `.env.local`**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   (Replace username, password, and cluster URL)

5. **Push database schema**
   ```powershell
   npx prisma db push
   ```

6. **Start your app**
   ```powershell
   npm run dev
   ```

✅ **Done!** Using cloud MongoDB.

---

## 🔍 Verify It's Working

After setup, test your connection:

```powershell
# This should work without errors
npx prisma db push

# Open Prisma Studio to see your database
npx prisma studio
```

## 🐛 Still Having Issues?

### Docker not starting?
```powershell
# Check if Docker Desktop is running
docker ps

# View MongoDB logs
docker logs mongodb-portfolio

# Restart everything
docker-compose down
docker-compose up -d
```

### Connection refused?
- Make sure Docker Desktop is running
- Check if port 27017 is available
- Try restarting Docker Desktop

### Authentication failed?
- Double-check your `.env.local` connection string
- Make sure there are no extra spaces
- Verify username and password

## 📚 Need More Help?

See detailed guides:
- `MONGODB_SETUP_GUIDE.md` - Complete setup instructions
- `docker-compose.yml` - Docker configuration
- Run `setup-mongodb.ps1` - Automated setup script

## 🎯 What's Next?

Once MongoDB is working:
1. Create an admin user (if not already done)
2. Go to `/admin/projects`
3. Create your first project
4. Upload images and test the form

Everything should work now! 🎉