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
      
      <div className="absolute right-[-75px] bottom-[250px] w-[350px] h-[350px] opacity-10 z-[3] bg-[url('/chef-logo.png')] bg-no-repeat bg-bottom bg-contain"></div>
      
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

        <div className="max-w-6xl mx-auto px-5 relative z-[2]">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* Visual Section (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex-[0_0_42%] min-h-[500px] w-full lg:w-auto"
            >
              {/* Rotating network sphere */}
              <motion.div
                className="absolute w-[120%] h-[120%] left-[-10%] top-[-10%] z-[1] pointer-events-none opacity-70"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              >
                <img 
                  src="/network-sphere.png" 
                  alt="Network" 
                  className="w-full h-full object-contain opacity-50" 
                />
              </motion.div>

              {/* Profile container */}
              <div className="relative w-full h-[500px] z-[2]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute w-[330px] h-[330px] rounded-full border-[14px] border-[#27ae60] top-[calc(20%-20px)] left-[18%] transform -translate-x-1/2 -translate-y-1/2 z-[5] bg-white shadow-[0_10px_30px_rgba(39,174,96,0.3)] overflow-hidden group"
                >
                  <motion.img 
                    src="/owner logo.jpg" 
                    alt="Chef Profile" 
                    className="w-full h-full object-cover transition-transform duration-500 z-[2] relative group-hover:scale-105"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-[0_0_58%] pr-0 lg:pr-5 relative z-[3] w-full"
            >
              <div className="mb-5">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-[#0d2454] text-2xl lg:text-3xl font-bold tracking-wide mb-2.5 text-left"
                >
                  About Shanvik Caterers & Events
                </motion.h3>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "auto" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="flex gap-1.5 mb-7 items-center justify-start"
                >
                  <span className="h-1 w-20 bg-[#D4AF37] inline-block"></span>
                  <span className="h-1 w-7 bg-[#0d2454] inline-block"></span>
                  <span className="h-1 w-5 bg-[#27ae60] inline-block"></span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="space-y-5"
              >
                <p className="leading-7 text-[#555] text-base text-justify">
                  For over <strong className="text-[#0d2454]">12 years</strong>, <strong className="text-[#0d2454]">Shanvik</strong> has been a trusted name behind <strong className="text-[#0d2454]">Chennai's</strong> most memorable celebrations. 
                  We began with a simple passion: to serve incredible food that brought people together. 
                  This dedication to culinary excellence quickly established us as one of the region's finest caterers.
                </p>
                
                <p className="leading-7 text-[#555] text-base text-justify">
                  However, we saw that a truly perfect event was about more than just the food. It was about the seamless flow, 
                  the stunning ambiance, and the flawless execution of a grand vision. That's why we evolved, blending our 
                  culinary artistry with comprehensive event management to offer a complete, stress-free experience. Today, 
                  we are proud to be a full-service team that designs, manages, and caters events from concept to completion.
                </p>

                <p className="text-[#333] text-lg text-center font-medium">
                  <strong>Shanvik Caterers & Events – Turning Your Celebrations into Cherished Memories 
                  with Incredible Experiences!</strong>
                </p>
                
                <motion.a
                  href="#about"
                  whileHover={{ 
                    y: -2,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block py-3 px-7 bg-[#0d2454] text-white no-underline rounded font-semibold mt-5 transition-all duration-300 text-center uppercase tracking-wide hover:bg-[#071840]"
                >
                  Read More
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {[
              { number: '12+', label: 'Years of Experience', gradient: 'from-[#d4af37] to-[#c9a332]', bg: 'from-[#faf8f3] to-[#f5f5f5]' },
              { number: '1000+', label: 'Events Catered', gradient: 'from-[#0d2454] to-[#071840]', bg: 'from-[#f5f5f5] to-white' },
              { number: '100%', label: 'Client Satisfaction', gradient: 'from-[#27ae60] to-[#229954]', bg: 'from-white to-[#faf8f3]' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className={`text-center p-8 rounded-2xl shadow-xl bg-gradient-to-br ${stat.bg} border border-white/50 backdrop-blur-sm relative overflow-hidden group`}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1, type: "spring" }}
                  className={`text-4xl sm:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                >
                  {stat.number}
                </motion.div>
                <div className="text-[#0d2454] font-semibold text-lg">{stat.label}</div>
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