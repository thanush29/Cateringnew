import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const location = useLocation();

  const isNonHomePage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const leftLinks = [
    { to: '/#story', label: 'Our Story' },
    { to: '/#services', label: 'Catering Services' },
    { to: '/#menu', label: 'Our Menu' },
  ];

  const rightLinks = [
    { to: '/gallery', label: 'Gallery' },
    { to: '/#testimonials', label: 'Testimonials' },
    { to: '/blog', label: 'Blog' },
    { to: '/#contact', label: 'Contact Us' },
  ];

  const scrollToSection = (hash: string) => {
    if (hash.startsWith('#')) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (to: string, e: React.MouseEvent) => {
    if (to.includes('#')) {
      e.preventDefault();
      const hash = to.split('#')[1];
      if (location.pathname !== '/') {
        window.location.href = `/#${hash}`;
      } else {
        scrollToSection(`#${hash}`);
      }
    }
  };

  const textColor = isScrolled || isNonHomePage ? 'text-gray-800' : 'text-white';
  const bgColor = isScrolled || isNonHomePage
    ? 'bg-gradient-to-r from-white via-amber-50 to-white shadow-lg backdrop-blur-sm'
    : 'bg-gradient-to-r from-transparent via-black/10 to-transparent backdrop-blur-md';

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${bgColor} border-b ${isScrolled || isNonHomePage ? 'border-amber-200/50' : 'border-white/10'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-center h-28 gap-12">
          <div className="flex items-center gap-8 flex-1 justify-end">
            {leftLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={link.to}
                  onClick={(e) => handleNavClick(link.to, e)}
                  className={`text-sm font-semibold transition-all duration-300 hover:text-amber-600 hover:scale-110 relative group ${textColor}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center justify-center px-12 group"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="relative"
            >
              {logoUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img
                    src={logoUrl}
                    alt="shanvikcateringevents"
                    className="h-20 w-auto relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 blur-md opacity-50"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl relative z-10">
                    <span className="text-white font-bold text-2xl">S</span>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`mt-2 text-xl font-display font-bold transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 ${
                isScrolled || isNonHomePage
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-red-600'
                  : 'text-white drop-shadow-lg'
              }`}
            >
              shanvikcateringevents
            </motion.span>
          </Link>

          <div className="flex items-center gap-8 flex-1">
            {rightLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + leftLinks.length) * 0.1, duration: 0.5 }}
              >
                <Link
                  to={link.to}
                  onClick={(e) => handleNavClick(link.to, e)}
                  className={`text-sm font-semibold transition-all duration-300 hover:text-amber-600 hover:scale-110 relative group ${textColor}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="lg:hidden flex flex-col items-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between w-full mb-3">
            <Link to="/" className="flex items-center gap-3">
              {logoUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 blur-md opacity-40"></div>
                  <img
                    src={logoUrl}
                    alt="shanvikcateringevents"
                    className="h-14 w-auto relative z-10 drop-shadow-lg"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 blur-md opacity-50"></div>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl relative z-10">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                </div>
              )}
            </Link>

            <button
              className={`p-2 transition-all duration-300 rounded-lg hover:bg-amber-100 ${textColor}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <span className={`text-lg font-display font-bold block transition-colors duration-300 ${
              isScrolled || isNonHomePage
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-red-600'
                : 'text-white drop-shadow-lg'
            }`}>
              shanvikcateringevents
            </span>
            <span className={`text-xs font-medium transition-colors duration-300 ${
              isScrolled || isNonHomePage ? 'text-amber-700' : 'text-white/90'
            }`}>
              Turning Moments into Memories
            </span>
          </motion.div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 border-t border-amber-200/50 shadow-xl backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {[...leftLinks, ...rightLinks].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={(e) => handleNavClick(link.to, e)}
                    className="block py-4 px-5 text-gray-800 font-semibold hover:text-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-amber-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
