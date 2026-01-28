import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Heart, Sun, Moon } from 'lucide-react';
import LanguageSelector from './LanguageSelector'; // Import the new component

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  lang: string;
  setLang: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, lang, setLang }) => {
  return (
    <header>
      {/* Logo */}
      <Link to="/" className="logo">
        <Youtube className="logo-icon" strokeWidth={2.5} />
        <span className="logo-text">ThumbGrabber</span>
      </Link>

      <div className="header-controls">
        {/* DONATE BUTTON - Minimalist (No Background) */}
        <a href="https://ko-fi.com/" target="_blank" rel="noopener noreferrer" className="donate-btn-minimal" title="Donate">
          <Heart className="donate-icon" />
          <span>Donate</span>
        </a>

        {/* NEW LANGUAGE SELECTOR */}
        <LanguageSelector currentLang={lang} setLang={setLang} />

        {/* Theme Toggle */}
        <button 
          className="icon-btn-header theme-btn" 
          onClick={toggleTheme} 
          title="Toggle Theme"
        >
          {theme === 'light' ? <Sun className="sun-icon" /> : <Moon className="moon-icon" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
