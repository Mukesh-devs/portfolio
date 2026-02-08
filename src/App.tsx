import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatButton from './components/AIChatButton';
import AIChatWindow from './components/AIChatWindow';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} isScrolled={isScrolled} />
        <main>
          <Hero isScrolled={isScrolled} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </main>
        <Footer />
        <AIChatButton onClick={() => setIsChatOpen(true)} />
        <AIChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;