import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase, GalleryImage } from '../lib/supabase';

const categories = ['All', 'Wedding', 'Corporate', 'Private', 'Outdoor', 'Luxury'];

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Wedding Event',
    alt_text: 'Wedding catering setup',
    image_url: 'https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Corporate Lunch',
    alt_text: 'Corporate event catering',
    image_url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Birthday Party',
    alt_text: 'Private party catering',
    image_url: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Private',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Outdoor Event',
    alt_text: 'Outdoor catering setup',
    image_url: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Outdoor',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Luxury Dining',
    alt_text: 'Luxury event catering',
    image_url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Wedding Reception',
    alt_text: 'Wedding reception catering',
    image_url: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Business Meeting',
    alt_text: 'Corporate meeting catering',
    image_url: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Anniversary',
    alt_text: 'Anniversary celebration',
    image_url: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Private',
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Garden Party',
    alt_text: 'Outdoor garden party',
    image_url: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Outdoor',
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    title: 'Gala Dinner',
    alt_text: 'Luxury gala dinner',
    image_url: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    created_at: new Date().toISOString()
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setImages(data);
    } else {
      setImages(defaultImages);
    }
  };

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 text-white py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-white/95 font-medium"
          >
            Explore our memorable events and celebrations
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white shadow-xl'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-pink-100 hover:to-purple-100 hover:text-purple-700 shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.08, y: -10 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-xl cursor-pointer group border-4 border-transparent hover:border-pink-300"
              onClick={() => setLightboxImage(image)}
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-2"
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-rose-600/70 via-pink-600/70 to-purple-600/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white font-bold text-xl drop-shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{image.title}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={lightboxImage.image_url}
            alt={lightboxImage.alt_text}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
