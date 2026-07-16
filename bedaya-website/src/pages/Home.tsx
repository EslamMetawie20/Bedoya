import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Hammer, Paintbrush, Building, ArrowUpRight, GraduationCap } from 'lucide-react';
import projectsData from '../data/projects.json';
import { PageTransition } from '../components/PageTransition';
import { getImageUrl } from '../utils/image';
import heroLogo from '../assets/brand/logo.png';

// Reusable Counter component using requestAnimationFrame for smooth luxury numbers
const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula for luxurious deceleration
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * value);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-outfit text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-luxury-gold">
      {count}
      {suffix}
    </span>
  );
};

export const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const featuredProjects = projectsData.slice(0, 3); // Showcase first 3 projects

  // Hero Parallax Scroll
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);

  // 3D Parallax Tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotation 12 degrees
    const rX = -(mouseY / (height / 2)) * 12;
    const rY = (mouseX / (width / 2)) * 12;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <PageTransition>
      {/* 1. CINEMATIC HERO */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Background Image Parallax */}
        <motion.div
          style={{ y: heroBgY, scale: heroScale, opacity: heroOpacity, backgroundImage: `url(${getImageUrl('/src/assets/projects/city-facade/render_1.jpg')})` }}
          className="absolute inset-0 z-0 bg-cover bg-[center_30%] md:bg-[center_25%] lg:bg-[center_20%] brightness-[0.4]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-black/50 z-1" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            className="relative flex justify-center items-center pt-10 pb-6 sm:pt-14 sm:pb-6 md:pt-18 md:pb-6 max-w-full cursor-pointer"
          >
            {/* BACKLIT LUXURY GLOW */}
            <div className="absolute w-[20rem] h-[20rem] sm:w-[26rem] sm:h-[26rem] md:w-[32rem] md:h-[32rem] lg:w-[40rem] lg:h-[40rem] bg-gradient-to-tr from-luxury-gold/15 via-white/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

            <motion.img
              src={heroLogo}
              alt="Bedaya Constructions & Development Logo"
              animate={{ 
                y: [0, -8, 0],
                rotateX: rotateX,
                rotateY: rotateY
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                rotateX: { type: "spring", stiffness: 150, damping: 20 },
                rotateY: { type: "spring", stiffness: 150, damping: 20 }
              }}
              whileHover={{ scale: 1.05 }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(254, 127, 45, 0.55)) drop-shadow(0 0 4px rgba(254, 127, 45, 0.35))',
                transformStyle: "preserve-3d"
              }}
              className="w-auto h-[7.5rem] sm:h-[10.5rem] md:h-[13.5rem] lg:h-[16.5rem] xl:h-[19.5rem] max-w-[95vw] object-contain pointer-events-none"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-lg lg:text-xl text-luxury-light/75 max-w-2xl mx-auto font-sans font-light"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <Link
              to="/projects"
              className="px-8 py-3.5 bg-luxury-gold text-luxury-black font-semibold text-sm uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-all duration-300 rounded-none shadow-lg shadow-luxury-gold/10"
            >
              {t('hero.cta')}
            </Link>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-white/20 text-white font-semibold text-sm uppercase tracking-widest hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 rounded-none"
            >
              {t('contact.btn')}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-outfit">
            {t('hero.scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-luxury-gold/60 rounded-full"
          />
        </div>
      </div>

      {/* 2. COMPANY INTRODUCTION */}
      <section id="about" className="relative bg-luxury-black py-24 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
                {t('about.badge')}
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
                {t('about.title')}
              </h2>
            </div>

            <div className="space-y-6 text-sm md:text-base text-luxury-light/60 font-light leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>

            {/* Vision / Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="glass-card p-6 md:p-8 space-y-4">
                <h3 className="text-lg font-bold text-luxury-gold">{t('about.vision.title')}</h3>
                <p className="text-xs md:text-sm text-luxury-light/50 font-light leading-relaxed">
                  {t('about.vision.text')}
                </p>
              </div>
              <div className="glass-card p-6 md:p-8 space-y-4">
                <h3 className="text-lg font-bold text-luxury-gold">{t('about.mission.title')}</h3>
                <p className="text-xs md:text-sm text-luxury-light/50 font-light leading-relaxed">
                  {t('about.mission.text')}
                </p>
              </div>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-luxury-dark border border-white/5 shadow-2xl relative group">
              <img
                src={getImageUrl("/src/assets/projects/mens-majlis/render_1.jpg")}
                alt="Bedaya Interior Renders"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs text-luxury-gold uppercase tracking-widest font-bold font-outfit mb-1">
                  {i18n.language === 'ar' ? 'تصميم داخلي معاصر' : 'Contemporary Interior Design'}
                </p>
                <p className="text-base text-white font-medium">
                  {i18n.language === 'ar' ? 'مجلس رجال رسمي - الخبرة والفخامة' : 'Official Men\'s Majlis Showcase'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section className="bg-luxury-dark py-24 md:py-36 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
                {t('projects.badge')}
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
                {t('projects.title')}
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 group text-luxury-light hover:text-luxury-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold font-outfit"
            >
              <span>{i18n.language === 'ar' ? 'مشاهدة كافة المشاريع' : 'View All Projects'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-luxury-black overflow-hidden border border-white/5 shadow-2xl"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-900 relative">
                  <img
                    src={getImageUrl(project.renders[0])}
                    alt={project.title[i18n.language as 'ar' | 'en']}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/85 via-black/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                  
                  {/* Hover icon details */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
                  >
                    <div className="w-12 h-12 rounded-full border border-luxury-gold/50 flex items-center justify-center text-luxury-gold bg-black/60 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </Link>
                </div>

                <div className="p-6 md:p-8 space-y-3 z-10 bg-luxury-black">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                    {project.category[i18n.language as 'ar' | 'en']}
                  </span>
                  <h3 className="text-xl font-light text-white tracking-tight">
                    {project.title[i18n.language as 'ar' | 'en']}
                  </h3>
                  <p className="text-xs md:text-sm text-luxury-light/50 font-light leading-relaxed line-clamp-2">
                    {project.description[i18n.language as 'ar' | 'en']}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-xs text-white group-hover:text-luxury-gold font-bold uppercase tracking-widest transition-colors duration-300 inline-flex items-center gap-1.5"
                    >
                      <span>{t('projects.view_details')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="services" className="bg-luxury-black py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
              {t('services.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
              {t('services.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 md:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <Hammer className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white">{t('services.s1.title')}</h3>
                <p className="text-sm text-luxury-light/50 font-light leading-relaxed">
                  {t('services.s1.desc')}
                </p>
              </div>
            </div>

            <div className="glass-card p-8 md:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <Paintbrush className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white">{t('services.s2.title')}</h3>
                <p className="text-sm text-luxury-light/50 font-light leading-relaxed">
                  {t('services.s2.desc')}
                </p>
              </div>
            </div>

            <div className="glass-card p-8 md:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white">{t('services.s3.title')}</h3>
                <p className="text-sm text-luxury-light/50 font-light leading-relaxed">
                  {t('services.s3.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STATISTICS SECTION */}
      <section className="bg-luxury-dark py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <Counter value={55} suffix="+" />
              <p className="text-xs uppercase tracking-widest text-luxury-light/40 font-bold">
                {t('stats.projects')}
              </p>
            </div>
            <div className="space-y-2">
              <Counter value={10} suffix="+" />
              <p className="text-xs uppercase tracking-widest text-luxury-light/40 font-bold">
                {t('stats.experience')}
              </p>
            </div>
            <div className="space-y-2">
              <Counter value={7} suffix="+" />
              <p className="text-xs uppercase tracking-widest text-luxury-light/40 font-bold">
                {t('stats.ksa')}
              </p>
            </div>
            <div className="space-y-2">
              <Counter value={99} suffix="%" />
              <p className="text-xs uppercase tracking-widest text-luxury-light/40 font-bold">
                {t('stats.clients')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESPONSIBLE ENGINEER: YOMNA MOTAWE */}
      <section className="bg-luxury-black py-24 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="glass-card p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Engineer Profile Bio */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{t('director.badge')}</span>
                </span>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
                  {t('director.name')}
                </h2>
                <p className="text-sm font-semibold uppercase tracking-widest text-luxury-gold/80 font-outfit">
                  {t('director.title')}
                </p>
              </div>

              <p className="text-sm md:text-base text-luxury-light/60 font-light leading-relaxed">
                {t('director.desc')}
              </p>

              <div className="pt-4">
                <a
                  href="https://www.behance.net/yomnamotawe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-luxury-navy hover:bg-luxury-gold text-white hover:text-luxury-black font-semibold text-sm uppercase tracking-widest transition-all duration-300 rounded-none shadow-lg group cursor-pointer"
                >
                  <span>{t('director.behance')}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Graphics Backdrop representing Architect Work */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-[340px] aspect-[1/1] rounded-full border border-luxury-gold/25 relative flex items-center justify-center p-6 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-luxury-gold/5 via-transparent to-transparent animate-pulse" />
                
                {/* Rotating drafting circular lines representing Architecture */}
                <div className="absolute inset-2 rounded-full border border-dashed border-luxury-light/10 animate-spin" style={{ animationDuration: '60s' }} />
                <div className="absolute inset-8 rounded-full border border-luxury-light/5 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
                
                <div className="relative text-center space-y-4">
                  <span className="font-outfit text-[11px] uppercase tracking-widest text-luxury-gold font-bold">
                    Portfolio Creative Design
                  </span>
                  <p className="text-xs text-luxury-light/50 max-w-[200px] leading-relaxed">
                    {i18n.language === 'ar' ? 'مخططات تفصيلية وحلول إنشائية فاخرة تلائم المستقبل.' : 'Bespoke conceptualizations & executive spatial details.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & CALL TO ACTION */}
      <section id="contact" className="bg-luxury-dark py-24 md:py-36 relative border-t border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.03]" style={{ backgroundImage: `url(${getImageUrl('/src/assets/projects/library-room/render_3.jpg')})` }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
            {t('contact.title')}
          </h2>
          <p className="text-sm md:text-base text-luxury-light/60 max-w-xl mx-auto font-light leading-relaxed">
            {t('contact.subtitle')}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:info@bedayagroup.com"
              className="px-8 py-3.5 bg-white text-luxury-black font-semibold text-sm uppercase tracking-widest hover:bg-luxury-gold transition-all duration-300 rounded-none shadow-lg shadow-white/5 cursor-pointer"
            >
              info@bedayagroup.com
            </a>
            <a
              href="tel:+201000000000"
              className="text-white hover:text-luxury-gold font-bold text-sm uppercase tracking-widest transition-colors duration-300"
            >
              +20 100 000 0000
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
