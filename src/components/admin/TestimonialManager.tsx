import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, CreditCard as Edit2, X, Save, Star } from 'lucide-react';
import { supabase, Testimonial } from '../../lib/supabase';

interface TestimonialManagerProps {
  onUpdate: () => void;
}

export function TestimonialManager({ onUpdate }: TestimonialManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    reviewer_name: '',
    reviewer_role: '',
    content: '',
    rating: 5,
    video_url: '',
    display_order: 0,
    is_featured: false
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTestimonials(data);
    }
    onUpdate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', editingId);

      if (!error) {
        fetchTestimonials();
        setEditingId(null);
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);

      if (!error) {
        fetchTestimonials();
        setIsAddingNew(false);
        resetForm();
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      reviewer_name: testimonial.reviewer_name,
      reviewer_role: testimonial.reviewer_role,
      content: testimonial.content,
      rating: testimonial.rating,
      video_url: testimonial.video_url || '',
      display_order: testimonial.display_order,
      is_featured: testimonial.is_featured
    });
    setIsAddingNew(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchTestimonials();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      reviewer_name: '',
      reviewer_role: '',
      content: '',
      rating: 5,
      video_url: '',
      display_order: 0,
      is_featured: false
    });
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Name</label>
              <input
                type="text"
                required
                value={formData.reviewer_name}
                onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Role</label>
              <input
                type="text"
                value={formData.reviewer_role}
                onChange={(e) => setFormData({ ...formData, reviewer_role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., CEO, Bride, Event Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={star <= formData.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (optional)</label>
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="https://youtube.com/... or https://instagram.com/..."
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured on Homepage</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save size={20} />
            {editingId ? 'Update' : 'Save'} Testimonial
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-6 relative"
          >
            {testimonial.is_featured && (
              <div className="absolute top-4 right-4">
                <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              </div>
            )}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xl">
                {testimonial.reviewer_name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{testimonial.reviewer_name}</h3>
                {testimonial.reviewer_role && (
                  <p className="text-sm text-gray-500">{testimonial.reviewer_role}</p>
                )}
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
            <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
            {testimonial.video_url && (
              <p className="text-xs text-gray-400 mb-4 truncate">Video: {testimonial.video_url}</p>
            )}
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

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No testimonials yet. Add your first testimonial!</p>
        </div>
      )}
    </div>
  );
}
