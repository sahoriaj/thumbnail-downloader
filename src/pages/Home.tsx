import React, { useState } from 'react';
import axios from 'axios';
import { 
  Youtube, Search, CheckCircle, Clipboard, X, Download, Image as ImageIcon, Loader2 
} from 'lucide-react';
import { Thumbnail, AnalyzeResponse, Translation } from '../types';
import FAQ from '../components/FAQ'; // Import the new FAQ

interface HomeProps {
  lang: string;
}

const translations: Record<string, Translation> = {
  en: {
    title: "YouTube Thumbnail Downloader",
    subtitle: "Get 8K, 4K & HD thumbnails instantly.",
    placeholder: "Paste YouTube Video URL...",
    btn: "Fetch Thumbnails",
    res: "Available Resolutions",
    faq: "FAQ",
    dl: "Download",
    downloading: "Saving...",
    scanning: "Scanning...",
    paste: "Paste",
    clear: "Clear"
  },
  es: {
    title: "Descargador de Miniaturas",
    subtitle: "Obtén miniaturas 8K, 4K y HD al instante.",
    placeholder: "Pega el enlace de YouTube...",
    btn: "Buscar",
    res: "Resoluciones Disponibles",
    faq: "Preguntas Frecuentes",
    dl: "Descargar",
    downloading: "Guardando...",
    scanning: "Escaneando...",
    paste: "Pegar",
    clear: "Borrar"
  }
};

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [url, setUrl] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dlLoading, setDlLoading] = useState<string | null>(null);
  
  const t = translations[lang] || translations['en'];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Paste failed', err);
    }
  };

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setThumbnails([]);
    
    try {
      const { data } = await axios.post<AnalyzeResponse>('/api/analyze', { url });
      setThumbnails(data.thumbnails);
    } catch (error) {
      alert("Could not find video. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imgUrl: string, id: string, format: string) => {
    setDlLoading(id);
    try {
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(imgUrl)}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      const ext = format.split('/')[1].replace('jpeg', 'jpg');
      link.download = `thumb_${id}_${Date.now()}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Download failed.");
    } finally {
      setDlLoading(null);
    }
  };

  return (
    <>
      <div className="hero">
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
          
          <div className="input-group">
            <div className="input-icon-wrapper">
              <Youtube className="input-icon" />
              <input 
                type="text" 
                placeholder={t.placeholder} 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              />
              {url ? (
                <button className="icon-btn" onClick={() => setUrl('')} title={t.clear}><X size={20} /></button>
              ) : (
                <button className="icon-btn" onClick={handlePaste} title={t.paste}><Clipboard size={20} /></button>
              )}
            </div>
            <button className="action-btn" onClick={handleFetch} disabled={loading}>
              {loading ? <Loader2 className="spin" /> : <><Search size={20} /> {t.btn}</>}
            </button>
          </div>
        </div>

        {thumbnails.length > 0 && (
          <div className="results-container">
             <div className="section-title"><ImageIcon /> {t.res}</div>
             <div className="thumb-grid">
               {thumbnails.map((thumb) => (
                 <div className="thumb-card" key={thumb.id}>
                   <div className="img-wrapper">
                     <img src={thumb.url} alt={thumb.name} loading="lazy" />
                   </div>
                   <div className="card-info">
                     <span className="res-name">{thumb.name}</span>
                     <CheckCircle className="check-icon" size={18} />
                   </div>
                   <div className="dl-controls">
                     <select id={`fmt-${thumb.id}`} className="format-select">
                        <option value="image/jpeg">JPG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                     </select>
                     <button 
                       className="dl-btn" 
                       onClick={() => {
                         const fmt = (document.getElementById(`fmt-${thumb.id}`) as HTMLSelectElement).value;
                         handleDownload(thumb.url, thumb.id, fmt);
                       }}
                       disabled={dlLoading === thumb.id}
                     >
                       {dlLoading === thumb.id ? <><Loader2 className="spin" size={18} /> {t.downloading}</> : <><Download size={18} /> {t.dl}</>}
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* REPLACED OLD FAQ WITH NEW COMPONENT */}
        <FAQ />
    </>
  );
};

export default Home;
