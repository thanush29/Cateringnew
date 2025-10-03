import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageUpload from './ImageUpload';
import { uploadImage } from '../../utils/imageUpload';

export function LogoManager() {
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'logo_url')
      .maybeSingle();

    if (!error && data) {
      setLogoUrl(data.value);
    }
  };

  const handleLogoUpload = async (file: File) => {
    const imageUrl = await uploadImage(file, 'logo');
    setLogoUrl(imageUrl);
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'logo_url', value: logoUrl, updated_at: new Date().toISOString() });

    setLoading(false);

    if (error) {
      setMessage({ type: 'error', text: 'Failed to update logo' });
    } else {
      setMessage({ type: 'success', text: 'Logo updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Website Logo</h2>
        <p className="text-gray-600">Upload your logo to replace the default branding across the site.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <div className="space-y-4">
          <ImageUpload
            onUpload={handleLogoUpload}
            currentImageUrl={logoUrl}
            label="Upload Logo (PNG or JPG)"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Or paste URL</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              placeholder="https://..."
            />
          </div>

          {logoUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Current Logo Preview:</p>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                <img src={logoUrl} alt="Logo preview" className="h-20 w-auto" />
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={loading || !logoUrl}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Logo'}
          </button>

          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
