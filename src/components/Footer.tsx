import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/brand/logo.png';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxury-black border-t border-luxury-light/5 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="Bedaya Logo" 
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(254, 127, 45, 0.35))'
                }}
                className="h-10 w-auto object-contain" 
              />
            </div>
            <p className="text-sm text-luxury-light/50 max-w-sm font-sans leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-luxury-gold">
              {i18n.language === 'ar' ? 'روابط سريعة' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-luxury-light/60">
              <li>
                <Link to="/" className="hover:text-luxury-gold transition-colors duration-300">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-luxury-gold transition-colors duration-300">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <a href="#services" className="hover:text-luxury-gold transition-colors duration-300">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-luxury-gold transition-colors duration-300">
                  {t('nav.about')}
                </a>
              </li>
            </ul>
          </div>

          {/* Website Credits Link */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-luxury-gold">
              {i18n.language === 'ar' ? 'تصميم الموقع' : 'Credits'}
            </h4>
            <div className="text-sm text-luxury-light/60">
              <button
                onClick={() => setIsCreditsOpen(true)}
                className="hover:text-luxury-gold transition-colors duration-300 font-sans cursor-pointer text-start block py-1 font-light"
              >
                Website designed by Eslam Metawie
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-luxury-gold">
              {t('contact.info')}
            </h4>
            <ul className="space-y-3 text-sm text-luxury-light/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>{t('contact.address.val')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <a href="tel:+201015833927" dir="ltr" className="hover:text-luxury-gold transition-colors">+20 101 583 3927</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <a href="mailto:yomnamotawe@gmail.com" className="hover:text-luxury-gold transition-colors">yomnamotawe@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-luxury-light/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-luxury-light/45 text-center md:text-start font-sans">
            &copy; {new Date().getFullYear()} BEDAYA. {t('footer.rights')}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 border border-luxury-light/10 hover:border-luxury-gold/50 rounded-full bg-transparent cursor-pointer transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-luxury-light group-hover:text-luxury-gold transition-colors duration-300" />
          </button>
        </div>
      </div>

      {/* Developer Credits Modal */}
      <AnimatePresence>
        {isCreditsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsCreditsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-md w-full p-8 md:p-10 space-y-6 relative border border-white/10 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCreditsOpen(false)}
                className="absolute top-4 right-4 text-luxury-light/45 hover:text-luxury-gold cursor-pointer transition-colors duration-300"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold font-outfit">
                  {i18n.language === 'ar' ? 'مطوّر ومصمم الموقع' : 'Designed & Developed by'}
                </span>
                <div className="space-y-1">
                  <h3 className="text-2xl font-light text-white tracking-wide">
                    Eslam Metawie
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-luxury-gold/80 font-medium font-outfit">
                    Software Engineer | Full-Stack Web Developer
                  </p>
                </div>
                
                <p className="text-sm text-luxury-light/60 font-sans leading-relaxed font-light text-start pt-4 border-t border-white/5">
                  I build modern, high-performance, scalable web applications with a strong focus on clean architecture, user experience, and responsive design.
                </p>

                <div className="space-y-4 pt-4 text-sm text-luxury-light/70 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-luxury-light/40">Email</p>
                      <motion.a
                        href="mailto:eslammetawie50@gmail.com"
                        whileHover={{ y: -1 }}
                        className="hover:text-luxury-gold transition-colors font-sans block"
                      >
                        eslammetawie50@gmail.com
                      </motion.a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-luxury-light/40">WhatsApp</p>
                      <motion.a
                        href="https://wa.me/4917660370276"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -1 }}
                        className="hover:text-luxury-gold transition-colors font-sans block"
                      >
                        +49 176 60370276
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
