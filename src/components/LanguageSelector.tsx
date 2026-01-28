import React, { useState, useRef, useEffect } from 'react';
import { Globe, Search, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: string;
  setLang: (lang: string) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'ko', name: '한국어 (Korean)' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'id', name: 'Bahasa Indonesia' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = languages.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lang-container" ref={dropdownRef}>
      {/* Trigger Button */}
      <button className="lang-trigger" onClick={() => setIsOpen(!isOpen)}>
        <Globe size={18} />
        <span className="lang-code">{currentLang.toUpperCase()}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="lang-dropdown">
          {/* Search Bar */}
          <div className="lang-search-wrapper">
            <Search size={14} className="search-icon-small" />
            <input 
              type="text" 
              placeholder="Search language..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="lang-search-input"
              autoFocus
            />
          </div>

          {/* Language List */}
          <div className="lang-list">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => (
                <button 
                  key={lang.code} 
                  className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    setLang(lang.code);
                    setIsOpen(false);
                  }}
                >
                  {lang.name}
                  {currentLang === lang.code && <Check size={14} />}
                </button>
              ))
            ) : (
              <div className="lang-no-results">No languages found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
