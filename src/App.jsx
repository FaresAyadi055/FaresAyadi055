import { useEffect } from 'react';
import SEO from './seo/SEO.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import TechStack from './components/TechStack.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import Chatbot from './components/Chatbot.jsx';
import Footer from './components/Footer.jsx';
import { trackEvent } from './lib/api.js';

export default function App() {
  useEffect(() => {
    trackEvent({ type: 'page_view' });
  }, []);

  return (
    <>
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <Process />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
