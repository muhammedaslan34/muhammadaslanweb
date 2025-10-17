const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = 'mongodb://root:c4IjIRunf7kZ297RAv4dkh53o75pSE7x3uAH6P4fiu5N7gK1Kq2BY4N80AHU5D1U@37.60.251.163:5777/muhammedaslanweb?authSource=admin';

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('muhammedaslanweb');

    // Create admin user
    console.log('\n👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('Admin123!', 12);

    const usersCollection = db.collection('User');
    await usersCollection.deleteMany({ email: 'admin@muhammadaslan.com' });

    await usersCollection.insertOne({
      email: 'admin@muhammadaslan.com',
      name: 'Muhammad Aslan',
      password: hashedPassword,
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('✅ Admin user created: admin@muhammadaslan.com / Admin123!');

    // Create sample projects
    console.log('\n📦 Creating sample projects...');
    const projectsCollection = db.collection('Project');
    await projectsCollection.deleteMany({});

    const projects = [
      {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'A full-featured e-commerce platform built with Next.js and MongoDB',
        content: '## Overview\n\nThis project is a modern e-commerce platform featuring product management, shopping cart, checkout process, and payment integration.\n\n## Features\n\n- Product catalog with search and filtering\n- Shopping cart and wishlist\n- User authentication and profiles\n- Order management\n- Payment integration with Stripe\n- Admin dashboard\n\n## Technologies\n\n- Next.js 15\n- MongoDB with Prisma\n- Tailwind CSS\n- Stripe API',
        excerpt: 'A full-featured e-commerce platform with cart, checkout, and payment integration',
        imageUrl: '/images/projects/ecommerce.jpg',
        technologies: ['Next.js', 'MongoDB', 'Prisma', 'Stripe', 'Tailwind CSS'],
        category: 'Web Application',
        status: 'PUBLISHED',
        featured: true,
        liveUrl: 'https://example-ecommerce.com',
        githubUrl: 'https://github.com/example/ecommerce',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'WordPress Theme Development',
        slug: 'wordpress-theme-dev',
        description: 'Custom WordPress theme with Gutenberg blocks and advanced customization',
        content: '## Overview\n\nA custom WordPress theme built from scratch with modern development practices and full Gutenberg support.\n\n## Features\n\n- Custom Gutenberg blocks\n- Advanced theme customizer options\n- WooCommerce integration\n- Performance optimized\n- Mobile responsive\n- SEO friendly\n\n## Technologies\n\n- WordPress\n- PHP\n- JavaScript (ES6+)\n- Sass\n- Webpack',
        excerpt: 'Custom WordPress theme with modern features and Gutenberg block support',
        imageUrl: '/images/projects/wordpress-theme.jpg',
        technologies: ['WordPress', 'PHP', 'JavaScript', 'Sass', 'Gutenberg'],
        category: 'WordPress',
        status: 'PUBLISHED',
        featured: true,
        liveUrl: 'https://example-theme.com',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-05-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Portfolio Management System',
        slug: 'portfolio-management',
        description: 'Content management system for managing portfolio projects and blog posts',
        content: '## Overview\n\nA headless CMS built specifically for portfolio management with a clean admin interface.\n\n## Features\n\n- Project management with CRUD operations\n- Blog post management\n- Image upload and optimization\n- Markdown editor with preview\n- SEO metadata management\n- Role-based access control\n\n## Technologies\n\n- Next.js 15 App Router\n- MongoDB with Prisma\n- NextAuth.js\n- React Hook Form\n- Tailwind CSS',
        excerpt: 'Full-featured CMS for managing portfolio content with admin dashboard',
        imageUrl: '/images/projects/cms.jpg',
        technologies: ['Next.js', 'MongoDB', 'NextAuth', 'TypeScript', 'Tailwind'],
        category: 'Web Application',
        status: 'PUBLISHED',
        featured: false,
        githubUrl: 'https://github.com/example/portfolio-cms',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-09-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await projectsCollection.insertMany(projects);
    console.log(`✅ Created ${projects.length} sample projects`);

    // Create sample blog posts
    console.log('\n📝 Creating sample blog posts...');
    const blogCollection = db.collection('BlogPost');
    await blogCollection.deleteMany({});

    const blogPosts = [
      {
        title: 'Getting Started with Next.js 15',
        slug: 'getting-started-nextjs-15',
        content: '## Introduction\n\nNext.js 15 brings exciting new features and improvements to the React framework. In this guide, we\'ll explore the key changes and how to get started.\n\n## New Features\n\n### 1. Improved App Router\n\nThe App Router now has better performance and more intuitive APIs for handling layouts and metadata.\n\n### 2. Server Components by Default\n\nAll components are now Server Components by default, improving performance and reducing client-side JavaScript.\n\n### 3. Async Request APIs\n\nDynamic route parameters and search params are now Promise-based for better type safety.\n\n## Getting Started\n\n```bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n```\n\n## Conclusion\n\nNext.js 15 is a major step forward in web development. Start exploring today!',
        excerpt: 'Learn about the new features in Next.js 15 and how to get started with the latest version',
        category: 'Web Development',
        tags: ['Next.js', 'React', 'JavaScript', 'Tutorial'],
        status: 'PUBLISHED',
        featured: true,
        imageUrl: '/images/blog/nextjs-15.jpg',
        publishedAt: new Date('2024-08-15'),
        metaTitle: 'Getting Started with Next.js 15 - Complete Guide',
        metaDescription: 'Learn about the new features in Next.js 15 including improved App Router, Server Components, and async APIs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'WordPress Performance Optimization Tips',
        slug: 'wordpress-performance-optimization',
        content: '## Introduction\n\nWebsite speed is crucial for user experience and SEO. Here are proven techniques to optimize your WordPress site.\n\n## 1. Choose Quality Hosting\n\nInvest in good hosting with:\n- Fast servers\n- CDN integration\n- Caching support\n- Regular backups\n\n## 2. Optimize Images\n\n- Use WebP format\n- Implement lazy loading\n- Use appropriate dimensions\n- Compress images before upload\n\n## 3. Use Caching\n\nImplement caching at multiple levels:\n- Browser caching\n- Page caching\n- Object caching\n- CDN caching\n\n## 4. Minimize Plugins\n\nOnly use essential plugins and:\n- Remove unused plugins\n- Use quality, well-maintained plugins\n- Combine functionality when possible\n\n## 5. Database Optimization\n\n- Clean up post revisions\n- Remove spam comments\n- Optimize database tables\n- Use transients wisely\n\n## Conclusion\n\nImplementing these optimizations can dramatically improve your WordPress site speed.',
        excerpt: 'Essential tips and techniques for optimizing WordPress website performance and speed',
        category: 'WordPress',
        tags: ['WordPress', 'Performance', 'Optimization', 'SEO'],
        status: 'PUBLISHED',
        featured: true,
        imageUrl: '/images/blog/wp-performance.jpg',
        publishedAt: new Date('2024-09-01'),
        metaTitle: 'WordPress Performance Optimization - 5 Essential Tips',
        metaDescription: 'Learn how to optimize your WordPress website for better performance with these proven techniques',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Building Modern Web Applications with TypeScript',
        slug: 'building-modern-web-apps-typescript',
        content: '## Why TypeScript?\n\nTypeScript adds static typing to JavaScript, making your code more maintainable and less error-prone.\n\n## Benefits\n\n### 1. Type Safety\n\nCatch errors at compile time instead of runtime.\n\n### 2. Better IDE Support\n\n- Intelligent code completion\n- Better refactoring tools\n- Inline documentation\n\n### 3. Enhanced Code Quality\n\n- Self-documenting code\n- Easier to maintain\n- Better team collaboration\n\n## Getting Started\n\n```bash\nnpm install -g typescript\ntsc --init\n```\n\n## Best Practices\n\n1. **Use strict mode**: Enable strict type checking\n2. **Define interfaces**: Create clear contracts for your data\n3. **Avoid any**: Use specific types whenever possible\n4. **Use enums**: For fixed sets of values\n5. **Leverage generics**: Write reusable, type-safe code\n\n## Example\n\n```typescript\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\nfunction getUser(id: string): Promise<User> {\n  // Implementation\n}\n```\n\n## Conclusion\n\nTypeScript is essential for building large-scale applications. Start using it today!',
        excerpt: 'Discover the benefits of TypeScript and learn how to build type-safe web applications',
        category: 'Web Development',
        tags: ['TypeScript', 'JavaScript', 'Programming', 'Tutorial'],
        status: 'PUBLISHED',
        featured: false,
        imageUrl: '/images/blog/typescript.jpg',
        publishedAt: new Date('2024-09-15'),
        metaTitle: 'Building Modern Web Applications with TypeScript',
        metaDescription: 'Learn why TypeScript is essential for modern web development and how to get started',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await blogCollection.insertMany(blogPosts);
    console.log(`✅ Created ${blogPosts.length} sample blog posts`);

    console.log('\n✨ Database seeding complete!');
    console.log('\n📋 Summary:');
    console.log(`   - 1 admin user`);
    console.log(`   - ${projects.length} projects`);
    console.log(`   - ${blogPosts.length} blog posts`);
    console.log('\n🔐 Admin credentials:');
    console.log('   Email: admin@muhammadaslan.com');
    console.log('   Password: Admin123!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
