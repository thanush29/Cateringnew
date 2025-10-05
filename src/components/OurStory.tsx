import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] via-white to-[#faf8f3]"></div>
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
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#1e3a8a]">
              A Culinary Legacy
            </span>
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-[#d4af37] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl overflow-hidden shadow-2xl mb-4"
            >
              <img
                src="https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Portrait"
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6 text-[#1e3a8a] text-base sm:text-lg leading-relaxed">
              <p>
                Inspired by the culinary excellence of <strong className="text-[#d4af37]">SMT. Chirla Pushpaveni Reddy</strong>,
                our journey began with a simple vision: transforming every celebration into an unforgettable experience
                through the art of exceptional catering.
              </p>
              <p>
                For over two decades, we've mastered the perfect blend of traditional flavors and contemporary presentation.
                Each event we cater reflects our dedication to quality, creativity, and personalized service that exceeds expectations.
              </p>
              <p className="text-[#1e3a8a] font-medium">
                From intimate gatherings to grand celebrations, we bring passion, precision, and perfection to your special moments.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6 text-[#1e3a8a] text-base sm:text-lg leading-relaxed">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1e3a8a] mb-4">
                Our Journey
              </h3>
              <p>
                What started as a passion project has grown into one of the most trusted catering services in the region.
                Our commitment to excellence and attention to detail has made us the preferred choice for countless memorable events.
              </p>
              <p>
                Every dish we serve tells a story of tradition, innovation, and the love we pour into our craft.
                We don't just cater events; we create experiences that linger in memories long after the last bite.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Journey moment 1"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Journey moment 2"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-16"
        >
          {[
            { title: 'Premium Quality', icon: '⭐', description: 'Only the finest ingredients' },
            { title: 'Expert Team', icon: '👨‍🍳', description: 'Skilled culinary professionals' },
            { title: 'Personal Touch', icon: '❤️', description: 'Customized to your vision' },
            { title: 'Memorable Moments', icon: '✨', description: 'Creating lasting impressions' },
            { title: '500+ Successful Events', icon: '🎉', description: 'Proven track record' }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="text-center p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-[#faf8f3] border border-[#d4af37]/20 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="font-display font-bold text-lg text-[#1e3a8a] mb-2">{feature.title}</h4>
              <p className="text-sm text-[#1e3a8a]/80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
