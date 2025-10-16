export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  slug: string
  category: string
  tags: string[]
  featured: boolean
  author: string
  authorAvatar?: string
  authorBio?: string
  publishedAt: string
  updatedAt: string
  readingTime: string
  coverImage?: string
  seoTitle?: string
  seoDescription?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern WordPress Themes with Block Editor",
    excerpt: "Learn how to create custom WordPress themes that leverage the full power of the Gutenberg block editor for maximum flexibility.",
    content: `# Building Modern WordPress Themes with Block Editor

WordPress has evolved significantly with the introduction of the Gutenberg block editor. This powerful tool has transformed how we create and manage content, offering unprecedented flexibility for both developers and content creators.

## What is the Block Editor?

The Gutenberg block editor, introduced in WordPress 5.0, represents a fundamental shift in how content is created and managed. Instead of a single content field, it uses a block-based approach where each piece of content is a separate block.

## Key Benefits

### 1. **Flexibility**
- Custom blocks can be created for specific content types
- Blocks can be reused across different pages and posts
- Layouts can be easily modified without touching code

### 2. **User Experience**
- Intuitive drag-and-drop interface
- Real-time preview of changes
- Mobile-responsive editing

### 3. **Developer Control**
- Precise control over block behavior
- Custom styling options
- Integration with modern JavaScript frameworks

## Creating Custom Blocks

\`\`\`javascript
// Example of a custom block registration
wp.blocks.registerBlockType('my-theme/custom-block', {
  title: 'Custom Block',
  icon: 'smiley',
  category: 'common',
  edit: function(props) {
    return (
      <div className={props.className}>
        <p>Hello, Custom Block!</p>
      </div>
    );
  },
  save: function(props) {
    return (
      <div className={props.className}>
        <p>Hello, Custom Block!</p>
      </div>
    );
  },
});
\`\`\`

## Best Practices

1. **Plan Your Block Structure**: Before coding, map out what blocks you'll need
2. **Use Component-Based Architecture**: Keep your blocks modular and reusable
3. **Implement Proper Styling**: Use CSS-in-JS or traditional CSS for consistent styling
4. **Test Thoroughly**: Ensure blocks work across different themes and devices
5. **Document Everything**: Provide clear documentation for content creators

## Theme Development Considerations

When developing block themes, consider:

- **Block Patterns**: Create reusable block combinations
- **Template Parts**: Design flexible template components
- **Global Styles**: Implement theme-wide styling options
- **Responsive Design**: Ensure blocks work on all devices

## Conclusion

The WordPress block editor opens up new possibilities for theme development. By embracing this technology, you can create more flexible, user-friendly themes that stand out in the crowded WordPress ecosystem.

Remember that the key to successful block theme development is understanding both the technical aspects and the user experience considerations. Start simple, iterate often, and always keep the end-user in mind.`,
    slug: "modern-wordpress-themes-block-editor",
    category: "WordPress",
    tags: ["WordPress", "Gutenberg", "PHP", "JavaScript", "Theme Development"],
    featured: true,
    author: "Muhammad Aslan",
    authorBio: "Web developer specializing in WordPress and modern web technologies.",
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readingTime: "8 min read",
    coverImage: "/images/blog/wordpress-block-editor.jpg",
    seoTitle: "Building Modern WordPress Themes with Block Editor | Muhammad Aslan",
    seoDescription: "Learn how to create custom WordPress themes that leverage the full power of the Gutenberg block editor for maximum flexibility."
  },
  {
    id: 2,
    title: "Next.js 14 App Router: Complete Migration Guide",
    excerpt: "Everything you need to know about migrating to Next.js 14's App Router, including best practices and common pitfalls.",
    content: `# Next.js 14 App Router: Complete Migration Guide

Next.js 14 introduced significant improvements to the App Router, making it more powerful and flexible than ever before. This guide will help you migrate your existing Next.js applications to take advantage of these new features.

## What is the App Router?

The App Router is a new routing paradigm in Next.js that leverages React Server Components (RSC) and provides a more intuitive way to build layouts, loading states, and error boundaries.

## Key Benefits

### 1. **Server Components by Default**
- Improved performance by default
- Reduced client-side JavaScript
- Better SEO capabilities

### 2. **Nested Layouts**
- Shared UI between routes
- Persistent state across navigation
- Complex routing patterns made simple

### 3. **Streaming and Suspense**
- Progressive rendering
- Improved perceived performance
- Better user experience

## Migration Steps

### Step 1: Update Dependencies

\`\`\`bash
npm install next@14 react@18 react-dom@18
\`\`\`

### Step 2: Update Project Structure

Move your pages to the \`app\` directory:

\`\`\`
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   ├── about/
│   │   └── page.tsx       # About page
│   └── blog/
│       ├── page.tsx       # Blog listing
│       └── [slug]/
│           └── page.tsx   # Blog post
└── components/
    └── ...
\`\`\`

### Step 3: Convert Components

Update your components to work with Server Components:

\`\`\`typescript
// Before (Client Component)
export default function BlogPost({ post }) {
  return <div>{post.title}</div>
}

// After (Server Component)
export default function BlogPost({ post }) {
  return <div>{post.title}</div>
}
\`\`\`

## Common Pitfalls

1. **Client-Side Only Code**: Move client-side code to \`'use client'\` components
2. **Data Fetching**: Use the new data fetching patterns
3. **Styling**: Update CSS-in-JS libraries for Server Components
4. **Metadata**: Use the new metadata API

## Best Practices

1. **Start Small**: Migrate one route at a time
2. **Test Thoroughly**: Ensure functionality is preserved
3. **Leverage Server Components**: Use them wherever possible
4. **Optimize Data Fetching**: Take advantage of the new patterns

## Conclusion

Migrating to the App Router requires careful planning and execution, but the benefits in performance and developer experience are well worth the effort.

Take your time, test thoroughly, and don't hesitate to consult the official Next.js documentation for specific use cases.`,
    slug: "nextjs-14-app-router-migration-guide",
    category: "React & Next.js",
    tags: ["Next.js", "React", "TypeScript", "App Router", "Migration"],
    featured: true,
    author: "Muhammad Aslan",
    authorBio: "Full-stack developer with expertise in React and Next.js.",
    publishedAt: "2024-01-10",
    updatedAt: "2024-01-10",
    readingTime: "12 min read",
    coverImage: "/images/blog/nextjs-app-router.jpg",
    seoTitle: "Next.js 14 App Router: Complete Migration Guide | Muhammad Aslan",
    seoDescription: "Everything you need to know about migrating to Next.js 14's App Router, including best practices and common pitfalls."
  },
  {
    id: 3,
    title: "Optimizing WordPress Performance in 2024",
    excerpt: "Proven strategies to make your WordPress site lightning fast with modern optimization techniques and tools.",
    content: `# Optimizing WordPress Performance in 2024

WordPress performance optimization has evolved significantly over the years. In this guide, we'll explore the latest techniques and tools to make your WordPress site lightning fast.

## Why Performance Matters

- **User Experience**: Faster sites provide better user experience
- **SEO**: Google uses page speed as a ranking factor
- **Conversions**: Faster sites have higher conversion rates
- **Mobile**: Performance is crucial on mobile devices

## Core Web Vitals

Understanding and optimizing for Core Web Vitals is essential:

1. **Largest Contentful Paint (LCP)**: Main content loading time
2. **First Input Delay (FID)**: Interactivity measurement
3. **Cumulative Layout Shift (CLS)**: Visual stability

## Optimization Strategies

### 1. **Hosting Environment**

Choose the right hosting solution:
- Managed WordPress hosting
- CDN integration
- Server location matters
- PHP version optimization

### 2. **Caching Strategy**

Implement comprehensive caching:
- Page caching
- Browser caching
- Object caching
- Database query caching

### 3. **Image Optimization**

Optimize images for web:
- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Compress images
- Use responsive images

### 4. **Code Optimization**

Minimize and optimize code:
- Minify CSS/JS files
- Remove unused CSS/JS
- Optimize database queries
- Use HTTP/2

### 5. **Plugin Management**

Manage plugins effectively:
- Remove unused plugins
- Choose lightweight alternatives
- Update regularly
- Monitor plugin performance

## Tools and Plugins

### Caching Plugins
- WP Rocket
- W3 Total Cache
- WP Super Cache

### Image Optimization
- Smush
- ShortPixel
- Imagify

### Performance Monitoring
- Query Monitor
- New Relic
- Google PageSpeed Insights

## Measurement and Monitoring

Regular performance testing:
- GTmetrix
- PageSpeed Insights
- WebPageTest
- Pingdom

## Conclusion

WordPress performance optimization is an ongoing process. Stay updated with the latest techniques and tools to ensure your site remains fast and efficient.

Remember that performance optimization should be part of your development workflow, not an afterthought.`,
    slug: "wordpress-performance-optimization-2024",
    category: "Performance",
    tags: ["WordPress", "Performance", "Optimization", "Core Web Vitals", "Speed"],
    featured: false,
    author: "Muhammad Aslan",
    authorBio: "Performance optimization specialist with WordPress expertise.",
    publishedAt: "2024-01-05",
    updatedAt: "2024-01-05",
    readingTime: "10 min read",
    coverImage: "/images/blog/wordpress-performance.jpg",
    seoTitle: "Optimizing WordPress Performance in 2024 | Muhammad Aslan",
    seoDescription: "Proven strategies to make your WordPress site lightning fast with modern optimization techniques and tools."
  },
  {
    id: 4,
    title: "Advanced TypeScript Patterns for React",
    excerpt: "Explore advanced TypeScript patterns that will make your React applications more type-safe and maintainable.",
    content: `# Advanced TypeScript Patterns for React

TypeScript has become essential for modern React development. Let's explore advanced patterns that will make your React applications more type-safe and maintainable.

## Why TypeScript with React?

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Improved autocompletion and refactoring
- **Documentation**: Types serve as documentation
- **Team Collaboration**: Clear contracts between components

## Advanced Patterns

### 1. **Generic Components**

Create reusable components with generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage
<List items={users} renderItem={(user) => <span>{user.name}</span>} />
\`\`\`

### 2. **Discriminated Unions**

Handle different prop shapes:

\`\`\`typescript
type ButtonProps = {
  variant: 'primary'
  onClick: () => void
} | {
  variant: 'secondary'
  href: string
}

function Button(props: ButtonProps) {
  if (props.variant === 'primary') {
    return <button onClick={props.onClick}>Click me</button>
  }
  return <a href={props.href}>Link</a>
}
\`\`\`

### 3. **Polymorphic Components**

Create components that can render different HTML elements:

\`\`\`typescript
import { ComponentPropsWithoutRef } from 'react'

type PolymorphicProps<T extends React.ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

function PolymorphicComponent<T extends React.ElementType = 'div'>({
  as,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div'
  return <Component {...props} />
}

// Usage
<PolymorphicComponent as="button">Button</PolymorphicComponent>
<PolymorphicComponent as="a" href="/">Link</PolymorphicComponent>
\`\`\`

### 4. **ForwardRef with Generics**

Properly type refs with generics:

\`\`\`typescript
import { forwardRef } from 'react'

interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, onChange }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    )
  }
)
\`\`\`

### 5. **Custom Hooks with Types**

Type your custom hooks properly:

\`\`\`typescript
interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(() => setError('Failed to fetch'))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
\`\`\`

## Best Practices

1. **Strict Mode**: Enable TypeScript strict mode
2. **Avoid \`any\`**: Use specific types instead
3. **Type Utilities**: Leverage built-in type utilities
4. **Consistent Naming**: Use consistent naming conventions
5. **Type Documentation**: Document complex types

## Conclusion

These advanced TypeScript patterns will help you build more robust and maintainable React applications. Start incorporating them into your projects gradually and see the benefits in code quality and developer experience.

Remember that TypeScript is a tool to help you write better code, not a replacement for good design principles.`,
    slug: "advanced-typescript-patterns-react",
    category: "Web Development",
    tags: ["TypeScript", "React", "Patterns", "Best Practices", "Type Safety"],
    featured: false,
    author: "Muhammad Aslan",
    authorBio: "TypeScript enthusiast and React developer.",
    publishedAt: "2023-12-28",
    updatedAt: "2023-12-28",
    readingTime: "15 min read",
    coverImage: "/images/blog/typescript-react.jpg",
    seoTitle: "Advanced TypeScript Patterns for React | Muhammad Aslan",
    seoDescription: "Explore advanced TypeScript patterns that will make your React applications more type-safe and maintainable."
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt: "A practical guide to choosing between CSS Grid and Flexbox for different layout scenarios in modern web design.",
    content: `# CSS Grid vs Flexbox: When to Use What

CSS Grid and Flexbox are both powerful layout tools, but knowing when to use each can be confusing. This guide will help you understand their strengths and choose the right tool for the job.

## Understanding the Basics

### CSS Grid
- Two-dimensional layout system
- Designed for complex layouts
- Rows and columns simultaneously
- Grid container and grid items

### Flexbox
- One-dimensional layout system
- Designed for content distribution
- Either row OR column
- Flex container and flex items

## When to Use CSS Grid

### 1. **Complex Page Layouts**

Grid excels at overall page structure:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
\`\`\`

### 2. **Card Grids**

Perfect for responsive card layouts:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### 3. **Asymmetrical Layouts**

Create complex, non-linear layouts:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
}

.gallery-item:first-child {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

## When to Use Flexbox

### 1. **Navigation Bars**

Perfect for horizontal navigation:

\`\`\`css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

### 2. **Centering Content**

Easily center content:

\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

### 3. **Form Layouts**

Great for form alignment:

\`\`\`css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}
\`\`\`

## Using Grid and Flexbox Together

They work great together:

\`\`\`css
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Common Patterns

### 1. **Holy Grail Layout**

\`\`\`css
.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer";
  min-height: 100vh;
}
\`\`\`

### 2. **Responsive Grid**

\`\`\`css
.responsive-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

### 3. **Flexbox Centering**

\`\`\`css
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

## Browser Support

Both have excellent browser support:
- CSS Grid: Supported in all modern browsers
- Flexbox: Supported in all modern browsers
- Consider your target audience

## Decision Guide

Choose **Grid** when:
- Creating overall page layouts
- Working with two-dimensional layouts
- Need precise control over both rows and columns
- Building complex grid systems

Choose **Flexbox** when:
- Working with one-dimensional layouts
- Aligning items in a container
- Building components
- Need content distribution

## Conclusion

Both CSS Grid and Flexbox are essential tools in modern web design. Understanding when to use each will make you a more effective developer.

Remember: it's not Grid vs Flexbox, it's Grid AND Flexbox. Use them together to create amazing layouts!`,
    slug: "css-grid-vs-flexbox-guide",
    category: "Web Development",
    tags: ["CSS", "Grid", "Flexbox", "Layout", "Web Design"],
    featured: false,
    author: "Muhammad Aslan",
    authorBio: "CSS enthusiast and layout specialist.",
    publishedAt: "2023-12-20",
    updatedAt: "2023-12-20",
    readingTime: "6 min read",
    coverImage: "/images/blog/css-grid-flexbox.jpg",
    seoTitle: "CSS Grid vs Flexbox: When to Use What | Muhammad Aslan",
    seoDescription: "A practical guide to choosing between CSS Grid and Flexbox for different layout scenarios in modern web design."
  },
  {
    id: 6,
    title: "Building Accessible React Components",
    excerpt: "Learn how to create React components that are accessible to all users, including those using assistive technologies.",
    content: `# Building Accessible React Components

Accessibility (a11y) is crucial for creating inclusive web applications. This guide will help you build React components that are accessible to all users.

## Why Accessibility Matters

- **Inclusive Design**: Everyone can use your application
- **Legal Requirements**: Many countries have accessibility laws
- **Better UX**: Accessible sites are generally more usable
- **Larger Audience**: Reach more users

## Core Principles

The WCAG guidelines are built on four principles:

1. **Perceivable**: Information must be presentable in ways users can perceive
2. **Operable**: Interface components must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough for various assistive technologies

## Common Accessibility Issues

### 1. **Missing Alt Text**

Images need descriptive alt text:

\`\`\`jsx
// Bad
<img src="logo.png" />

// Good
<img src="logo.png" alt="Company Logo" />

// Decorative images
<img src="decoration.png" alt="" role="presentation" />
\`\`\`

### 2. **Poor Form Labels**

Forms need proper labels:

\`\`\`jsx
// Bad
<input type="email" placeholder="Email" />

// Good
<label htmlFor="email">Email</label>
<input type="email" id="email" />
\`\`\`

### 3. **Keyboard Navigation**

Ensure keyboard accessibility:

\`\`\`jsx
function Button({ children, onClick }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick()
    }
  }

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
    </button>
  )
}
\`\`\`

## React Accessibility Patterns

### 1. **Semantic HTML**

Use semantic elements:

\`\`\`jsx
function App() {
  return (
    <main>
      <header>
        <h1>Application Title</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      
      <section>
        <h2>Content Section</h2>
        <p>Content goes here...</p>
      </section>
      
      <footer>
        <p>&copy; 2024 Company</p>
      </footer>
    </main>
  )
}
\`\`\`

### 2. **ARIA Attributes**

Use ARIA when needed:

\`\`\`jsx
function Accordion({ items }: { items: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button
            aria-expanded={openIndex === index}
            aria-controls={\`panel-\${index}\`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.title}
          </button>
          <div
            id={\`panel-\${index}\`}
            hidden={openIndex !== index}
            role="region"
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}
\`\`\`

### 3. **Focus Management**

Manage focus properly:

\`\`\`jsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className="modal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
\`\`\`

## Accessibility Testing

### 1. **Automated Testing**

Use tools like axe-core:

\`\`\`bash
npm install --save-dev @axe-core/react
\`\`\`

\`\`\`jsx
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should be accessible', async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
\`\`\`

### 2. **Manual Testing**

- Test with keyboard only
- Use screen readers
- Check color contrast
- Test with zoom

### 3. **Browser Tools**

- Chrome DevTools Lighthouse
- Firefox Accessibility Inspector
- Safari Web Inspector

## Best Practices

1. **Use Semantic HTML**: Choose the right elements
2. **Provide Alternatives**: Alt text, captions, transcripts
3. **Ensure Keyboard Access**: All interactive elements
4. **Manage Focus**: Logical focus order
5. **Test Early**: Include a11y in development

## Accessibility Libraries

### 1. **react-aria**

\`\`\`bash
npm install react-aria
\`\`\`

### 2. **downshift**

\`\`\`bash
npm install downshift
\`\`\`

### 3. **react-focus-lock**

\`\`\`bash
npm install react-focus-lock
\`\`\`

## Conclusion

Building accessible React components is not just about compliance—it's about creating better experiences for all users.

Start with semantic HTML, add ARIA when needed, test thoroughly, and always consider the user experience.

Remember that accessibility is a team effort. Include it in your design process, code reviews, and testing workflows.`,
    slug: "building-accessible-react-components",
    category: "Web Development",
    tags: ["React", "Accessibility", "A11y", "WCAG", "Inclusive Design"],
    featured: true,
    author: "Muhammad Aslan",
    authorBio: "Accessibility advocate and React developer.",
    publishedAt: "2023-12-15",
    updatedAt: "2023-12-15",
    readingTime: "9 min read",
    coverImage: "/images/blog/react-accessibility.jpg",
    seoTitle: "Building Accessible React Components | Muhammad Aslan",
    seoDescription: "Learn how to create React components that are accessible to all users, including those using assistive technologies."
  }
]

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category)
}

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured)
}

export const getRecentPosts = (limit: number = 6): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export const getPostCategories = (): string[] => {
  return [...new Set(blogPosts.map(post => post.category))]
}

export const getPostTags = (): string[] => {
  return [...new Set(blogPosts.flatMap(post => post.tags))]
}

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const relatedPosts = blogPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .sort((a, b) => {
      const aSharedTags = a.tags.filter(tag => currentPost.tags.includes(tag)).length
      const bSharedTags = b.tags.filter(tag => currentPost.tags.includes(tag)).length
      return bSharedTags - aSharedTags
    })
  
  return relatedPosts.slice(0, limit)
}