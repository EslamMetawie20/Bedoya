import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass, Maximize2, Calendar, Layout, User } from 'lucide-react';
import projectsData from '../data/projects.json';
import { PageTransition } from '../components/PageTransition';
import { Lightbox } from '../components/Lightbox';
import { getImageUrl } from '../utils/image';

export const ProjectDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();

  // Find project matching the param id
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  // States for Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <PageTransition>
        <div className="bg-luxury-black min-h-screen pt-36 pb-24 text-center">
          <div className="max-w-md mx-auto space-y-6 px-6">
            <h1 className="text-3xl font-light text-white">Project Not Found</h1>
            <p className="text-sm text-luxury-light/60">
              The project you are looking for does not exist or has been relocated.
            </p>
            <Link
              to="/projects"
              className="inline-block px-6 py-3 border border-luxury-gold text-luxury-gold uppercase tracking-widest text-xs font-bold font-outfit"
            >
              Return to Portfolio
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Next & Previous Navigation
  const prevProject = projectsData[projectIndex - 1] || projectsData[projectsData.length - 1];
  const nextProject = projectsData[projectIndex + 1] || projectsData[0];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? project.renders.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev === project.renders.length - 1 ? 0 : prev + 1));
  };

  const lang = i18n.language as 'ar' | 'en';

  return (
    <PageTransition>
      <div className="bg-luxury-black min-h-screen pt-24 pb-20">
        
        {/* Project Case Study Hero */}
        <div className="relative h-[65vh] w-full overflow-hidden bg-neutral-900 border-b border-white/5">
          <img
            src={getImageUrl(project.renders[0])}
            alt={project.title[lang]}
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-black/20 to-transparent" />
          
          <div className="absolute bottom-12 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luxury-gold/80 hover:text-luxury-gold transition-colors duration-300"
              >
                <ArrowLeft className={`w-3.5 h-3.5 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
                <span>{t('project_detail.back')}</span>
              </Link>
              
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold font-outfit">
                  {project.category[lang]}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white m-0">
                  {project.title[lang]}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description & Details */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-xl uppercase tracking-widest font-bold text-white border-b border-white/5 pb-3">
              {i18n.language === 'ar' ? 'فكرة المشروع الفنية' : 'Architectural Narrative'}
            </h2>
            <p className="text-sm md:text-base text-luxury-light/70 font-light leading-relaxed whitespace-pre-line">
              {project.description[lang]}
            </p>

            {/* Architectural drawings plan section */}
            {project.plan && (
              <div className="space-y-6 pt-6">
                <h2 className="text-xl uppercase tracking-widest font-bold text-white border-b border-white/5 pb-3">
                  {t('project_detail.plans')}
                </h2>
                <div className="glass-card p-4 md:p-6 flex flex-col items-center justify-center border border-white/5 bg-luxury-dark/40 relative group overflow-hidden">
                  <img
                    src={getImageUrl(project.plan)}
                    alt="Architectural Plan Drawings"
                    className="max-h-[450px] w-auto object-contain brightness-95 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                       onClick={() => handleOpenLightbox(999)}> {/* Use index 999 to identify plan image */}
                    <div className="flex items-center gap-2 text-luxury-gold font-bold text-xs uppercase tracking-widest">
                      <Maximize2 className="w-4 h-4" />
                      <span>{i18n.language === 'ar' ? 'تكبير المخطط الهندسي' : 'View Full Plan'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h3 className="text-sm uppercase tracking-widest font-bold text-luxury-gold">
                {t('project_detail.details')}
              </h3>

              <div className="space-y-4 text-sm font-light">
                <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                  <div className="flex items-center gap-2 text-luxury-light/50">
                    <Layout className="w-4 h-4 text-luxury-gold" />
                    <span>{t('project_detail.area')}</span>
                  </div>
                  <span className="font-semibold text-white font-outfit">{project.details.area}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                  <div className="flex items-center gap-2 text-luxury-light/50">
                    <Compass className="w-4 h-4 text-luxury-gold" />
                    <span>{t('project_detail.location')}</span>
                  </div>
                  <span className="font-semibold text-white">{project.details.location[lang]}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                  <div className="flex items-center gap-2 text-luxury-light/50">
                    <Calendar className="w-4 h-4 text-luxury-gold" />
                    <span>{t('project_detail.year')}</span>
                  </div>
                  <span className="font-semibold text-white font-outfit">{project.details.year}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                  <div className="flex items-center gap-2 text-luxury-light/50">
                    <User className="w-4 h-4 text-luxury-gold" />
                    <span>{t('project_detail.architect')}</span>
                  </div>
                  <span className="font-semibold text-white">{project.details.lead}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid Showcase */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-8">
          <h2 className="text-xl uppercase tracking-widest font-bold text-white border-b border-white/5 pb-3">
            {t('project_detail.gallery')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.renders.map((render, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleOpenLightbox(idx)}
                className="aspect-[4/3] bg-neutral-900 border border-white/5 overflow-hidden shadow-xl cursor-pointer relative group"
              >
                <img
                  src={getImageUrl(render)}
                  alt={`Render showcase ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-luxury-gold/50 bg-black/60 flex items-center justify-center text-luxury-gold scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-4.5 h-4.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Next / Previous Project Navigation */}
        <div className="border-t border-white/5 mt-16 pt-12 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center gap-6">
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex flex-col text-start space-y-1.5 cursor-pointer max-w-[45%]"
            >
              <span className="text-[10px] uppercase tracking-widest text-luxury-light/40 font-bold inline-flex items-center gap-1">
                <ArrowLeft className={`w-3 h-3 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
                <span>{t('project_detail.prev')}</span>
              </span>
              <span className="text-sm md:text-base font-light text-white group-hover:text-luxury-gold transition-colors duration-300 line-clamp-1">
                {prevProject.title[lang]}
              </span>
            </Link>

            <Link
              to="/projects"
              className="px-6 py-2.5 border border-white/10 hover:border-luxury-gold/50 text-luxury-light/75 hover:text-luxury-gold text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              {t('projects.all')}
            </Link>

            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex flex-col text-end space-y-1.5 cursor-pointer max-w-[45%]"
            >
              <span className="text-[10px] uppercase tracking-widest text-luxury-light/40 font-bold inline-flex items-center gap-1 justify-end">
                <span>{t('project_detail.next')}</span>
                <ArrowRight className={`w-3 h-3 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
              </span>
              <span className="text-sm md:text-base font-light text-white group-hover:text-luxury-gold transition-colors duration-300 line-clamp-1">
                {nextProject.title[lang]}
              </span>
            </Link>
          </div>
        </div>

      </div>

      {/* Lightbox Overlay */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxIndex === 999 ? [getImageUrl(project.plan)] : project.renders.map(getImageUrl)}
        currentIndex={lightboxIndex === 999 ? 0 : lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </PageTransition>
  );
};
