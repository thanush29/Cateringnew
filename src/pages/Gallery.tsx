import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { supabase, GalleryImage } from '../lib/supabase';

const categories = ['All', 'Wedding', 'Corporate', 'Private', 'Outdoor', 'Luxury'];

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Wedding Event',
    alt_text: 'Wedding catering setup',
    image_url: 'https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    display_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Corporate Lunch',
    alt_text: 'Corporate event catering',
    image_url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    display_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Birthday Party',
    alt_text: 'Private party catering',
    image_url: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Private',
    display_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Outdoor Event',
    alt_text: 'Outdoor catering setup',
    image_url: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Outdoor',
    display_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Luxury Dining',
    alt_text: 'Luxury event catering',
    image_url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    display_order: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Wedding Reception',
    alt_text: 'Wedding reception catering',
    image_url: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Wedding',
    display_order: 6,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Business Meeting',
    alt_text: 'Corporate meeting catering',
    image_url: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Corporate',
    display_order: 7,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Anniversary',
    alt_text: 'Anniversary celebration',
    image_url: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Private',
    display_order: 8,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Garden Party',
    alt_text: 'Outdoor garden party',
    image_url: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Outdoor',
    display_order: 9,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    title: 'Gala Dinner',
    alt_text: 'Luxury gala dinner',
    image_url: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    display_order: 10,
    created_at: new Date().toISOString()
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    // Scroll to top when Gallery component mounts
    window.scrollTo(0, 0);
    fetchGalleryImages();
  }, []);

const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setImages(data);
    } else {
      setImages(defaultImages);
    }
  };

  const filteredImages = images
    .filter(img => selectedCategory === 'All' || img.category === selectedCategory)
    .filter(img =>
      searchQuery === '' ||
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.alt_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  // Add keyboard and touch navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (currentImageIndex > 0) {
            e.preventDefault();
            showPrevImage(e as unknown as React.MouseEvent);
          }
          break;
        case 'ArrowRight':
          if (currentImageIndex < filteredImages.length - 1) {
            e.preventDefault();
            showNextImage(e as unknown as React.MouseEvent);
          }
          break;
        case 'Escape':
          setLightboxImage(null);
          break;
        default:
          break;
      }
    };
    
    // Add keyboard navigation
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage, currentImageIndex, filteredImages]);
    
  // Function to handle opening the lightbox
  const openLightbox = (image: GalleryImage) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    setLightboxImage(image);
  };
  
  // Function to navigate to the next image
  const showNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent closing the lightbox and other default behaviors
    // Check if we're not at the last image
    if (currentImageIndex < filteredImages.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setLightboxImage(filteredImages[nextIndex]);
    }
  };
  
  // Function to navigate to the previous image
  const showPrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent closing the lightbox and other default behaviors
    // Check if we're not at the first image
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setLightboxImage(filteredImages[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] text-white py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[#1e3a8a]/20"
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
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1e3a8a]" size={24} />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-[#1e3a8a] font-medium"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c9a332] text-[#1e3a8a] shadow-xl'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-[#d4af37]/20 hover:to-[#c9a332]/20 hover:text-[#1e3a8a] shadow-md'
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
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-xl cursor-pointer group border-4 border-transparent hover:border-[#d4af37]"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-2"
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/80 to-[#d4af37]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
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
          className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center p-2 sm:p-4"
        >
          <button
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-amber-400 transition-colors z-50 bg-black/40 p-2 rounded-full"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          
          {/* Previous button - only show when not at first image */}
          {currentImageIndex > 0 && (
            <button
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 bg-black/70 hover:bg-[#d4af37] hover:scale-110 cursor-pointer z-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                showPrevImage(e);
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
          
          <div className="relative max-w-full sm:max-w-5xl max-h-[85vh] overflow-hidden z-45">
            <motion.img
              key={lightboxImage.id} // Add key to ensure animation resets for each image
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={lightboxImage.image_url}
              alt={lightboxImage.alt_text}
              className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 sm:p-3 text-center">
              <h3 className="text-base sm:text-lg font-semibold">{lightboxImage.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300">{lightboxImage.category}</p>
            </div>
          </div>
          
          {/* Next button - only show when not at last image */}
          {currentImageIndex < filteredImages.length - 1 && (
            <button
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 bg-black/70 hover:bg-[#d4af37] hover:scale-110 cursor-pointer z-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                showNextImage(e);
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
