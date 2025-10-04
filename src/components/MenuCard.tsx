import { motion } from 'framer-motion';

interface MenuCardProps {
  category: string;
  description: string;
  imageUrl: string;
}

export function MenuCard({ category, description, imageUrl }: MenuCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl group cursor-pointer border-2 border-transparent hover:border-[#d4af37]/40"
    >
      <div className="aspect-square">
        <img
          src={imageUrl}
          alt={category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a45]/95 via-[#0b1a45]/60 to-transparent group-hover:from-[#0b1a45] group-hover:via-[#0b1a45]/70 transition-all duration-500 flex flex-col justify-end p-6">
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 bg-[#d4af37]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors duration-300">{category}</h3>
        <p className="text-gray-200 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
