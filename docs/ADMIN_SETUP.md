# Admin Dashboard Setup Guide

This guide will help you set up your admin dashboard with MongoDB and create sample projects.

## Quick Setup

### 1. Configure MongoDB Connection

Edit `.env.local` and set your MongoDB connection string:

```env
# MongoDB Atlas (Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/muhammadaslan-portfolio

# Or Local MongoDB
MONGODB_URI=mongodb://localhost:27017/muhammadaslan-portfolio
```

### 2. Create Admin User

```bash
node scripts/setup-admin.js
```

**Default Credentials:**
- Email: `admin@muhammadaslan.com`
- Password: `admin123`

### 3. Add Sample Projects (Optional)

```bash
node scripts/add-sample-projects.js
```

### 4. Access Your Dashboard

- **URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@muhammadaslan.com`
- **Password:** `admin123`

## Dashboard Features

- 📊 Project Statistics (Total, Featured, Categories)
- 📈 Recent Projects Showcase
- ⚡ Quick Actions for Content Management
- 🎨 Modern Glass Morphism Design
- 📱 Fully Responsive Layout
- 🔐 Secure Admin Authentication

## Managing Projects

### Add New Project
1. Go to `/admin/projects/new`
2. Fill in project details
3. Upload images and set categories
4. Mark as featured if desired

### Edit Project
1. Go to `/admin/projects`
2. Click the edit button on any project
3. Update project information
4. Save changes

### Delete Project
1. Go to `/admin/projects`
2. Click the delete button on any project
3. Confirm deletion

## Troubleshooting

### Issues with Admin User
- Ensure MongoDB is connected
- Run `node scripts/setup-admin.js` again
- Check `.env.local` configuration

### Dashboard Not Loading
- Verify `npm run dev` is running
- Check MongoDB connection
- Ensure admin user exists

### Projects Not Showing
- Run `node scripts/add-sample-projects.js`
- Check `/admin/projects` page
- Verify database connection

## Support

For issues with the dashboard, check the console logs or contact support.