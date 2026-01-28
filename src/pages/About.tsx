import React from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  lang: string;
}

const content: Record<string, any> = {
  en: {
    title: "About Us",
    h1: "About ThumbGrabber",
    p1: "ThumbGrabber is a powerful, free online tool designed to help creators, marketers, and designers download high-resolution YouTube thumbnails instantly.",
    p2: "Our mission is to provide the simplest way to access 8K, 4K, and HD thumbnails without any complex software or registration.",
    h2: "Why Use ThumbGrabber?",
    li1: "High Quality: We always fetch the maximum resolution available (up to 8K).",
    li2: "Privacy Focused: We do not store your search history or downloaded files.",
    li3: "Fast & Free: No limits, no hidden fees, and lightning-fast processing."
  },
  es: {
    title: "Sobre Nosotros",
    h1: "Sobre ThumbGrabber",
    p1: "ThumbGrabber es una herramienta gratuita diseñada para ayudar a creadores y diseñadores a descargar miniaturas de YouTube en alta resolución al instante.",
    p2: "Nuestra misión es proporcionar la forma más sencilla de acceder a miniaturas 8K, 4K y HD sin software complejo.",
    h2: "¿Por qué usar ThumbGrabber?",
    li1: "Alta Calidad: Siempre obtenemos la resolución máxima disponible (hasta 8K).",
    li2: "Privacidad: No almacenamos tu historial de búsqueda ni archivos descargados.",
    li3: "Rápido y Gratis: Sin límites, sin tarifas ocultas y procesamiento ultrarrápido."
  }
};

const About: React.FC<PageProps> = ({ lang }) => {
  const t = content[lang] || content['en'];

  return (
    <div className="page-content">
      <Helmet><title>{t.title} | ThumbGrabber</title></Helmet>
      <h1>{t.h1}</h1>
      <p>{t.p1}</p>
      <p>{t.p2}</p>
      <h3>{t.h2}</h3>
      <ul>
        <li><strong>{t.li1.split(':')[0]}:</strong>{t.li1.split(':')[1]}</li>
        <li><strong>{t.li2.split(':')[0]}:</strong>{t.li2.split(':')[1]}</li>
        <li><strong>{t.li3.split(':')[0]}:</strong>{t.li3.split(':')[1]}</li>
      </ul>
    </div>
  );
};

export default About;
