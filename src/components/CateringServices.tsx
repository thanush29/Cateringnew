import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Briefcase, Users, Sparkles } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export function CateringServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      title: 'Wedding Catering',
      description: 'Make your special day unforgettable with our bespoke wedding catering services.',
      icon: <Heart size={48} />,
      features: [
        'Customized menu planning',
        'Traditional & contemporary cuisines',
        'Elegant presentation and service',
        'Complete event coordination',
        'Special dietary accommodations'
      ]
    },
    {
      title: 'Corporate Events',
      description: 'Professional catering solutions for business gatherings and corporate functions.',
      icon: <Briefcase size={48} />,
      features: [
        'Business lunch packages',
        'Conference & seminar catering',
        'Office celebrations',
        'Networking event solutions',
        'Timely and efficient service'
      ]
    },
    {
      title: 'Private Parties',
      description: 'Celebrate life\'s moments with our personalized party catering services.',
      icon: <Users size={48} />,
      features: [
        'Birthday celebrations',
        'Anniversary parties',
        'Family reunions',
        'Intimate gatherings',
        'Themed menu options'
      ]
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5f5f5] to-[#faf8f3]"></div>
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#1e3a8a]/5 to-[#d4af37]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-br from-[#d4af37]/10 to-[#1e3a8a]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
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
              Catering Services
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
            className="text-lg sm:text-xl text-[#1e3a8a] max-w-2xl mx-auto font-medium"
          >
            From intimate gatherings to grand celebrations, we create memorable culinary experiences
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative bg-gradient-to-br from-[#faf8f3] via-white to-[#f5f5f5] rounded-3xl p-8 sm:p-10 md:p-14 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1e3a8a]/5 rounded-full blur-3xl"></div>

          <div className="relative">
            <motion.div
              className="flex items-center justify-center mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="text-[#d4af37]" size={48} />
            </motion.div>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-center text-[#1e3a8a] mb-4">
              Why Choose Us?
            </h3>
            <p className="text-center text-[#1e3a8a] mb-10 max-w-2xl mx-auto">
              Experience the perfect blend of tradition, quality, and innovation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: 'Individual & Personal Attention',
                  description: 'Every event receives our undivided attention and personalized service',
                  icon: '👥',
                  color: 'from-[#d4af37] to-[#c9a332]'
                },
                {
                  title: 'Fresh, Local Ingredients',
                  description: 'We source the finest local ingredients to ensure quality and freshness',
                  icon: '🌿',
                  color: 'from-[#1e3a8a] to-[#1d4ed8]'
                },
                {
                  title: 'Experienced Professionals',
                  description: 'Our skilled team brings decades of culinary expertise to every event',
                  icon: '⭐',
                  color: 'from-[#d4af37] to-[#c9a332]'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 text-3xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mx-auto`}>
                    {item.icon}
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#1e3a8a] mb-3 text-center group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[#1e3a8a] text-sm text-center leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
