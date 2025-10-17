const bcrypt = require('bcryptjs')

async function hashPassword() {
  const password = 'admin123'
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log('Hashed Password:', hashedPassword)
  console.log('\nInsert this into MongoDB users collection:')
  console.log(JSON.stringify({
    email: 'admin@muhammadaslan.com',
    name: 'Muhammad Aslan',
    password: hashedPassword,
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date()
  }, null, 2))
}

hashPassword()
