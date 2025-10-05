import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, CreditCard as Edit2, X, Save } from 'lucide-react';
import { supabase, SiteContent } from '../../lib/supabase';

interface SiteContentManagerProps {
  onUpdate: () => void;
}

export function SiteContentManager({ onUpdate }: SiteContentManagerProps) {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    content_type: 'text' as SiteContent['content_type']
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('key', { ascending: true });

    if (!error && data) {
      setContents(data);
    }
    onUpdate();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('site_content')
        .update({ value: formData.value, content_type: formData.content_type, updated_at: new Date().toISOString() })
        .eq('id', editingId);

      if (!error) {
        fetchContents();
        setEditingId(null);
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('site_content')
        .insert([formData]);

      if (!error) {
        fetchContents();
        setIsAddingNew(false);
        resetForm();
      }
    }
  };

  const handleEdit = (content: SiteContent) => {
    setEditingId(content.id);
    setFormData({
      key: content.key,
      value: content.value,
      content_type: content.content_type
    });
    setIsAddingNew(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      const { error } = await supabase
        .from('site_content')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchContents();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      key: '',
      value: '',
      content_type: 'text'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Site Content</h2>
          <p className="text-sm text-gray-600">Manage dynamic content across your website</p>
        </div>
        <button
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            setEditingId(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          {isAddingNew ? <X size={20} /> : <Plus size={20} />}
          {isAddingNew ? 'Cancel' : 'Add Content'}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Key</label>
              <input
                type="text"
                required
                disabled={!!editingId}
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
                placeholder="e.g., hero_title, about_text"
              />
              <p className="text-xs text-gray-500 mt-1">Unique identifier for this content</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <select
                value={formData.content_type}
                onChange={(e) => setFormData({ ...formData, content_type: e.target.value as SiteContent['content_type'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="text">Text</option>
                <option value="html">HTML</option>
                <option value="url">URL</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
              <textarea
                required
                rows={formData.content_type === 'text' ? 3 : 6}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-mono text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save size={20} />
            {editingId ? 'Update' : 'Save'} Content
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {contents.map((content) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-800 font-mono">{content.key}</h3>
                  <span className="inline-block text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                    {content.content_type}
                  </span>
                </div>
                <div className="bg-gray-50 rounded p-3 mb-2">
                  {content.content_type === 'text' ? (
                    <p className="text-gray-700 text-sm">{content.value}</p>
                  ) : (
                    <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap break-all">
                      {content.value}
                    </pre>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  Last updated: {new Date(content.updated_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(content)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {contents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No content entries yet. Add your first content!</p>
        </div>
      )}
    </div>
  );
}
