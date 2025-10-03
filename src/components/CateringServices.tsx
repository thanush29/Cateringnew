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
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-burgundy-900 mb-4">
            Catering Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we create memorable culinary experiences
          </p>
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
          className="relative bg-gradient-to-br from-burgundy-50 via-amber-50 to-emerald-50 rounded-3xl p-8 sm:p-10 md:p-14 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl"></div>

          <div className="relative">
            <motion.div
              className="flex items-center justify-center mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="text-amber-500" size={48} />
            </motion.div>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-center text-burgundy-900 mb-4">
              Why Choose Us?
            </h3>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Experience the perfect blend of tradition, quality, and innovation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: 'Individual & Personal Attention',
                  description: 'Every event receives our undivided attention and personalized service',
                  icon: '👥',
                  color: 'from-amber-400 to-amber-600'
                },
                {
                  title: 'Fresh, Local Ingredients',
                  description: 'We source the finest local ingredients to ensure quality and freshness',
                  icon: '🌿',
                  color: 'from-emerald-400 to-emerald-600'
                },
                {
                  title: 'Experienced Professionals',
                  description: 'Our skilled team brings decades of culinary expertise to every event',
                  icon: '⭐',
                  color: 'from-burgundy-400 to-burgundy-600'
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
                  <h4 className="font-display font-bold text-lg text-burgundy-900 mb-3 text-center group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">
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
