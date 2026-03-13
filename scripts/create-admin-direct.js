const { MongoClient } = require('mongodb');

const uri = "mongodb://root:c4IjIRunf7kZ297RAv4dkh53o75pSE7x3uAH6P4fiu5N7gK1Kq2BY4N80AHU5D1U@37.60.251.163:5777/?authSource=admin";

async function createAdminUser() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('muhammedaslanweb');
    const users = db.collection('users');

    // Check if admin already exists
    const existing = await users.findOne({ email: 'admin@muhammadaslan.com' });

    if (existing) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email:', existing.email);
      return;
    }

    // Insert admin user
    const result = await users.insertOne({
      email: "admin@muhammadaslan.com",
      name: "Muhammad Aslan",
      password: "$2b$12$dtWeYEimHwDHnX2dLLNlPOzG7txBUCimEev1/dZaJEaCxVbJMAhdu",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@muhammadaslan.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 User ID:', result.insertedId);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

createAdminUser();
