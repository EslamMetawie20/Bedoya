import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '../utils/image';

const showcaseProjects = [
  {
    id: 'bedroom-1',
    name: {
      ar: 'غرفة النوم',
      en: 'MASTER BEDROOM'
    },
    image: '/src/assets/projects/bedroom-1/render_1.jpg'
  },
  {
    id: 'library-room',
    name: {
      ar: 'غرفة القراءة',
      en: 'LIBRARY ROOM'
    },
    image: '/src/assets/projects/library-room/render_1.jpg'
  },
  {
    id: 'home-cinema',
    name: {
      ar: 'سينما منزلية',
      en: 'HOME CINEMA'
    },
    image: '/src/assets/projects/home-cinema/render_1.jpg'
  },
  {
    id: 'city-facade',
    name: {
      ar: 'واجهة معمارية',
      en: 'EXTERIOR FACADE'
    },
    image: '/src/assets/projects/city-facade/render_1.jpg'
  },
  {
    id: 'mens-majlis',
    name: {
      ar: 'مجلس رجال',
      en: 'LUXURY MAJLIS'
    },
    image: '/src/assets/projects/mens-majlis/render_1.jpg'
  }
];

export const ProjectShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Preload images to prevent flash/flicker
  useEffect(() => {
    showcaseProjects.forEach((proj) => {
      const img = new Image();
      img.src = getImageUrl(proj.image);
    });
  }, []);

  // Auto transition every 2.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % showcaseProjects.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentProject = showcaseProjects[index];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[340px] aspect-[1/1] rounded-full border border-luxury-gold/25 hover:border-luxury-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-700 relative flex items-center justify-center overflow-hidden cursor-pointer group"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1.0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Project Image */}
          <motion.img
            src={getImageUrl(currentProject.image)}
            alt={currentProject.name.en}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />

          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/95 via-luxury-black/40 to-transparent" />

          {/* Project Details Overlay */}
          <div 
            className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center justify-center gap-1 text-center w-full px-6"
          >
            <span className="font-outfit text-[9px] uppercase tracking-[0.25em] text-luxury-gold/70 font-bold">
              {i18n.language === 'ar' ? 'مشروع مميز' : 'FEATURED PROJECT'}
            </span>
            <h3 className="font-outfit text-sm md:text-base font-medium tracking-widest text-[#D4AF37] leading-tight">
              {i18n.language === 'ar' ? currentProject.name.ar : currentProject.name.en}
            </h3>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Blueprint Architecture Circular Elements */}
      <div 
        className="absolute inset-2 rounded-full border border-dashed border-luxury-gold/10 animate-spin pointer-events-none" 
        style={{ animationDuration: '45s' }} 
      />
      <div 
        className="absolute inset-6 rounded-full border border-luxury-gold/5 animate-spin pointer-events-none" 
        style={{ animationDuration: '30s', animationDirection: 'reverse' }} 
      />
    </div>
  );
};
