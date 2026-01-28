import React, { useState } from 'react';
import axios from 'axios';
import { 
  Youtube, Search, CheckCircle, Clipboard, X, Download, Image as ImageIcon, Loader2 
} from 'lucide-react';
import { Thumbnail, AnalyzeResponse, Translation } from '../types';
import FAQ from '../components/FAQ';

interface HomeProps {
  lang: string;
}

// FULL TRANSLATION DATABASE
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
  },
  fr: {
    title: "Téléchargeur de Miniatures",
    subtitle: "Obtenez des miniatures 8K, 4K et HD instantanément.",
    placeholder: "Collez le lien YouTube ici...",
    btn: "Chercher",
    res: "Résolutions Disponibles",
    faq: "FAQ",
    dl: "Télécharger",
    downloading: "Enregistrement...",
    scanning: "Scan en cours...",
    paste: "Coller",
    clear: "Effacer"
  },
  de: {
    title: "YouTube Thumbnail Downloader",
    subtitle: "Laden Sie 8K, 4K & HD Thumbnails sofort herunter.",
    placeholder: "YouTube-Link hier einfügen...",
    btn: "Suchen",
    res: "Verfügbare Auflösungen",
    faq: "FAQ",
    dl: "Herunterladen",
    downloading: "Speichern...",
    scanning: "Scannen...",
    paste: "Einfügen",
    clear: "Löschen"
  },
  it: {
    title: "Scaricatore di Miniature",
    subtitle: "Ottieni miniature 8K, 4K e HD istantaneamente.",
    placeholder: "Incolla il link YouTube...",
    btn: "Cerca",
    res: "Risoluzioni Disponibili",
    faq: "FAQ",
    dl: "Scarica",
    downloading: "Salvataggio...",
    scanning: "Scansione...",
    paste: "Incolla",
    clear: "Cancella"
  },
  pt: {
    title: "Baixador de Miniaturas",
    subtitle: "Baixe miniaturas em 8K, 4K e HD instantaneamente.",
    placeholder: "Cole o link do YouTube...",
    btn: "Buscar",
    res: "Resoluções Disponíveis",
    faq: "Perguntas Frequentes",
    dl: "Baixar",
    downloading: "Salvando...",
    scanning: "Escaneando...",
    paste: "Colar",
    clear: "Limpar"
  },
  ru: {
    title: "Загрузчик значков YouTube",
    subtitle: "Скачивайте значки в 8K, 4K и HD мгновенно.",
    placeholder: "Вставьте ссылку на YouTube...",
    btn: "Найти",
    res: "Доступные разрешения",
    faq: "FAQ",
    dl: "Скачать",
    downloading: "Сохранение...",
    scanning: "Сканирование...",
    paste: "Вставить",
    clear: "Очистить"
  },
  zh: {
    title: "YouTube 缩略图下载器",
    subtitle: "即时获取 8K、4K 和 HD 缩略图。",
    placeholder: "粘贴 YouTube 视频链接...",
    btn: "获取缩略图",
    res: "可用分辨率",
    faq: "常见问题",
    dl: "下载",
    downloading: "保存中...",
    scanning: "扫描中...",
    paste: "粘贴",
    clear: "清除"
  },
  ja: {
    title: "YouTube サムネイルダウンローダー",
    subtitle: "8K、4K、HDのサムネイルを瞬時に取得。",
    placeholder: "YouTubeのリンクを貼り付け...",
    btn: "検索",
    res: "利用可能な解像度",
    faq: "よくある質問",
    dl: "ダウンロード",
    downloading: "保存中...",
    scanning: "スキャン中...",
    paste: "貼り付け",
    clear: "クリア"
  },
  hi: {
    title: "YouTube थंबनेल डाउनलोडर",
    subtitle: "8K, 4K और HD थंबनेल तुरंत डाउनलोड करें।",
    placeholder: "YouTube वीडियो लिंक पेस्ट करें...",
    btn: "खोजें",
    res: "उपलब्ध रेजोल्यूशन",
    faq: "सामान्य प्रश्न",
    dl: "डाउनलोड",
    downloading: "सहेज रहा है...",
    scanning: "स्कैनिंग...",
    paste: "पेस्ट",
    clear: "साफ़ करें"
  },
  ar: {
    title: "محمل الصور المصغرة",
    subtitle: "احصل على صور بدقة 8K و 4K و HD فوراً.",
    placeholder: "ضع رابط الفيديو هنا...",
    btn: "بحث",
    res: "الجودات المتاحة",
    faq: "الأسئلة الشائعة",
    dl: "تحميل",
    downloading: "جاري الحفظ...",
    scanning: "جاري المسح...",
    paste: "لصق",
    clear: "مسح"
  },
  ko: {
    title: "YouTube 썸네일 다운로더",
    subtitle: "8K, 4K 및 HD 썸네일을 즉시 받으세요.",
    placeholder: "YouTube 링크 붙여넣기...",
    btn: "검색",
    res: "사용 가능한 해상도",
    faq: "FAQ",
    dl: "다운로드",
    downloading: "저장 중...",
    scanning: "스캔 중...",
    paste: "붙여넣기",
    clear: "지우기"
  },
  tr: {
    title: "Küçük Resim İndirici",
    subtitle: "8K, 4K ve HD küçük resimleri anında indirin.",
    placeholder: "YouTube bağlantısını yapıştırın...",
    btn: "Bul",
    res: "Mevcut Çözünürlükler",
    faq: "SSS",
    dl: "İndir",
    downloading: "Kaydediliyor...",
    scanning: "Taranıyor...",
    paste: "Yapıştır",
    clear: "Temizle"
  },
  vi: {
    title: "Trình tải hình thu nhỏ YouTube",
    subtitle: "Tải hình thu nhỏ 8K, 4K & HD ngay lập tức.",
    placeholder: "Dán liên kết YouTube...",
    btn: "Tìm kiếm",
    res: "Độ phân giải có sẵn",
    faq: "Câu hỏi thường gặp",
    dl: "Tải xuống",
    downloading: "Đang lưu...",
    scanning: "Đang quét...",
    paste: "Dán",
    clear: "Xóa"
  },
  id: {
    title: "Pengunduh Thumbnail YouTube",
    subtitle: "Dapatkan thumbnail 8K, 4K & HD secara instan.",
    placeholder: "Tempel Tautan YouTube...",
    btn: "Cari",
    res: "Resolusi Tersedia",
    faq: "FAQ",
    dl: "Unduh",
    downloading: "Menyimpan...",
    scanning: "Memindai...",
    paste: "Tempel",
    clear: "Hapus"
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

        <FAQ />
    </>
  );
};

export default Home;
