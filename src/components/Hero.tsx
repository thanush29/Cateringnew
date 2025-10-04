import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920"
      >
        <source
          src="https://cdn.pixabay.com/video/2024/02/11/200139-912119482_large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a45]/85 via-[#0b1a45]/60 to-black/70" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 via-transparent to-transparent"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              Turning Moments into Memories
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#d4af37] mb-4 drop-shadow-lg"
            >
              Made For You With Love
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="inline-block"
            >
              <motion.p
                animate={{
                  textShadow: [
                    "0 0 20px rgba(212, 175, 55, 0.3)",
                    "0 0 30px rgba(212, 175, 55, 0.5)",
                    "0 0 20px rgba(212, 175, 55, 0.3)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-lg sm:text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto italic leading-relaxed font-medium"
              >
                BIRTHDAY - SOCIAL EVENTS - MEETINGS-WEDDINGS ANNIVERSARIES ALL TYPE OF MAKEUP AND CANDID CAMERAZ AND STAGE DECORATION
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#contact"
                className="relative px-8 py-4 text-base sm:text-lg font-bold text-white rounded-xl overflow-hidden w-full sm:w-auto group shadow-2xl"
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-[#d4af37] group-hover:bg-[#c9a332] transition-all duration-300"></div>
                <motion.div
                  className="absolute inset-0 bg-[#d4af37]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                ></motion.div>
                <span className="relative z-10">Book a Tasting</span>
              </motion.a>
              <motion.a
                href="#menu"
                className="relative px-8 py-4 text-base sm:text-lg font-bold rounded-xl overflow-hidden w-full sm:w-auto group shadow-2xl"
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-white group-hover:bg-[#f5f5f5] transition-all duration-300"></div>
                <span className="relative z-10 text-[#0b1a45] font-bold">See Menu</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-8 h-12 border-2 border-[#d4af37]/70 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-[#d4af37] rounded-full"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
