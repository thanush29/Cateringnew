import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { CheckCircle } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
}

export function ServiceCard({ title, description, icon, features }: ServiceCardProps) {
  const handleRequestQuote = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const whatsappCheckbox = document.querySelector('#whatsapp') as HTMLInputElement;
        if (whatsappCheckbox) {
          whatsappCheckbox.checked = true;
        }
        const messageTextarea = document.querySelector('#message') as HTMLTextAreaElement;
        if (messageTextarea) {
          messageTextarea.value = `Hi, I'm interested in ${title} services. Please send me a quote.`;
          messageTextarea.focus();
        }
      }, 800);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-8 flex flex-col h-full">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
          whileHover={{ rotate: 12 }}
        >
          <div className="text-white">
            {icon}
          </div>
        </motion.div>

        <h3 className="text-2xl font-display font-bold text-burgundy-900 mb-3 group-hover:text-amber-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 text-base leading-relaxed">{description}</p>

        <div className="space-y-3 flex-grow mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 group/item"
            >
              <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" size={18} />
              <span className="text-sm text-gray-700 group-hover/item:text-gray-900">{feature}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={handleRequestQuote}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Request Quote</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
