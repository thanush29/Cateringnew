import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'logo_url')
      .maybeSingle();

    if (!error && data && data.value) {
      setLogoUrl(data.value);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-burgundy-900 via-gray-900 to-burgundy-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="shanvikcateringevents"
                  className="h-12 w-auto"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-display font-bold text-white">shanvikcateringevents</h3>
                <p className="text-amber-300 text-xs">Turning Moments into Memories</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Creating unforgettable culinary experiences with passion, tradition, and excellence for over two decades.
            </p>
            <div className="flex items-center gap-2 text-emerald-400">
              <Heart size={16} className="fill-current" />
              <span className="text-sm font-medium">Made with love since 2000</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-amber-400 mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/#story', label: 'Our Story' },
                { href: '/#services', label: 'Services' },
                { href: '/#menu', label: 'Our Menu' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/blog', label: 'Blog' },
                { href: '/#contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-emerald-400 mb-6 text-lg">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300 hover:text-amber-400 transition-colors group">
                <MapPin size={20} className="text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">123 Culinary Street, Food District, City 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors group">
                <Phone size={20} className="text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+1234567890" className="text-sm">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors group">
                <Mail size={20} className="text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@shanvikcatering.com" className="text-sm">info@shanvikcatering.com</a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display font-semibold text-amber-400 mb-6 text-lg">Follow Us</h4>
            <p className="text-gray-300 text-sm mb-6">Stay connected for latest updates and culinary inspirations</p>
            <div className="flex gap-4">
              {[
                { href: 'https://instagram.com/shanvikcateringevents', icon: Instagram, color: 'hover:bg-pink-600' },
                { href: 'https://facebook.com', icon: Facebook, color: 'hover:bg-blue-600' },
                { href: 'https://linkedin.com', icon: Linkedin, color: 'hover:bg-blue-700' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    whileHover={{ y: -5 }}
                    aria-label={social.icon.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © {currentYear} <span className="text-amber-400 font-semibold">shanvikcateringevents</span>. All Rights Reserved
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Crafted with</span>
              <Heart size={14} className="text-red-500 fill-current animate-pulse" />
              <span>by Thanush, Santhosh, Kathick</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <a href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/cookies" className="hover:text-amber-400 transition-colors">Cookie Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}