import { motion } from 'framer-motion';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/image.jpg"
        style={{ objectPosition: 'center center' }}
      >
        <source
          src="/heroSection.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/85 via-[#1e3a8a]/60 to-black/70" />

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

      <div className="relative h-full flex flex-col items-center justify-end pb-24 md:pb-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 md:space-y-8"
            >
              <motion.h1
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-serif leading-tight tracking-wide"
              >
                It's the art of creating
              </motion.h1>
              
              <motion.h2
                animate={{
                  textShadow: [
                    "0 0 25px rgba(212, 175, 55, 0.4)",
                    "0 0 35px rgba(212, 175, 55, 0.6)",
                    "0 0 25px rgba(212, 175, 55, 0.4)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#d4af37] font-bold tracking-wider"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Perfect Moments
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light italic tracking-wide"
                style={{ fontFamily: 'Palatino, serif' }}
              >
                tailored to your wishes
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4 md:space-y-6 px-4 md:px-8"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto font-light">
                We will craft a menu that highlights the style of your event
              </p>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto font-light">
                and provide flawless service for every People.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 md:mt-16"
        >
          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="relative px-8 sm:px-10 md:px-12 py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold text-white/90 rounded-xl overflow-hidden group shadow-2xl bg-transparent border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
            <span className="relative z-10 tracking-wide">Plan Your Event Today</span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 md:w-8 md:h-12 border-2 border-[#d4af37]/70 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 md:w-1.5 md:h-3 bg-[#d4af37] rounded-full"
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

export default Hero;