const { MongoClient } = require('mongodb');

const uri = 'mongodb://root:c4IjIRunf7kZ297RAv4dkh53o75pSE7x3uAH6P4fiu5N7gK1Kq2BY4N80AHU5D1U@37.60.251.163:5777/muhammedaslanweb?authSource=admin';

async function checkData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('muhammedaslanweb');

    // Check users
    const users = await db.collection('User').find({}).toArray();
    console.log('\n📊 Users:', users.length);
    if (users.length > 0) {
      users.forEach(user => {
        console.log(`  - ${user.email} (${user.role})`);
      });
    }

    // Check projects
    const projects = await db.collection('Project').find({}).toArray();
    console.log('\n📊 Projects:', projects.length);
    if (projects.length > 0) {
      projects.forEach(project => {
        console.log(`  - ${project.title} (${project.status})`);
      });
    }

    // Check blog posts
    const blogPosts = await db.collection('BlogPost').find({}).toArray();
    console.log('\n📊 Blog Posts:', blogPosts.length);
    if (blogPosts.length > 0) {
      blogPosts.forEach(post => {
        console.log(`  - ${post.title} (${post.status})`);
      });
    }

    // Check contact submissions
    const contacts = await db.collection('ContactSubmission').find({}).toArray();
    console.log('\n📊 Contact Submissions:', contacts.length);

    console.log('\n✨ Database check complete!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkData();
