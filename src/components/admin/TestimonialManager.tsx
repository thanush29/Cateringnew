import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, X, Save, Star, Loader2, Upload } from 'lucide-react';
import { supabase, Testimonial } from '../../lib/supabase';
import ImageUpload from './ImageUpload';
import { uploadImage, deleteImage } from '../../utils/imageUpload';

interface TestimonialManagerProps {
  onUpdate: () => void;
}

export function TestimonialManager({ onUpdate }: TestimonialManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    reviewer_name: '',
    content: '',
    rating: 5,
    photo_url: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTestimonials(data);
    }
    onUpdate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;

        await fetchTestimonials();
        setEditingId(null);
        resetForm();
        setIsAddingNew(false);
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);

        if (error) throw error;

        await fetchTestimonials();
        setIsAddingNew(false);
        resetForm();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save testimonial');
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      reviewer_name: testimonial.reviewer_name,
      content: testimonial.content,
      rating: testimonial.rating,
      photo_url: testimonial.photo_url || ''
    });
    setIsAddingNew(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const testimonialToDelete = testimonials.find(t => t.id === id);
        if (testimonialToDelete?.photo_url) {
          await deleteImage(testimonialToDelete.photo_url);
        }

        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', id);

        if (error) throw error;

        await fetchTestimonials();
      } catch (err: any) {
        alert('Failed to delete testimonial: ' + err.message);
        console.error('Delete error:', err);
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    setError(null);
    setIsUploading(true);
    
    try {
      const imageUrl = await uploadImage(file, 'testimonials');
      setFormData({ ...formData, photo_url: imageUrl });
    } catch (err: any) {
      setError(err.message || 'Failed to upload photo');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      reviewer_name: '',
      content: '',
      rating: 5,
      photo_url: ''
    });
    setError(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
        <button
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            setEditingId(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          {isAddingNew ? <X size={20} /> : <Plus size={20} />}
          {isAddingNew ? 'Cancel' : 'Add Testimonial'}
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
                Reviewer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.reviewer_name}
                onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={star <= formData.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Click stars to set rating</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo (Optional)
              </label>
              <ImageUpload
                onUpload={handleImageUpload}
                currentImageUrl={formData.photo_url}
                label="Upload Reviewer Photo"
              />
              
              {isUploading && (
                <div className="mt-2 flex items-center gap-2 text-blue-600">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Uploading photo...</span>
                </div>
              )}

              {formData.photo_url && (
                <div className="mt-3 flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <img 
                    src={formData.photo_url} 
                    alt="Preview" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <p className="text-sm text-green-700 font-medium">Photo uploaded successfully</p>
                </div>
              )}
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or paste photo URL
                </label>
                <input
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="https://example.com/photo.jpg"
                  disabled={isUploading}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Content <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Write the testimonial content here..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.content.length} characters
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving || isUploading}
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
                {editingId ? 'Update' : 'Save'} Testimonial
              </>
            )}
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                {testimonial.photo_url ? (
                  <img
                    src={testimonial.photo_url}
                    alt={testimonial.reviewer_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xl border-2 border-amber-200">
                    {testimonial.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {testimonial.reviewer_name}
                </h3>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 italic leading-relaxed">
              "{testimonial.content}"
            </p>
            
            <div className="text-xs text-gray-400 mb-4">
              Added on {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {testimonials.length === 0 && !isAddingNew && (
        <div className="text-center py-12 text-gray-500">
          <Star size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No testimonials yet</p>
          <p className="text-sm mt-2">Click "Add Testimonial" to create your first review</p>
        </div>
      )}
    </div>
  );
}