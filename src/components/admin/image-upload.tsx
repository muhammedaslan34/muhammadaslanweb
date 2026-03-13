'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  uploadType?: string;
  required?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  uploadType = 'projects',
  required = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File too large. Maximum size is 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', uploadType);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload image');
      }

      const data = await response.json();
      onChange(data.url);
      setPreview(data.url);
      toast.success('Image uploaded successfully!');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to upload image';
      toast.error(message);
      setPreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      
      <div className="space-y-4">
        {preview ? (
          <div className="relative group">
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border bg-muted">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized={preview.startsWith('data:')}
              />
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className="relative w-full h-64 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer bg-muted/50 hover:bg-muted flex flex-col items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, WebP or GIF (max. 5MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={uploading}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {preview ? 'Change Image' : 'Upload Image'}
          </Button>
          {preview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
