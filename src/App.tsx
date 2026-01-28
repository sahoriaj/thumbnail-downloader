import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState<string>('en');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>ThumbGrabber | YouTube Thumbnail Downloader</title>
          <meta name="description" content="Download 8K, 4K & HD thumbnails instantly." />
        </Helmet>

        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          lang={lang} 
          setLang={setLang} 
        />

        <main>
          <Routes>
            {/* Pass 'lang' to ALL pages now */}
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/privacy" element={<Privacy lang={lang} />} />
            <Route path="/terms" element={<Terms lang={lang} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
