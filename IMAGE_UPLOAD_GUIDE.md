# Image Upload Feature Documentation

## Overview
Your project now has a complete image upload system for managing project images! Images are uploaded to the server and stored in the `public/uploads` directory.

## Features Implemented

### ✅ Image Upload Component
- **Location**: `src/components/admin/image-upload.tsx`
- **Features**:
  - Drag-and-drop or click to upload
  - Image preview before and after upload
  - File type validation (JPEG, PNG, WebP, GIF)
  - File size validation (max 5MB)
  - Loading states during upload
  - Remove/change image functionality
  - Responsive design

### ✅ Upload API Endpoint
- **Location**: `src/app/api/upload/route.ts`
- **Features**:
  - Admin authentication required
  - File type validation
  - File size validation (5MB max)
  - Unique filename generation with timestamp
  - Organized uploads by type (projects, blog, etc.)
  - Returns uploaded file URL

### ✅ Project Forms Updated
1. **New Project Form** (`src/app/admin/projects/new/page.tsx`)
   - Image upload component integrated
   - Replaces manual URL input
   
2. **Edit Project Form** (`src/app/admin/projects/[id]/edit/page.tsx`)
   - Image upload component integrated
   - Shows existing image if available
   - Can change or remove image

3. **Projects List** (`src/app/admin/projects/page.tsx`)
   - Shows image thumbnails in table
   - Fallback icon for projects without images

## How to Use

### Uploading an Image

1. **Navigate to Project Form**
   - Go to Admin → Projects → Add Project (or Edit existing)

2. **Upload Image**
   - Click on the upload area or drag and drop an image
   - Supported formats: JPEG, PNG, WebP, GIF
   - Maximum size: 5MB
   - Image will be automatically uploaded to server

3. **Preview & Manage**
   - See preview of uploaded image
   - Click "Change Image" to upload a different one
   - Click "X" button to remove the image

4. **Save Project**
   - Image URL is automatically saved with the project
   - No need to manually enter URLs

### File Storage

Images are stored in:
```
public/
  uploads/
    projects/
      timestamp-filename.jpg
      timestamp-filename.png
      ...
```

### Accessing Uploaded Images

Images are accessible via URL:
```
/uploads/projects/timestamp-filename.jpg
```

## Technical Details

### Upload Process

1. **Client Side** (`ImageUpload` component):
   - User selects file
   - File validation (type, size)
   - Show preview using FileReader
   - Upload to API endpoint

2. **Server Side** (`/api/upload`):
   - Authenticate admin user
   - Validate file type and size
   - Generate unique filename
   - Save to disk
   - Return file URL

3. **Form Submission**:
   - Image URL stored in database
   - Used for display on public pages

### Security Features

- ✅ Admin authentication required
- ✅ File type whitelist (only images)
- ✅ File size limit (5MB)
- ✅ Unique filenames prevent overwrites
- ✅ Organized directory structure

### Validation Rules

**Allowed File Types:**
- image/jpeg
- image/jpg
- image/png
- image/webp
- image/gif

**File Size:**
- Maximum: 5MB (5,242,880 bytes)

**Filename:**
- Automatically generated: `timestamp-original-name.ext`
- Spaces replaced with hyphens
- Lowercase

## Component API

### ImageUpload Component Props

```typescript
interface ImageUploadProps {
  value?: string;           // Current image URL
  onChange: (url: string) => void;  // Callback when image changes
  label?: string;           // Label text (default: "Image")
  uploadType?: string;      // Upload directory (default: "projects")
  required?: boolean;       // Whether field is required
}
```

### Usage Example

```tsx
import { ImageUpload } from '@/components/admin/image-upload';

<ImageUpload
  value={formData.imageUrl}
  onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
  label="Project Image"
  uploadType="projects"
  required={false}
/>
```

## Extending the Feature

### Adding Upload for Other Content Types

1. **Create new upload directory**:
   ```bash
   mkdir public/uploads/blog
   mkdir public/uploads/general
   ```

2. **Use ImageUpload component**:
   ```tsx
   <ImageUpload
     value={imageUrl}
     onChange={setImageUrl}
     uploadType="blog"  // or "general", etc.
   />
   ```

### Customizing Upload Limits

Edit `src/app/api/upload/route.ts`:

```typescript
// Change max file size
const maxSize = 10 * 1024 * 1024; // 10MB

// Add more file types
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"  // Add SVG support
];
```

## Troubleshooting

### Upload Fails

**Check:**
1. File size is under 5MB
2. File type is supported
3. You're logged in as admin
4. `public/uploads/projects` directory exists
5. Server has write permissions

### Image Not Displaying

**Check:**
1. Image URL is saved in database
2. File exists in `public/uploads/projects/`
3. Next.js is serving static files correctly
4. Image path starts with `/uploads/`

### Permission Errors

**Windows:**
```powershell
# Ensure directory exists and is writable
New-Item -ItemType Directory -Path "public\uploads\projects" -Force
```

**Linux/Mac:**
```bash
# Ensure directory exists and is writable
mkdir -p public/uploads/projects
chmod 755 public/uploads/projects
```

## Best Practices

1. **Image Optimization**
   - Compress images before upload
   - Use appropriate formats (WebP for web)
   - Keep file sizes reasonable

2. **Naming**
   - Use descriptive original filenames
   - System adds timestamp automatically

3. **Cleanup**
   - Periodically remove unused images
   - Consider implementing image deletion when project is deleted

4. **Backup**
   - Include `public/uploads/` in your backup strategy
   - Consider cloud storage for production

## Future Enhancements

Potential improvements:
- [ ] Image cropping/resizing
- [ ] Multiple image upload
- [ ] Cloud storage integration (AWS S3, Cloudinary)
- [ ] Image optimization on upload
- [ ] Automatic thumbnail generation
- [ ] Image gallery management
- [ ] Drag-and-drop reordering

## Support

For issues or questions:
1. Check this documentation
2. Review error messages in browser console
3. Check server logs for upload errors
4. Verify file permissions and directory structure