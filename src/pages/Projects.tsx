import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../data/projects.json';
import { PageTransition } from '../components/PageTransition';

export const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  // Filters mapping
  const filters = [
    { id: 'all', label: t('projects.all') },
    { id: 'interior', label: t('projects.interior') },
    { id: 'architecture', label: t('projects.architecture') },
    { id: 'entertainment', label: t('projects.entertainment') },
  ];

  // Filter logic
  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'interior') return project.category.en === 'Interior Design';
    if (activeFilter === 'architecture') return project.category.en === 'Real Estate & Exterior Architecture';
    if (activeFilter === 'entertainment') return project.category.en === 'Entertainment Design';
    return true;
  });

  return (
    <PageTransition>
      <div className="bg-luxury-black min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Page Title */}
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
              {t('projects.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white m-0">
              {i18n.language === 'ar' ? 'أعمالنا الهندسية المعاصرة' : 'Contemporary Portfolios'}
            </h1>
            <p className="text-sm md:text-base text-luxury-light/60 font-light leading-relaxed">
              {i18n.language === 'ar' 
                ? 'استكشف دراسات الحالة المفصلة للمشاريع التي تم تخطيطها وتصميمها وتنفيذها بواسطة فريق بداية المعماري.' 
                : 'Explore detailed case studies of modern designs planned, generated, and managed under Bedaya\'s creative team.'}
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-3 border-b border-white/5 pb-6">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 rounded-none border ${
                  activeFilter === filter.id
                    ? 'bg-luxury-gold border-luxury-gold text-luxury-black font-semibold'
                    : 'bg-transparent border-white/10 text-luxury-light/75 hover:border-luxury-gold/50 hover:text-luxury-gold'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Grid Container */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col bg-luxury-dark border border-white/5 overflow-hidden shadow-2xl hover:border-luxury-gold/20 transition-all duration-500"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900 relative">
                    <img
                      src={project.renders[0]}
                      alt={project.title[i18n.language as 'ar' | 'en']}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-black/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                    
                    {/* Hover Link Trigger */}
                    <Link
                      to={`/projects/${project.id}`}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[1px]"
                    >
                      <div className="w-12 h-12 rounded-full border border-luxury-gold/50 flex items-center justify-center text-luxury-gold bg-black/75 scale-90 group-hover:scale-100 transition-transform duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>

                  <div className="p-6 md:p-8 space-y-3 z-10 bg-luxury-dark">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                      {project.category[i18n.language as 'ar' | 'en']}
                    </span>
                    <h2 className="text-xl font-light text-white tracking-tight m-0">
                      {project.title[i18n.language as 'ar' | 'en']}
                    </h2>
                    <p className="text-xs md:text-sm text-luxury-light/50 font-light leading-relaxed line-clamp-2">
                      {project.description[i18n.language as 'ar' | 'en']}
                    </p>
                    <div className="pt-2">
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-xs text-white group-hover:text-luxury-gold font-bold uppercase tracking-widest transition-colors duration-300 inline-flex items-center gap-1.5"
                      >
                        <span>{t('projects.view_details')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};
