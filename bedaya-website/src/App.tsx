import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import './i18n'; // Force i18n initialization

// ScrollRestoration helper component to ensure pages load scrolled to top
const ScrollRestoration: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll if we are not navigating to a hash link anchor
    if (!window.location.hash) {
      window.scrollTo({ top: 0 });
    }
  }, [pathname]);

  return null;
};

// Layout wrapper to inject headers and footers nicely
const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-luxury-black font-sans selection:bg-luxury-gold selection:text-luxury-black">
      <ScrollRestoration />
      
      {/* Premium Glass Header */}
      <Header />
      
      {/* Route content */}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            {/* Fallback redirect or route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
