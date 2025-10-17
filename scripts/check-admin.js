const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb://root:c4IjIRunf7kZ297RAv4dkh53o75pSE7x3uAH6P4fiu5N7gK1Kq2BY4N80AHU5D1U@37.60.251.163:5777/?authSource=admin";

async function checkAdmin() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db('muhammedaslanweb');
    const users = db.collection('users');

    // Find admin user
    const admin = await users.findOne({ email: 'admin@muhammadaslan.com' });

    if (!admin) {
      console.log('❌ Admin user not found!');
      return;
    }

    console.log('✅ Admin user found:');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Role:', admin.role);
    console.log('🆔 ID:', admin._id);
    console.log('🔐 Password Hash:', admin.password);
    console.log('📅 Created:', admin.createdAt);

    // Test password
    console.log('\n🧪 Testing password...');
    const testPassword = 'admin123';
    const isMatch = await bcrypt.compare(testPassword, admin.password);

    if (isMatch) {
      console.log('✅ Password "admin123" matches the hash!');
    } else {
      console.log('❌ Password does NOT match!');
      console.log('Creating new hash...');
      const newHash = await bcrypt.hash('admin123', 12);
      console.log('New hash:', newHash);

      // Update with new hash
      await users.updateOne(
        { email: 'admin@muhammadaslan.com' },
        { $set: { password: newHash, updatedAt: new Date() } }
      );
      console.log('✅ Password updated!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

checkAdmin();
