import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function ContactPage() {
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
      window.open(`https://wa.me/919840650939?text=${message}`, '_blank');

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
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6 drop-shadow-2xl"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-white/90 font-medium"
          >
            Let's plan your perfect event together
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-display font-bold text-[#1e3a8a] mb-8">
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Phone className="text-[#d4af37]" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a8a] mb-2 text-xl">Phone</h3>
                  <a href="tel:+919840650939" className="text-[#1e3a8a] hover:text-[#d4af37] transition-colors text-lg">
                    +91 98406 50939
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-[#1e3a8a]/20 to-[#1e3a8a]/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Mail className="text-[#1e3a8a]" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a8a] mb-2 text-xl">Email</h3>
                  <a href="mailto:info@shanvikcateringevents.com" className="text-[#1e3a8a] hover:text-[#d4af37] transition-colors text-lg">
                    info@shanvikcateringevents.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-[#d4af37]/20 to-[#1e3a8a]/10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <MapPin className="text-[#1e3a8a]" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a8a] mb-2 text-xl">Location</h3>
                  <p className="text-[#1e3a8a] text-lg">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.06892545!3d13.047982699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123"
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-[#d4af37]/30 hover:border-[#d4af37]/50 transition-all duration-300">
              <h2 className="text-3xl font-display font-bold text-[#1e3a8a] mb-6">
                Send Us A Message
              </h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1e3a8a] mb-2">
                    Full Name *
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
                    Email Address *
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
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
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
    </div>
  );
}
