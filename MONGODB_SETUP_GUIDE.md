# MongoDB Replica Set Configuration Guide

## The Problem

You're getting the error: **"MongoDB replica set configuration required"**

This happens because Prisma uses MongoDB transactions, which require a replica set configuration. Even for local development, MongoDB needs to be configured as a replica set.

## Solutions (Choose One)

### ✅ Solution 1: Use MongoDB Atlas (Recommended - Easiest)

MongoDB Atlas provides a free tier with replica sets already configured.

1. **Create Free Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new cluster (Free M0 tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

3. **Update .env.local**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

4. **Test Connection**
   ```bash
   npx prisma db push
   ```

---

### ✅ Solution 2: Configure Local MongoDB as Replica Set

If you want to use local MongoDB, you need to configure it as a replica set.

#### For Windows:

1. **Stop MongoDB Service**
   ```powershell
   net stop MongoDB
   ```

2. **Edit MongoDB Configuration**
   - Open: `C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg`
   - Add these lines:
   ```yaml
   replication:
     replSetName: "rs0"
   ```

3. **Start MongoDB**
   ```powershell
   net start MongoDB
   ```

4. **Initialize Replica Set**
   ```powershell
   mongosh
   ```
   Then in mongosh:
   ```javascript
   rs.initiate()
   ```

5. **Update .env.local**
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio?replicaSet=rs0
   ```

#### For Mac/Linux:

1. **Stop MongoDB**
   ```bash
   brew services stop mongodb-community
   # or
   sudo systemctl stop mongod
   ```

2. **Edit Configuration**
   ```bash
   # Mac
   nano /usr/local/etc/mongod.conf
   # Linux
   sudo nano /etc/mongod.conf
   ```
   
   Add:
   ```yaml
   replication:
     replSetName: "rs0"
   ```

3. **Start MongoDB**
   ```bash
   # Mac
   brew services start mongodb-community
   # Linux
   sudo systemctl start mongod
   ```

4. **Initialize Replica Set**
   ```bash
   mongosh
   ```
   Then:
   ```javascript
   rs.initiate()
   ```

5. **Update .env.local**
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio?replicaSet=rs0
   ```

---

### ✅ Solution 3: Use Docker (Recommended for Development)

This is the easiest way to run MongoDB with replica set locally.

1. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     mongodb:
       image: mongo:7
       container_name: mongodb-replica
       command: ["--replSet", "rs0", "--bind_ip_all"]
       ports:
         - "27017:27017"
       volumes:
         - mongodb_data:/data/db
       environment:
         MONGO_INITDB_ROOT_USERNAME: admin
         MONGO_INITDB_ROOT_PASSWORD: password123
       healthcheck:
         test: echo "try { rs.status() } catch (err) { rs.initiate({_id:'rs0',members:[{_id:0,host:'localhost:27017'}]}) }" | mongosh --port 27017 --quiet
         interval: 5s
         timeout: 30s
         start_period: 0s
         retries: 30

   volumes:
     mongodb_data:
   ```

2. **Start MongoDB**
   ```bash
   docker-compose up -d
   ```

3. **Update .env.local**
   ```env
   MONGODB_URI=mongodb://admin:password123@localhost:27017/portfolio?authSource=admin&replicaSet=rs0
   ```

---

### ✅ Solution 4: Disable Transactions (Quick Fix - Not Recommended)

If you just want to test quickly, you can modify the Prisma client to not use transactions.

**Update API routes to not use transactions:**

This is already partially implemented in your code. The error handling catches the P2031 error code.

---

## Quick Start (Recommended Path)

### For Production: Use MongoDB Atlas
1. Create free MongoDB Atlas account
2. Get connection string
3. Update `.env.local`
4. Run `npx prisma db push`

### For Development: Use Docker
1. Create `docker-compose.yml` (see Solution 3)
2. Run `docker-compose up -d`
3. Update `.env.local`
4. Run `npx prisma db push`

## Verify Setup

After configuring, test your connection:

```bash
# Push schema to database
npx prisma db push

# Open Prisma Studio to verify
npx prisma studio
```

## Troubleshooting

### Error: "Connection refused"
- Check if MongoDB is running
- Verify port 27017 is not blocked
- Check firewall settings

### Error: "Authentication failed"
- Verify username/password in connection string
- Check if user has correct permissions

### Error: "Replica set not initialized"
- Run `rs.initiate()` in mongosh
- Wait a few seconds and try again

### Docker Issues
```bash
# Check container status
docker ps

# View logs
docker logs mongodb-replica

# Restart container
docker-compose restart

# Reset everything
docker-compose down -v
docker-compose up -d
```

## Current Connection String Format

Your `.env.local` should have one of these formats:

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Local with Replica Set:**
```env
MONGODB_URI=mongodb://localhost:27017/portfolio?replicaSet=rs0
```

**Docker:**
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/portfolio?authSource=admin&replicaSet=rs0
```

## Next Steps

1. Choose a solution above
2. Configure MongoDB
3. Update `.env.local`
4. Run `npx prisma db push`
5. Test by creating a project in the admin panel

## Need Help?

If you continue to have issues:
1. Check MongoDB is running: `mongosh --eval "db.version()"`
2. Verify replica set: `mongosh --eval "rs.status()"`
3. Check connection string format
4. Review error logs in terminal