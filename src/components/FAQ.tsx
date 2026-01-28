import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  lang?: string;
}

const FAQ: React.FC<FAQProps> = ({ lang = 'en' }) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 1. Define English Data (Fallback)
  const enData = [
    {
      category: "General",
      questions: [
        { q: "Is ThumbGrabber really free?", a: "Yes, ThumbGrabber is 100% free to use. There are no hidden fees, subscriptions, or limits on how many thumbnails you can download." },
        { q: "Do I need to create an account?", a: "No account is required. You can start downloading thumbnails instantly without signing up or logging in." },
        { q: "Is it legal to download thumbnails?", a: "Generally, downloading thumbnails for personal use, inspiration, or reference is acceptable. However, if you plan to reuse them publicly, you should respect the creator's copyright." },
        { q: "Does this work on mobile phones?", a: "Yes! Our tool is fully optimized for all devices, including iPhones, Android phones, tablets, and desktop computers." },
        { q: "Is there a limit to how many I can download?", a: "No. You can download as many thumbnails as you need. Unlimited usage is free for everyone." }
      ]
    },
    {
      category: "Technical & Quality",
      questions: [
        { q: "How do I get the 8K resolution?", a: "If the video creator uploaded a thumbnail in 8K (7680x4320), we will automatically detect and provide it. Look for the 'Max Resolution' option in the results." },
        { q: "Why is 4K/8K not available for some videos?", a: "Not all videos have high-resolution thumbnails. If a creator uploaded a 1080p or 720p image, that is the maximum quality we can retrieve." },
        { q: "What file formats are supported?", a: "We provide thumbnails in their original high-quality format, typically JPG. You can also convert them to PNG or WebP using the dropdown menu before downloading." },
        { q: "Can I download thumbnails from private videos?", a: "No. The video must be Public or Unlisted. We cannot access data from Private videos due to YouTube's privacy restrictions." },
        { q: "Does this work for YouTube Shorts?", a: "Yes! Simply paste the link to any YouTube Short, and we will extract the high-quality cover image for you." },
        { q: "Can I grab thumbnails from Live Streams?", a: "Yes, works perfectly for both past live streams and currently live videos." }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        { q: "The download button isn't working.", a: "Try 'Right-Click > Save Image As' (Desktop) or 'Long Press > Download Image' (Mobile) if the button fails. This usually happens due to browser security settings." },
        { q: "It says 'Invalid URL'. What do I do?", a: "Make sure you copied the full link (e.g., http://youtube.com/watch?v=...). Short links like 'youtu.be' work too, but ensure they are complete." },
        { q: "Why is the downloaded image black bars?", a: "Some older videos have 4:3 aspect ratios which result in black bars on modern screens. This is part of the original image uploaded by the creator." }
      ]
    }
  ];

  // 2. Define Spanish Data (Example)
  const esData = [
    {
      category: "General",
      questions: [
        { q: "¿Es ThumbGrabber realmente gratis?", a: "Sí, ThumbGrabber es 100% gratuito. No hay tarifas ocultas, suscripciones ni límites en la cantidad de descargas." },
        { q: "¿Necesito crear una cuenta?", a: "No es necesario registrarse. Puedes empezar a descargar miniaturas al instante sin iniciar sesión." },
        { q: "¿Es legal descargar miniaturas?", a: "Generalmente, descargar para uso personal o referencia es aceptable. Si planeas reutilizarlas públicamente, respeta los derechos de autor." },
        { q: "¿Funciona en teléfonos móviles?", a: "¡Sí! Nuestra herramienta está optimizada para iPhones, Android, tabletas y computadoras." },
        { q: "¿Hay un límite de descargas?", a: "No. Puedes descargar tantas miniaturas como necesites. El uso ilimitado es gratuito para todos." }
      ]
    },
    {
      category: "Técnico y Calidad",
      questions: [
        { q: "¿Cómo obtengo la resolución 8K?", a: "Si el creador subió una miniatura en 8K, la detectaremos automáticamente. Busca la opción 'Resolución Máxima'." },
        { q: "¿Por qué no hay 4K/8K en algunos videos?", a: "No todos los videos tienen alta resolución. Si el creador subió 1080p o 720p, esa es la calidad máxima que podemos recuperar." },
        { q: "¿Qué formatos de archivo son compatibles?", a: "Proporcionamos JPG por defecto. También puedes convertirlos a PNG o WebP usando el menú desplegable." },
        { q: "¿Puedo descargar de videos privados?", a: "No. El video debe ser Público o No listado. No podemos acceder a videos privados." },
        { q: "¿Funciona con YouTube Shorts?", a: "¡Sí! Simplemente pega el enlace del Short y extraeremos la portada." },
        { q: "¿Puedo obtener miniaturas de transmisiones en vivo?", a: "Sí, funciona perfectamente para transmisiones pasadas y en vivo." }
      ]
    },
    {
      category: "Solución de Problemas",
      questions: [
        { q: "El botón de descarga no funciona.", a: "Intenta 'Clic derecho > Guardar imagen como' si el botón falla. Esto suele deberse a la seguridad del navegador." },
        { q: "Dice 'URL inválida'. ¿Qué hago?", a: "Asegúrate de haber copiado el enlace completo. Los enlaces cortos también funcionan." },
        { q: "¿Por qué la imagen tiene barras negras?", a: "Algunos videos antiguos tienen formato 4:3, lo que resulta en barras negras. Es parte de la imagen original." }
      ]
    }
  ];

  // 3. Language Map
  const dataMap: Record<string, typeof enData> = {
    en: enData,
    es: esData,
    // Add other languages here (e.g., fr: frData)
    // For now, other languages will fall back to English automatically below
  };

  // Select data based on lang, fallback to English if missing
  const activeData = dataMap[lang] || enData;

  const titleMap: Record<string, string> = {
    en: "Frequently Asked Questions",
    es: "Preguntas Frecuentes",
    fr: "Foire Aux Questions",
    de: "Häufig gestellte Fragen",
    it: "Domande Frequenti",
    pt: "Perguntas Frequentes",
    ru: "Часто задаваемые вопросы",
    zh: "常见问题",
    ja: "よくある質問",
    hi: "सामान्य प्रश्न",
    ar: "الأسئلة الشائعة",
    ko: "자주 묻는 질문",
    tr: "Sıkça Sorulan Sorular",
    vi: "Câu hỏi thường gặp",
    id: "Pertanyaan Umum"
  };

  return (
    <div className="faq-section">
      <div className="section-title">
        <HelpCircle size={24} /> 
        <span>{titleMap[lang] || titleMap['en']}</span>
      </div>
      
      <div className="faq-container">
        {activeData.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h3 className="faq-cat-title">{category.category}</h3>
            <div className="faq-grid-custom">
              {category.questions.map((item, qIndex) => {
                const uniqueId = `${catIndex}-${qIndex}`;
                return (
                  <div 
                    key={uniqueId} 
                    className={`faq-item-custom ${openIndex === uniqueId ? 'open' : ''}`}
                    onClick={() => toggleFAQ(uniqueId)}
                  >
                    <div className="faq-question">
                      {item.q}
                      {openIndex === uniqueId ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {openIndex === uniqueId && <div className="faq-answer">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
