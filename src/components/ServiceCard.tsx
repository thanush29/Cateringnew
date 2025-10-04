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
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-blue-200"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative p-8 flex flex-col h-full">
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300"
          whileHover={{ rotate: 15, scale: 1.15 }}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(59, 130, 246, 0.3)",
              "0 10px 40px rgba(20, 184, 166, 0.4)",
              "0 10px 30px rgba(59, 130, 246, 0.3)",
            ]
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className="text-white">
            {icon}
          </div>
        </motion.div>

        <h3 className="text-2xl font-display font-bold mb-3 transition-all duration-300">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900 group-hover:from-blue-600 group-hover:via-teal-600 group-hover:to-emerald-600">
            {title}
          </span>
        </h3>
        <p className="text-gray-600 mb-6 text-base leading-relaxed group-hover:text-gray-700 transition-colors">{description}</p>

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
              <motion.div
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="text-teal-500 flex-shrink-0 mt-0.5 group-hover:text-emerald-500 transition-colors" size={18} />
              </motion.div>
              <span className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">{feature}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={handleRequestQuote}
          className="relative w-full py-4 rounded-xl font-bold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group/btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 group-hover/btn:from-blue-600 group-hover/btn:via-teal-600 group-hover/btn:to-emerald-600 transition-all duration-300"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              opacity: 0.5
            }}
          />
          <span className="relative z-10 text-white">Request Quote</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
