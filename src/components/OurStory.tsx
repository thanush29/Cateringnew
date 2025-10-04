import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"></div>
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-3xl"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-red-600">
              A Culinary Legacy
            </span>
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full"
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
          {[
            { number: '20+', label: 'Years of Experience', gradient: 'from-emerald-500 to-teal-600', bg: 'from-emerald-50 to-teal-50' },
            { number: '1000+', label: 'Events Catered', gradient: 'from-amber-500 to-orange-600', bg: 'from-amber-50 to-orange-50' },
            { number: '100%', label: 'Client Satisfaction', gradient: 'from-rose-500 to-red-600', bg: 'from-rose-50 to-red-50' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`text-center p-8 rounded-2xl shadow-xl bg-gradient-to-br ${stat.bg} border border-white/50 backdrop-blur-sm relative overflow-hidden group`}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1, type: "spring" }}
                className={`text-4xl sm:text-5xl font-display font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-700 font-semibold text-lg">{stat.label}</div>
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
