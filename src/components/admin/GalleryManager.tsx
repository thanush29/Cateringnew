import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, CreditCard as Edit2, X, Save, Loader2 } from 'lucide-react';
import { supabase, GalleryImage } from '../../lib/supabase';
import ImageUpload from './ImageUpload';
import { uploadImage, deleteImage } from '../../utils/imageUpload';

interface GalleryManagerProps {
  onUpdate: () => void;
}

export function GalleryManager({ onUpdate }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    alt_text: '',
    image_url: '',
    category: 'Wedding' as GalleryImage['category'],
    display_order: 0
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setImages(data);
    }
    onUpdate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate image URL
    if (!formData.image_url || formData.image_url.trim() === '') {
      setError('Please upload an image or provide an image URL');
      return;
    }

    setIsSaving(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('gallery_images')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;

        await fetchImages();
        setEditingId(null);
        resetForm();
        setIsAddingNew(false);
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert([formData]);

        if (error) throw error;

        await fetchImages();
        setIsAddingNew(false);
        resetForm();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save image');
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setFormData({
      title: image.title,
      alt_text: image.alt_text,
      image_url: image.image_url,
      category: image.category,
      display_order: image.display_order
    });
    setIsAddingNew(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const imageToDelete = images.find(img => img.id === id);
        if (imageToDelete?.image_url) {
          await deleteImage(imageToDelete.image_url);
        }

        const { error } = await supabase
          .from('gallery_images')
          .delete()
          .eq('id', id);

        if (error) throw error;

        await fetchImages();
      } catch (err: any) {
        alert('Failed to delete image: ' + err.message);
        console.error('Delete error:', err);
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    setError(null);
    setIsUploading(true);
    
    try {
      const imageUrl = await uploadImage(file, 'gallery');
      setFormData({ ...formData, image_url: imageUrl });
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      alt_text: '',
      image_url: '',
      category: 'Wedding',
      display_order: 0
    });
    setError(null);
  };

  const categories: GalleryImage['category'][] = ['Wedding', 'Corporate', 'Private', 'Outdoor', 'Luxury'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gallery Images</h2>
        <button
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            setEditingId(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          {isAddingNew ? <X size={20} /> : <Upload size={20} />}
          {isAddingNew ? 'Cancel' : 'Add Image'}
        </button>
      </div>

      {isAddingNew && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-lg p-6 mb-6"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Beautiful Wedding Setup"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryImage['category'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image <span className="text-red-500">*</span>
              </label>
              <ImageUpload
                onUpload={handleImageUpload}
                currentImageUrl={formData.image_url}
                label="Upload Gallery Image"
              />
              
              {isUploading && (
                <div className="mt-2 flex items-center gap-2 text-blue-600">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Uploading image...</span>
                </div>
              )}

              {formData.image_url && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">✓ Image uploaded successfully</p>
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or paste image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="https://example.com/image.jpg"
                  disabled={isUploading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.alt_text}
                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Describe the image for accessibility"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="0"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving || isUploading || !formData.image_url}
            className="mt-6 flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                {editingId ? 'Update' : 'Save'} Image
              </>
            )}
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={image.image_url}
              alt={image.alt_text}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{image.title}</h3>
              <span className="inline-block text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                {image.category}
              </span>
              {image.display_order > 0 && (
                <span className="ml-2 text-xs text-gray-500">
                  Order: {image.display_order}
                </span>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {images.length === 0 && !isAddingNew && (
        <div className="text-center py-12 text-gray-500">
          <Upload size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No images yet</p>
          <p className="text-sm mt-2">Click "Add Image" to upload your first gallery image</p>
        </div>
      )}
    </div>
  );
}