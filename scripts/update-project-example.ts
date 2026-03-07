/**
 * Example script to update a project with new fields
 * Run this with: npx tsx scripts/update-project-example.ts
 */

import { connectToDatabase } from '../src/lib/mongoose'
import { ProjectModel } from '../src/models/Project'

async function updateProject() {
  try {
    await connectToDatabase()

    // Example: Update a project by slug
    const projectSlug = 'your-project-slug' // Replace with actual slug

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { slug: projectSlug },
      {
        $set: {
          // Key Features (array of strings)
          features: [
            'Responsive design that works on all devices',
            'Fast page load times with optimized assets',
            'SEO-friendly architecture',
            'Modern UI/UX with smooth animations',
            'Secure authentication and authorization',
          ],

          // Gallery (array of image URLs)
          gallery: [
            '/assets/project-screenshot-1.png',
            '/assets/project-screenshot-2.png',
            '/assets/project-screenshot-3.png',
          ],

          // Metrics (array of objects)
          metrics: [
            { label: 'Page Load Time', value: '< 2s' },
            { label: 'Performance Score', value: '95/100' },
            { label: 'User Satisfaction', value: '4.8/5' },
          ],

          // Testimonials (array of objects)
          testimonials: [
            {
              text: 'Outstanding work! The project exceeded our expectations.',
              author: 'John Doe',
              role: 'CEO, Example Company',
            },
          ],

          // Timeline (array of objects)
          timeline: [
            {
              phase: 'Discovery & Planning',
              description: 'Initial research, requirements gathering, and project planning',
              date: 'Week 1-2',
            },
            {
              phase: 'Design & Prototyping',
              description: 'UI/UX design, wireframing, and creating interactive prototypes',
              date: 'Week 3-4',
            },
            {
              phase: 'Development',
              description: 'Frontend and backend development, API integration',
              date: 'Week 5-8',
            },
            {
              phase: 'Testing & Launch',
              description: 'QA testing, bug fixes, and production deployment',
              date: 'Week 9-10',
            },
          ],
        },
      },
      { new: true }
    )

    if (updatedProject) {
      console.log('✅ Project updated successfully!')
      console.log('Project:', updatedProject.title)
    } else {
      console.log('❌ Project not found')
    }
  } catch (error) {
    console.error('Error updating project:', error)
  } finally {
    process.exit()
  }
}

updateProject()
