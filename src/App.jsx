import { useEffect, useState } from 'react';
import SEO from './seo/SEO.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import TechStack from './components/TechStack.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import Chatbot from './components/Chatbot.jsx';
import Footer from './components/Footer.jsx';
import Admin from './components/Admin.jsx';
import { trackEvent } from './lib/api.js';

function getRouteFromQuery() {
  const search = window.location.search;
  if (search.startsWith('?/')) {
    return search.slice(1).split('&')[0].replace(/~and~/g, '&');
  }
  return window.location.pathname;
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(getRouteFromQuery() === '/admin');

  useEffect(() => {
    trackEvent({ type: 'page_view' });
  }, []);

  useEffect(() => {
    function onPopState() {
      setIsAdmin(getRouteFromQuery() === '/admin');
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function openAdmin() {
    window.history.pushState(null, '', '/admin');
    setIsAdmin(true);
  }

  function closeAdmin() {
    window.history.pushState(null, '', '/');
    setIsAdmin(false);
  }

  return (
    <>
      <SEO />
      <Navbar onOpenAdmin={openAdmin} />
      {isAdmin ? <Admin onClose={closeAdmin} /> : (
        <main>
          <Hero />
          <Services />
          <TechStack />
          <Process />
          <Contact />
        </main>
      )}
      <Footer />
      {!isAdmin && <Chatbot />}
    </>
  );
}
