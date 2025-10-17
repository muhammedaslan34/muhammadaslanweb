const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  try {
    console.log('🔍 Testing login via Prisma...\n');

    // Try to find user
    const user = await prisma.user.findUnique({
      where: {
        email: 'admin@muhammadaslan.com'
      }
    });

    if (!user) {
      console.log('❌ User not found via Prisma!');
      console.log('This might be why login is failing.\n');
      return;
    }

    console.log('✅ User found via Prisma:');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.name);
    console.log('🔑 Role:', user.role);
    console.log('🆔 ID:', user.id);

    // Test password
    console.log('\n🧪 Testing password...');
    const isMatch = await bcrypt.compare('admin123', user.password);

    if (isMatch) {
      console.log('✅ Password matches! Login should work.');
    } else {
      console.log('❌ Password does NOT match!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  This might be the login issue!');
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
