# Admin Panel Usage Guide

## Getting Started

### 1. Login to Admin Panel
- Navigate to `/admin/login`
- Use your admin credentials
- You'll be redirected to the dashboard

### 2. Dashboard Overview
The dashboard (`/admin/dashboard`) provides quick access to:
- **Projects Management**: Manage your portfolio projects
- **Blog Management**: Create and edit blog posts
- **Contact Messages**: View contact form submissions
- **User Management**: Manage admin users
- **Settings**: Configure site settings

## Managing Projects

### Creating a New Project

1. Navigate to **Projects** from the dashboard
2. Click **"Add Project"** button
3. Fill in the required fields:
   - **Title** (required): Auto-generates slug
   - **Slug** (required): URL-friendly identifier
   - **Excerpt** (required): Brief description
   - **Description** (required): Full project description
   - **Category** (required): e.g., "Web Development", "E-Commerce"

4. Optional fields:
   - **Client**: Client name
   - **Duration**: e.g., "3 months"
   - **Image URL**: Project cover image
   - **Live URL**: Link to live project
   - **GitHub URL**: Link to repository

5. Add tags:
   - **Technologies**: Type and press Enter or click Add
   - **Services**: What services you provided
   - **Achievements**: Project accomplishments
   - **Challenges**: Problems you solved
   - **Solutions**: How you solved them

6. Toggle **Featured Project** if you want it highlighted
7. Click **"Create Project"**

### Editing a Project

1. Go to **Projects** list
2. Find your project
3. Click the **⋯** (More) menu
4. Select **"Edit"**
5. Make your changes
6. Click **"Update Project"**

### Deleting a Project

1. Go to **Projects** list
2. Click **⋯** (More) menu on the project
3. Select **"Delete"**
4. Confirm the deletion

**Warning**: This action cannot be undone!

### Uploading Project Images

**Method 1: Upload from Computer**
1. Click **"Upload Image"** button
2. Select an image (JPEG, PNG, WebP, GIF)
3. Maximum size: 5MB
4. Image is automatically uploaded and URL is filled

**Method 2: Paste URL**
1. Paste image URL directly into the "Image URL" field
2. Preview will appear below

## Managing Blog Posts

### Creating a New Blog Post

1. Navigate to **Blog** from the dashboard
2. Click **"Add Blog Post"** button
3. Fill in required fields:
   - **Title** (required): Auto-generates slug and SEO title
   - **Slug** (required): URL-friendly identifier
   - **Excerpt** (required): Short summary for listings
   - **Content** (required): Full blog post in Markdown
   - **Category** (required): e.g., "Tutorial", "Web Development"
   - **Author** (required): Your name

4. Optional fields:
   - **Cover Image**: Blog post header image
   - **Publish Date**: When to publish (defaults to now)
   - **Author Avatar**: Your profile picture URL
   - **Author Bio**: Brief bio about you

5. SEO Settings (optional but recommended):
   - **SEO Title**: Custom title for search engines
   - **SEO Description**: Meta description for search results

6. Add **Tags**: Type and press Enter or click Add
7. Toggle **Featured Post** for homepage display
8. Click **"Create Post"**

The reading time is automatically calculated from your content!

### Using the Markdown Editor

#### Write Tab
- Use the toolbar for quick formatting:
  - **H1/H2**: Insert headings
  - **B/I**: Bold/Italic text
  - **Lists**: Bullet or numbered lists
  - **Link**: Insert hyperlinks
  - **Image**: Insert images
  - **Code**: Inline code
  - **Quote**: Blockquotes

#### Preview Tab
- See how your post will look
- All Markdown is rendered with proper styling
- Supports GitHub Flavored Markdown (tables, task lists, etc.)

#### Markdown Quick Reference

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet list item
- Another item

1. Numbered list
2. Second item

[Link text](https://example.com)
![Alt text](image-url.jpg)

`inline code`

> Blockquote

\`\`\`javascript
// Code block
const hello = "world"
\`\`\`
```

### Editing a Blog Post

1. Go to **Blog** list
2. Find your post
3. Click **⋯** (More) menu
4. Select **"Edit"**
5. Make your changes
6. Click **"Update Post"**

### Deleting a Blog Post

1. Go to **Blog** list
2. Click **⋯** (More) on the post
3. Select **"Delete"**
4. Confirm the deletion

## Search and Filtering

### Projects
- **Search**: Type in search box to filter by title, description, or excerpt
- **Category Filter**: Filter by project category
- **Pagination**: Navigate through pages if you have many projects

### Blog Posts
- **Search**: Type in search box to filter by title, excerpt, or content
- **Category Filter**: Filter by blog category
- **Pagination**: Navigate through pages if you have many posts

## Tips and Best Practices

### Images
1. **Optimize before upload**: Compress images to keep file sizes small
2. **Use descriptive names**: e.g., "project-ecommerce-homepage.jpg"
3. **Recommended dimensions**:
   - Project covers: 1200x630px
   - Blog covers: 1200x630px
4. **Formats**: WebP is best for quality/size balance

### SEO
1. **Unique slugs**: Each project/post needs a unique slug
2. **Descriptive titles**: Clear, keyword-rich titles
3. **Compelling excerpts**: 150-160 characters for search results
4. **Alt text**: Always add alt text to images
5. **Tags**: Use 3-5 relevant tags per post

### Content Writing
1. **Clear headings**: Use heading hierarchy (H2 → H3 → H4)
2. **Short paragraphs**: 2-3 sentences max
3. **Bullet points**: Break up long content
4. **Code blocks**: Use syntax highlighting for code
5. **Images**: Add visual breaks every 300-400 words

### Projects
1. **Showcase results**: Focus on achievements and impact
2. **Be specific**: Use numbers and metrics
3. **Tell a story**: Problem → Solution → Results
4. **Technologies**: List all relevant tech used
5. **Live demos**: Always include live URL if possible

### Blog Posts
1. **Engaging titles**: Ask questions or promise solutions
2. **Hook readers**: Start with a problem or interesting fact
3. **Actionable content**: Provide step-by-step instructions
4. **Examples**: Include real-world examples
5. **Call-to-action**: End with next steps or questions

## Troubleshooting

### "Unauthorized" Error
- Your session may have expired
- Log out and log back in

### Image Upload Fails
- Check file size (must be under 5MB)
- Verify file format (JPEG, PNG, WebP, or GIF)
- Try a different image

### Slug Already Exists
- Each slug must be unique
- Modify the slug slightly (add a number or date)

### Content Not Saving
- Ensure all required fields are filled
- Check your internet connection
- Try again or refresh the page

### Preview Not Working
- Make sure you're in the Preview tab
- Check if there are any Markdown syntax errors
- Try switching back to Write and then Preview again

## Keyboard Shortcuts

### Markdown Editor
- `Ctrl/Cmd + B`: Bold
- `Ctrl/Cmd + I`: Italic
- `Ctrl/Cmd + K`: Insert link
- `Enter`: Insert tag/technology

## Getting Help

If you encounter issues:
1. Check this guide first
2. Verify all required fields are filled
3. Check browser console for errors (F12)
4. Clear cache and try again

---

**Happy Content Creating!** 🎉

For technical support or questions, contact your developer.
