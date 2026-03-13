#!/usr/bin/env node

/**
 * Admin User Setup Script
 *
 * This script creates an admin user in your MongoDB database.
 * Run this script after setting up your MongoDB connection in .env.local
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('🔍 Checking for existing admin user...');

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@muhammadaslan.com' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email);
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      console.log('🔑 Role:', existingAdmin.role);
      return;
    }

    console.log('🔧 Creating new admin user...');

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@muhammadaslan.com',
        name: 'Muhammad Aslan',
        password: hashedPassword,
        role: 'ADMIN',
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminUser.email);
    console.log('👤 Name:', adminUser.name);
    console.log('🔑 Role:', adminUser.role);
    console.log('');
    console.log('🔐 Login Credentials:');
    console.log('   Email: admin@muhammadaslan.com');
    console.log('   Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);

    if (error.message.includes('Environment variable not found: MONGODB_URI')) {
      console.log('');
      console.log('🔧 Setup Required:');
      console.log('1. Set up your MongoDB connection in .env.local');
      console.log('2. For MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
      console.log('3. For local MongoDB: mongodb://localhost:27017/your-database');
      console.log('4. Run this script again');
    }

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createAdminUser();