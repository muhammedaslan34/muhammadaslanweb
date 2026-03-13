// Create admin user directly in MongoDB
db = db.getSiblingDB('muhammedaslanweb');

db.users.insertOne({
  email: "admin@muhammadaslan.com",
  name: "Muhammad Aslan",
  password: "$2b$12$dtWeYEimHwDHnX2dLLNlPOzG7txBUCimEev1/dZaJEaCxVbJMAhdu",
  role: "ADMIN",
  createdAt: new Date(),
  updatedAt: new Date()
});

print("Admin user created successfully!");
print("Email: admin@muhammadaslan.com");
print("Password: admin123");
