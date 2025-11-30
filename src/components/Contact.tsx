import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact({ isStandalone = false }: { isStandalone?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    viaWhatsApp: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const message = encodeURIComponent(
        `Hello! I'm ${formData.name}.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`
      );
      window.open(`https://wa.me/7200219061?text=${message}`, '_blank');

      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          via_whatsapp: true
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', viaWhatsApp: true });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`${isStandalone ? 'pt-28 sm:pt-32 lg:pt-36' : 'py-16 sm:py-20 lg:py-24'} relative overflow-hidden`} ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] via-white to-[#faf8f3]"></div>
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1e3a8a]/5 to-[#d4af37]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
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
              Let's Plan Your Perfect Event
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
            Get in touch with us to discuss your catering needs
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Phone className="text-[#d4af37]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a8a] mb-1">Phone</h3>
                  <a href="tel:+919840650939" className="text-[#1e3a8a] hover:text-[#d4af37] transition-colors">
                    +91 98406 50939
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-[#1e3a8a]/20 to-[#1e3a8a]/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Mail className="text-[#1e3a8a]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a8a] mb-1">Email</h3>
                  <a href="mailto:info@shanvikcateringevents.com" className="text-[#1e3a8a] hover:text-[#d4af37] transition-colors">
                    info@shanvikcateringevents.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-[#d4af37]/20 to-[#1e3a8a]/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <MapPin className="text-[#1e3a8a]" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a8a] mb-1">Location</h3>
                  <p className="text-[#1e3a8a]">
                    L2 block, 12207, KKR Town 5th St, KKR Town 1st St, near Anthony hospital, Kodungaiyur, Chennai, Tamil Nadu 600060
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-lg overflow-hidden shadow-lg h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.349020559653!2d80.2396278!3d13.140370899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265006da2e08f%3A0x77303eb3f2f12ad9!2sShanvik%20Catering%20%26%20Events!5e0!3m2!1sen!2sin!4v1761982204805!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location map"
                  />
                </div>


            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#d4af37]/30 hover:border-[#d4af37]/50 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1e3a8a] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300 bg-white/50 hover:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1e3a8a] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300 bg-white/50 hover:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#1e3a8a] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300 bg-white/50 hover:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1e3a8a] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300 bg-white/50 hover:bg-white"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    checked={formData.viaWhatsApp}
                    onChange={(e) => setFormData({ ...formData, viaWhatsApp: e.target.checked })}
                    className="w-4 h-4 text-[#d4af37] border-gray-300 rounded focus:ring-[#d4af37]"
                  />
                  <label htmlFor="whatsapp" className="ml-2 text-sm text-[#1e3a8a]">
                    Connect via WhatsApp
                  </label>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                    Thank you! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white px-8 py-4 rounded-xl font-bold hover:from-[#1d4ed8] hover:to-[#1e3a8a] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
