import { motion } from 'framer-motion';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        poster="/image.jpg"
        style={{ objectPosition: 'center center' }}
      >
        <source src="/heroSection.mp4" type="video/mp4" />
      </video>

      {/* Elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Animated golden accent light */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
        animate={{
          background: [
            'radial-gradient(ellipse 800px 600px at 50% 40%, rgba(212, 175, 55, 0.15), transparent)',
            'radial-gradient(ellipse 900px 700px at 50% 40%, rgba(212, 175, 55, 0.25), transparent)',
            'radial-gradient(ellipse 800px 600px at 50% 40%, rgba(212, 175, 55, 0.15), transparent)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Elegant floating particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative h-full flex items-center justify-center z-10">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-center">
            
            {/* Top decorative line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-12 md:mb-16"
            >
              <motion.div
                animate={{ width: ['40px', '80px', '40px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-px bg-gradient-to-r from-transparent to-amber-400"
              />
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-2 h-2 bg-amber-400"
                style={{ 
                  transform: 'rotate(45deg)',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                }}
              />
              <motion.div
                animate={{ width: ['40px', '80px', '40px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="h-px bg-gradient-to-l from-transparent to-amber-400"
              />
            </motion.div>

            {/* Content wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              className="space-y-8 md:space-y-12"
            >
              
              {/* Small intro text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.p
                  className="text-sm md:text-base text-amber-300 font-light tracking-[0.3em] uppercase"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Welcome to Excellence
                </motion.p>
              </motion.div>

              {/* Main Headlines */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-4xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white/95 leading-tight"
                  style={{ 
                    fontFamily: 'Cormorant Garamond, serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        '0 0 30px rgba(255, 255, 255, 0.3)',
                        '0 0 50px rgba(255, 255, 255, 0.5)',
                        '0 0 30px rgba(255, 255, 255, 0.3)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    The Art of Creating
                  </motion.span>
                </motion.h1>

                {/* Golden Headline with refined elegance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 1.3, type: "spring", stiffness: 100 }}
                  className="relative inline-block"
                >
                  {/* Glow effect behind text */}
                  <motion.div
                    className="absolute inset-0 blur-2xl"
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.6), transparent 70%)',
                    }}
                  />

                  <motion.h2
                    className="relative text-6xl sm:text-7xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      background: 'linear-gradient(to bottom, #fbbf24 0%, #f59e0b 30%, #d97706 60%, #b45309 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.02em',
                    }}
                    animate={{
                      filter: [
                        'drop-shadow(0 0 40px rgba(251, 191, 36, 0.6))',
                        'drop-shadow(0 0 60px rgba(251, 191, 36, 0.9))',
                        'drop-shadow(0 0 40px rgba(251, 191, 36, 0.6))',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Perfect Moments
                  </motion.h2>
                </motion.div>
              </div>

              {/* Elegant subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.6 }}
                className="text-2xl sm:text-2xl md:text-xl lg:text-2xl text-amber-200/90 font-light italic"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                Tailored to Your Wishes
              </motion.p>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.9 }}
                className="max-w-2xl lg:max-w-3xl mx-auto space-y-2 md:space-y-2"
              >
                <p 
                  className="text-base sm:text-lg md:text-base lg:text-lg text-white/90 font-light leading-relaxed"
                  style={{ 
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                    fontFamily: 'Lato, sans-serif',
                  }}
                >
                  We will craft a menu that highlights the style of your event and provide flawless service for every People.
                </p>
              </motion.div>

              {/* CTA Button - Refined and Elegant */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.2 }}
                className="pt-6 md:pt-8 lg:pt-10"
              >
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className="group relative px-8 sm:px-10 md:px-12 lg:px-16 py-3 md:py-4 lg:py-5 text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-900 rounded-full overflow-hidden transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    boxShadow: '0 10px 40px rgba(251, 191, 36, 0.4), 0 0 80px rgba(251, 191, 36, 0.2)',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                  />

                  {/* Glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.3)',
                    }}
                  />

                  <span className="relative z-10 tracking-wide uppercase font-bold" style={{ letterSpacing: '0.1em' }}>
                    Plan Your Event
                  </span>
                </motion.button>
              </motion.div>

            </motion.div>

            {/* Bottom decorative line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.5 }}
              className="flex items-center justify-center gap-4 mt-12 md:mt-16"
            >
              <motion.div
                animate={{ width: ['40px', '80px', '40px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-px bg-gradient-to-r from-transparent to-amber-400/60"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-amber-400/80 rounded-full"
                style={{ boxShadow: '0 0 15px rgba(251, 191, 36, 0.6)' }}
              />
              <motion.div
                animate={{ width: ['40px', '80px', '40px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="h-px bg-gradient-to-l from-transparent to-amber-400/60"
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Refined scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1],
          y: [0, 10, 0] 
        }}
        transition={{
          opacity: { delay: 3, duration: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3 }
        }}
      >
        <div 
          className="w-8 h-12 md:w-9 md:h-14 border-2 border-amber-400/60 rounded-full flex items-start justify-center p-2 backdrop-blur-sm"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
          }}
        >
          <motion.div
            className="w-1.5 h-3 bg-amber-400 rounded-full"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)',
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}

export default Hero;