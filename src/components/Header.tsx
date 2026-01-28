import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Heart, Globe, Sun, Moon } from 'lucide-react';

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
        {/* DONATE BUTTON - Styled like your screenshot */}
        <a href="https://ko-fi.com/" target="_blank" rel="noopener noreferrer" className="donate-btn">
          <Heart className="donate-icon" />
          <span>Donate</span>
        </a>

        {/* Language Selector */}
        <div className="lang-wrapper">
          <Globe className="lang-icon" size={16} />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)} 
            className="lang-select"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>

        {/* Theme Toggle - Sun/Moon Icons */}
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
