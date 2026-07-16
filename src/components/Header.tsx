import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpeg';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('bedaya_lang', nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'projects', path: '/projects' },
    { key: 'services', path: '/#services' },
    { key: 'about', path: '/#about' },
    { key: 'contact', path: '/#contact' },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-4 shadow-2xl shadow-black/40'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Bedaya Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col border-s border-luxury-light/10 ps-3">
              <span className="font-outfit text-sm md:text-base font-bold tracking-widest text-luxury-light">
                BEDAYA
              </span>
              <span className="text-[9px] text-luxury-gold tracking-widest uppercase">
                {i18n.language === 'ar' ? 'للمقاولات والتطوير' : 'Constructions'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <React.Fragment key={item.key}>
                {item.path.startsWith('/#') ? (
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className="font-sans text-xs lg:text-sm uppercase tracking-widest text-luxury-light/70 hover:text-luxury-gold cursor-pointer transition-colors duration-300 font-medium"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-sans text-xs lg:text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${
                      location.pathname === item.path
                        ? 'text-luxury-gold'
                        : 'text-luxury-light/70 hover:text-luxury-gold'
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                )}
              </React.Fragment>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 border border-luxury-light/15 hover:border-luxury-gold/40 rounded-none bg-transparent text-luxury-light text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-300"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{i18n.language === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 p-1.5 border border-luxury-light/15 rounded-none text-luxury-light text-[10px] uppercase font-bold tracking-wider cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-light hover:text-luxury-gold cursor-pointer p-1.5"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-luxury-black flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6 text-center">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {item.path.startsWith('/#') ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        // Delay scroll to allow transition to close
                        setTimeout(() => handleNavClick(item.path), 350);
                      }}
                      className="text-2xl font-bold tracking-widest text-luxury-light hover:text-luxury-gold uppercase cursor-pointer"
                    >
                      {t(`nav.${item.key}`)}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-bold tracking-widest uppercase ${
                        location.pathname === item.path
                          ? 'text-luxury-gold'
                          : 'text-luxury-light hover:text-luxury-gold'
                      }`}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
