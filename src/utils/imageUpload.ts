import { supabase } from '../lib/supabase';

export const uploadImage = async (
  file: File,
  folder: 'gallery' | 'testimonials' | 'blog' | 'menu' | 'logo'
): Promise<string> => {
  const fileExt = file.name.split('.').pop();

  let fileName: string;
  if (folder === 'logo') {
    const { data: files } = await supabase.storage
      .from('gallery-images')
      .list('logo');

    if (files && files.length > 0) {
      for (const oldFile of files) {
        await supabase.storage
          .from('gallery-images')
          .remove([`logo/${oldFile.name}`]);
      }
    }

    fileName = `logo/site-logo.${fileExt}`;
  } else {
    fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  }

  const { data, error } = await supabase.storage
    .from('gallery-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: folder === 'logo'
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(data.path);

  return publicUrl;
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  if (!imageUrl.includes('supabase')) {
    return;
  }

  const path = imageUrl.split('/gallery-images/')[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from('gallery-images')
    .remove([path]);

  if (error) {
    console.error('Delete failed:', error);
  }
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.');
  }

  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB.');
  }

  return true;
};
