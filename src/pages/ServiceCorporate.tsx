import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export function ServiceCorporate() {
  const services = [
    'Event planning & logistics management',
    'Professional buffet & plated service',
    'Business meeting refreshments',
    'Conference & seminar catering',
    'Corporate décor & branding setup',
    'Professional photography services',
    'AV equipment & presentation support',
    'Guest registration & management',
    'Coffee breaks & networking stations',
    'Team building event coordination'
  ];

  const packages = [
    {
      name: 'Basic',
      price: '₹1,00,000',
      features: [
        'Up to 50 attendees',
        'Standard menu (3 courses)',
        'Basic event setup',
        'Service staff included',
        '3-hour event coverage'
      ]
    },
    {
      name: 'Standard',
      price: '₹2,50,000',
      popular: true,
      features: [
        'Up to 150 attendees',
        'Premium menu (5 courses)',
        'Enhanced décor & setup',
        'Photography included',
        'Full-day event coverage',
        'Coffee & tea stations'
      ]
    },
    {
      name: 'Premium',
      price: '₹5,00,000',
      features: [
        'Up to 300 attendees',
        'Executive menu (7+ courses)',
        'Complete venue transformation',
        'Full photo & video package',
        'AV support included',
        'Dedicated event manager',
        'Unlimited event duration'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] text-white py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=1200')",
            backgroundSize: "cover"
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6 drop-shadow-2xl"
          >
            Corporate Event Catering
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-[#d4af37] font-semibold italic mb-8"
          >
            "Professional excellence for business success"
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/#contact"
              className="inline-block bg-[#d4af37] text-[#1e3a8a] px-10 py-4 rounded-xl hover:bg-[#c9a332] transition-all font-bold shadow-2xl text-lg hover:scale-105"
            >
              Plan Your Corporate Event
            </a>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-[#1e3a8a] mb-6 text-center">
            Complete Corporate Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Check className="text-[#d4af37] flex-shrink-0" size={24} />
                <span className="text-[#1e3a8a] font-medium">{service}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold text-[#1e3a8a] mb-12 text-center">
            Corporate Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`bg-gradient-to-br from-white to-[#faf8f3] rounded-2xl shadow-xl p-8 border-2 ${
                  pkg.popular ? 'border-[#d4af37] ring-4 ring-[#d4af37]/20' : 'border-gray-200'
                } relative`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#1e3a8a] px-6 py-1 rounded-full font-bold text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-display font-bold text-[#1e3a8a] mb-4 text-center">
                  {pkg.name}
                </h3>
                <div className="text-4xl font-bold text-[#d4af37] mb-6 text-center">
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-[#d4af37] flex-shrink-0 mt-1" size={20} />
                      <span className="text-[#1e3a8a]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/#contact"
                  className={`block text-center px-6 py-3 rounded-xl font-bold transition-all ${
                    pkg.popular
                      ? 'bg-[#d4af37] text-[#1e3a8a] hover:bg-[#c9a332]'
                      : 'bg-[#1e3a8a] text-white hover:bg-[#1d4ed8]'
                  }`}
                >
                  Select Package
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
