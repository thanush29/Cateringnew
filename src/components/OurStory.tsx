import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="py-16 sm:py-20 lg:py-24 section-gradient" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-burgundy-900 mb-4">
            A Culinary Legacy
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Inspired by the culinary excellence of <strong className="text-amber-700">SMT. Chirla Pushpaveni Reddy</strong>,
                our journey began with a simple vision: transforming every celebration into an unforgettable experience
                through the art of exceptional catering.
              </p>
              <p>
                For over two decades, we've mastered the perfect blend of traditional flavors and contemporary presentation.
                Each event we cater reflects our dedication to quality, creativity, and personalized service that exceeds expectations.
              </p>
              <p className="text-emerald-700 font-medium">
                From intimate gatherings to grand celebrations, we bring passion, precision, and perfection to your special moments.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Traditional cooking"
                  className="w-full h-40 object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden shadow-xl mt-6"
              >
                <img
                  src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Catering event"
                  className="w-full h-40 object-cover"
                />
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-xl overflow-hidden shadow-2xl mt-3"
            >
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Food preparation"
                className="w-full h-48 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center p-6 card">
            <div className="text-3xl sm:text-4xl font-display font-bold text-emerald-600 mb-2">20+</div>
            <div className="text-gray-700">Years of Experience</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl sm:text-4xl font-display font-bold text-amber-600 mb-2">1000+</div>
            <div className="text-gray-700">Events Catered</div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl sm:text-4xl font-display font-bold text-burgundy-600 mb-2">100%</div>
            <div className="text-gray-700">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
