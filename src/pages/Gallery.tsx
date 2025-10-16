import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
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
    
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (currentImageIndex > 0) {
            e.preventDefault();
            showPrevImage();
          }
          break;
        case 'ArrowRight':
          if (currentImageIndex < filteredImages.length - 1) {
            e.preventDefault();
            showNextImage();
          }
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, currentImageIndex, filteredImages]);
    
  const openLightbox = (image: GalleryImage) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    setLightboxImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };
  
  const showNextImage = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setLightboxImage(filteredImages[nextIndex]);
    }
  };
  
  const showPrevImage = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setLightboxImage(filteredImages[prevIndex]);
    }
  };

  const getCategoryCount = (category: string) => {
    if (category === 'All') return images.length;
    return images.filter(img => img.category === category).length;
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto"
          >
            Explore memorable moments from our exceptional events
          </motion.p>

        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" size={22} />
            <input
              type="text"
              placeholder="Search by title, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 transition-all text-gray-800 text-lg shadow-sm hover:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              return (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#c9a332] text-white shadow-lg shadow-[#d4af37]/30'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#d4af37]/30 shadow-sm'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <AnimatePresence mode="wait">
          {(searchQuery || selectedCategory !== 'All') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center mb-8"
            >
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-[#1e3a8a]">{filteredImages.length}</span> {filteredImages.length === 1 ? 'result' : 'results'}
                {searchQuery && <span> for "{searchQuery}"</span>}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          {filteredImages.length > 0 ? (
            <motion.div
              key="gallery-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  whileHover={{ y: -8 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer bg-gray-100 transition-all duration-300"
                  onClick={() => openLightbox(image)}
                >
                  {/* Image */}
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onLoad={() => setImageLoading(prev => ({ ...prev, [image.id]: false }))}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                            {image.title}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-[#d4af37] text-white text-xs font-semibold rounded-full">
                            {image.category}
                          </span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                          <ZoomIn size={18} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge (visible on mobile) */}
                  <div className="absolute top-3 right-3 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#1e3a8a] text-xs font-bold rounded-full shadow-lg">
                      {image.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="inline-block p-8 bg-gray-100 rounded-3xl mb-6">
                <Search size={64} className="text-gray-400 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No images found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-3 bg-[#d4af37] text-white rounded-full font-semibold hover:bg-[#c9a332] transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 text-white hover:text-[#d4af37] transition-colors z-50 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </motion.button>
            
            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-white font-semibold z-50"
            >
              {currentImageIndex + 1} / {filteredImages.length}
            </motion.div>
            
            {/* Previous Button */}
            {currentImageIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-[#d4af37] hover:scale-110 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevImage();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} strokeWidth={3} />
              </motion.button>
            )}
            
            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={lightboxImage.id}
                src={lightboxImage.image_url}
                alt={lightboxImage.alt_text}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-20 left-0 right-0 bg-white/10 backdrop-blur-md text-white p-4 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-1">{lightboxImage.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#d4af37] rounded-full text-sm font-semibold">
                    {lightboxImage.category}
                  </span>
                  <span className="text-sm text-gray-300">{lightboxImage.alt_text}</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Next Button */}
            {currentImageIndex < filteredImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-[#d4af37] hover:scale-110 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                aria-label="Next image"
              >
                <ChevronRight size={28} strokeWidth={3} />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}