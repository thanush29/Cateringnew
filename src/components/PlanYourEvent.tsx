import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function PlanYourEvent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    budgetRange: '',
    additionalDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const message = encodeURIComponent(
        `🎉 New Event Inquiry\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEvent Type: ${formData.eventType}\nEvent Date: ${formData.eventDate}\nBudget: ${formData.budgetRange}\n\nDetails: ${formData.additionalDetails}`
      );
      window.open(`https://wa.me/919840650939?text=${message}`, '_blank');

      const { error } = await supabase
        .from('event_inquiries')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          budget_range: formData.budgetRange,
          additional_details: formData.additionalDetails
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        budgetRange: '',
        additionalDetails: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb]"></div>
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Calendar className="text-[#d4af37]" size={56} />
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Plan Your Event
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
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-medium"
          >
            Let's make your event unforgettable. Share your details and we'll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#d4af37]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="eventType" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  required
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                >
                  <option value="">Select event type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="eventDate"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="budgetRange" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                  Budget Range *
                </label>
                <select
                  id="budgetRange"
                  required
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                >
                  <option value="">Select budget range</option>
                  <option value="Under ₹1L">Under ₹1 Lakh</option>
                  <option value="₹1L - ₹3L">₹1 - ₹3 Lakhs</option>
                  <option value="₹3L - ₹5L">₹3 - ₹5 Lakhs</option>
                  <option value="₹5L - ₹10L">₹5 - ₹10 Lakhs</option>
                  <option value="Above ₹10L">Above ₹10 Lakhs</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="additionalDetails" className="block text-sm font-semibold text-[#1e3a8a] mb-2">
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                rows={4}
                value={formData.additionalDetails}
                onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                placeholder="Tell us more about your event (guest count, special requirements, preferences, etc.)"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="mt-6 bg-green-50 text-green-700 p-4 rounded-xl border-2 border-green-200">
                🎉 Thank you! We've received your inquiry and will contact you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-xl border-2 border-red-200">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white px-8 py-4 rounded-xl font-bold hover:from-[#1d4ed8] hover:to-[#1e3a8a] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={24} />
              {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
