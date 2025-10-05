import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Star } from 'lucide-react';
import { supabase, Testimonial } from '../lib/supabase';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (displayTestimonials.length || 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (displayTestimonials.length || 1)) % (displayTestimonials.length || 1));
  };

  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      reviewer_name: 'Priya & Raj',
      content: 'Shanvik made our wedding day absolutely perfect! The food was exceptional and the service was impeccable. All our guests are still talking about the delicious spread.',
      rating: 5,
      photo_url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      reviewer_name: 'Anand Kumar',
      content: 'We hired Shanvik for our corporate event and they exceeded all expectations. Professional, punctual, and the food quality was outstanding. Highly recommended!',
      rating: 5,
      photo_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      reviewer_name: 'Lakshmi Reddy',
      content: 'Thank you for making my mother\'s 75th birthday so special. The traditional dishes were authentic and reminded us of home-cooked meals. Personal attention to every detail!',
      rating: 5,
      photo_url: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      created_at: new Date().toISOString()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const currentTestimonial = displayTestimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#faf8f3] to-[#f5f5f5]"></div>
      <motion.div
        className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-[#1e3a8a]/5 to-[#d4af37]/10 rounded-full blur-3xl"
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
        className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-br from-[#d4af37]/10 to-[#1e3a8a]/5 rounded-full blur-3xl"
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
              What Our Clients Say
            </span>
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-[#d4af37] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white to-[#faf8f3] rounded-3xl shadow-2xl hover:shadow-3xl p-8 md:p-12 border-2 border-[#d4af37]/20 transition-all duration-500"
            >
              <div className="flex items-start gap-6 mb-6">
                {currentTestimonial?.photo_url ? (
                  <img
                    src={currentTestimonial.photo_url}
                    alt={currentTestimonial.reviewer_name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-[#d4af37]/30"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c9a332] flex items-center justify-center text-white font-bold text-2xl ring-4 ring-[#d4af37]/30 shadow-xl">
                    {currentTestimonial?.reviewer_name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-[#1e3a8a] mb-2">
                    {currentTestimonial?.reviewer_name}
                  </h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < (currentTestimonial?.rating || 0) ? 'fill-[#d4af37] text-[#d4af37]' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-7xl text-[#d4af37] mb-4 leading-none opacity-70">"</div>
              <p className="text-xl text-[#1e3a8a]/90 mb-6 italic leading-relaxed font-medium">
                {currentTestimonial?.content}
              </p>
            </motion.div>

            {displayTestimonials.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-4 bg-gradient-to-br from-white to-[#faf8f3] rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all hidden md:block border-2 border-[#d4af37]/20 hover:border-[#d4af37]/40"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="text-[#d4af37]" size={28} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-4 bg-gradient-to-br from-white to-[#faf8f3] rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all hidden md:block border-2 border-[#d4af37]/20 hover:border-[#d4af37]/40"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="text-[#d4af37]" size={28} />
                </button>
              </>
            )}
          </div>

          {displayTestimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#d4af37] w-10' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative text-center bg-[#1e3a8a] rounded-3xl shadow-2xl p-10 overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <div className="relative z-10">
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Instagram className="text-white drop-shadow-lg" size={42} />
              <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                Follow us on Instagram
              </h3>
            </motion.div>
            <p className="text-[#d4af37] font-bold mb-8 text-2xl tracking-wide">
              @shanvikcateringevents
            </p>
            <motion.a
              href="https://instagram.com/shanvikcateringevents"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#d4af37] text-[#1e3a8a] px-10 py-4 rounded-xl hover:bg-[#c9a332] transition-all font-bold shadow-2xl text-lg"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
