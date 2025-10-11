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

      <div className="relative h-full flex flex-col items-center justify-end pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block mb-12 max-w-6xl mx-auto"
            >
              <motion.div
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
                className="space-y-6"
              >
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 font-serif leading-relaxed tracking-wide">
                  It's the art of creating{' '}
                  <span className="text-[#d4af37] font-bold italic">perfect moments</span>{' '}
                  tailored to your wishes.
                </p>
                
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/85 font-sans leading-relaxed tracking-normal">
                  We will craft a menu that highlights the{' '}
                  <span className="text-white font-semibold">style of your event</span>
                </p>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed tracking-wider">
                  and provide{' '}
                  <span className="text-[#d4af37] font-medium">flawless service</span>{' '}
                  for every People.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="relative px-10 py-5 text-lg sm:text-xl font-bold text-white/90 rounded-xl overflow-hidden group shadow-2xl bg-transparent border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all duration-300"
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
            <span className="relative z-10">Plan Your Event Today</span>
          </motion.button>
        </motion.div>
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

export default Hero;