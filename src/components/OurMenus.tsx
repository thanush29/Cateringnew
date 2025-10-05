import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuCard } from './MenuCard';
import { supabase } from '../lib/supabase';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
}

export function OurMenus() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setMenuItems(data);
    } else {
      setMenuItems([
        {
          id: '1',
          category: 'Vegetarian Delights',
          name: 'Vegetarian Delights',
          description: 'Fresh seasonal vegetables prepared with aromatic spices and traditional techniques',
          image_url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: '2',
          category: 'Non-Vegetarian Specialties',
          name: 'Non-Vegetarian Specialties',
          description: 'Tender meats and seafood, expertly grilled and marinated with signature spices',
          image_url: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: '3',
          category: 'Exquisite Desserts',
          name: 'Exquisite Desserts',
          description: 'Traditional sweets and contemporary desserts to end your meal on a sweet note',
          image_url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: '4',
          category: 'Appetizers & Starters',
          name: 'Appetizers & Starters',
          description: 'An array of savory bites to begin your culinary journey',
          image_url: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: '5',
          category: 'Beverages',
          name: 'Beverages',
          description: 'Refreshing drinks and traditional beverages to complement your meal',
          image_url: 'https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]);
    }
    setLoading(false);
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {
        category: item.category,
        description: item.description,
        imageUrl: item.image_url
      };
    }
    return acc;
  }, {} as Record<string, { category: string; description: string; imageUrl: string }>);

  const menuCategories = Object.values(groupedItems);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % menuCategories.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + menuCategories.length) % menuCategories.length);
  };

  return (
    <section id="menu" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f3] via-white to-[#f5f5f5]"></div>
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#d4af37]/5 to-[#1e3a8a]/5 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#1e3a8a]">
              Our Menus
            </span>
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-[#d4af37] mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-[#1e3a8a] max-w-2xl mx-auto font-medium"
          >
            Explore our diverse menu offerings crafted to delight every palate
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {menuCategories.slice(currentIndex, currentIndex + 3).map((menu, index) => (
              <div key={index}>
                <MenuCard {...menu} />
              </div>
            ))}
            {currentIndex + 3 > menuCategories.length &&
              menuCategories.slice(0, (currentIndex + 3) % menuCategories.length).map((menu, index) => (
                <div key={`wrap-${index}`}>
                  <MenuCard {...menu} />
                </div>
              ))}
          </motion.div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={prev}
              className="p-3 bg-gradient-to-br from-white to-[#faf8f3] rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/40"
              aria-label="Previous menu"
            >
              <ChevronLeft className="text-[#d4af37]" size={24} />
            </button>
            <div className="flex gap-2">
              {menuCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#d4af37] w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 bg-gradient-to-br from-white to-[#faf8f3] rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/40"
              aria-label="Next menu"
            >
              <ChevronRight className="text-[#d4af37]" size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
