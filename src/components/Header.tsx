import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '/Site-logo.png';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isNonHomePage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle hash navigation after route change
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      // Wait longer for all components to fully render
      setTimeout(() => {
        scrollToSection(location.hash);
      }, 500);
    }
  }, [location]);

  const leftLinks = [
    { to: '/', label: 'Home' },
    { to: '/#story', label: 'Our Story' },
    { to: '/#services', label: 'Our Services' },
  ];

  const rightLinks = [
    { to: '/gallery', label: 'Gallery' },
    { to: '/#testimonials', label: 'Testimonials' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const scrollToSection = (hash: string) => {
    if (hash.startsWith('#')) {
      const element = document.querySelector(hash);
      if (element) {
        const headerHeight = 112; // Fixed header height (h-28 = 112px)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const isActiveLink = (to: string) => {
    // Only check active state for /contact and /gallery
    if (to === '/contact' || to === '/gallery') {
      return location.pathname === to;
    }
    return false;
  };

  const handleNavClick = (to: string, e: React.MouseEvent) => {
    setIsOpen(false);
    
    // Special handling for the Home link
    if (to === '/') {
      e.preventDefault();
      
      // If already on home page, scroll to top
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home page using React Router
        navigate('/');
      }
      return;
    }
    
    // Special handling for Contact Us link
    if (to === '/contact') {
      // Let the normal navigation happen (no preventDefault)
      return;
    }
    
    if (to.includes('#')) {
      e.preventDefault();
      const pathPart = to.split('#')[0];
      const hash = to.split('#')[1];
      
      if (location.pathname !== pathPart) {
        // Navigate to the path with hash
        navigate(`${pathPart}#${hash}`);
      } else {
        // Already on the correct page, just scroll
        setTimeout(() => {
          scrollToSection(`#${hash}`);
        }, 100);
      }
    }
  };

  const textColor = isScrolled || isNonHomePage ? 'text-[#1e3a8a]' : 'text-white';
  const bgColor = isScrolled || isNonHomePage
    ? 'bg-white shadow-lg backdrop-blur-sm'
    : 'bg-gradient-to-r from-[#1e3a8a]/80 via-[#1e3a8a]/60 to-[#1e3a8a]/80 backdrop-blur-md';

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${bgColor} border-b ${isScrolled || isNonHomePage ? 'border-[#d4af37]/30' : 'border-[#d4af37]/20'}`}>
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
                  className={`text-sm font-semibold transition-all duration-300 hover:text-[#d4af37] hover:scale-110 relative group ${
                    isActiveLink(link.to) ? 'text-[#d4af37]' : textColor
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4af37] transition-all duration-300 ${
                    isActiveLink(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
            className="flex items-center gap-4 px-12 group"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#d4af37]/30 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img
                  src={logoImage}
                  alt="Shanvik Catering & Events"
                  className="h-20 w-auto relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col"
            >
              <span className={`text-xl font-display font-bold leading-tight transition-all duration-300 ${
                isScrolled || isNonHomePage
                  ? 'text-[#d4af37]'
                  : 'text-[#d4af37] drop-shadow-lg'
              }`}>
                Shanvik Catering & Events
              </span>
              <span className={`text-sm font-medium leading-tight transition-all duration-300 ${
                isScrolled || isNonHomePage
                  ? 'text-[#1e3a8a]/70'
                  : 'text-white/90 drop-shadow-md'
              }`}>
                Turning Moments into Memories
              </span>
            </motion.div>
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
                  className={`text-sm font-semibold transition-all duration-300 hover:text-[#d4af37] hover:scale-110 relative group ${
                    isActiveLink(link.to) ? 'text-[#d4af37]' : textColor
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4af37] transition-all duration-300 ${
                    isActiveLink(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="lg:hidden flex items-center justify-between py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/" 
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#d4af37]/30 blur-md opacity-40"></div>
              <img
                src={logoImage}
                alt="Shanvik Catering & Events"
                className="h-12 w-auto relative z-10 drop-shadow-lg"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col"
            >
              <span className={`text-base font-display font-bold leading-tight transition-colors duration-300 ${
                isScrolled || isNonHomePage
                  ? 'text-[#d4af37]'
                  : 'text-[#d4af37] drop-shadow-lg'
              }`}>
                Shanvik Catering & Events
              </span>
              <span className={`text-[10px] font-medium leading-tight transition-colors duration-300 ${
                isScrolled || isNonHomePage ? 'text-[#1e3a8a]/80' : 'text-[#d4af37]/90'
              }`}>
                Turning Moments into Memories
              </span>
            </motion.div>
          </Link>

          <button
            className={`p-2 transition-all duration-300 rounded-lg hover:bg-[#d4af37]/20 active:bg-[#d4af37]/30 ${textColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 border-t border-[#d4af37]/30 shadow-xl backdrop-blur-lg"
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
                    className={`block py-3.5 px-5 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border `}
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