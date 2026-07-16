import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.jpeg';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxury-black border-t border-luxury-light/5 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Bedaya Logo" className="h-10 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-outfit text-base font-bold tracking-widest text-luxury-light">
                  BEDAYA
                </span>
                <span className="text-[9px] text-luxury-gold tracking-widest uppercase">
                  {i18n.language === 'ar' ? 'للمقاولات والتطوير' : 'Constructions & Development'}
                </span>
              </div>
            </div>
            <p className="text-sm text-luxury-light/50 max-w-sm font-sans leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
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
                <span dir="ltr">+20 100 000 0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>info@bedayagroup.com</span>
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
            className="flex items-center justify-center w-10 h-10 border border-luxury-light/10 hover:border-luxury-gold/50 rounded-none bg-transparent cursor-pointer transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-luxury-light group-hover:text-luxury-gold transition-colors duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};
