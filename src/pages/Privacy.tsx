import React from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  lang: string;
}

const content: Record<string, any> = {
  en: {
    title: "Privacy Policy",
    h1: "Privacy Policy",
    date: "Last updated: January 2026",
    p1: "At ThumbGrabber, accessible from thumbgrabber.site, one of our main priorities is the privacy of our visitors.",
    h2: "Log Files",
    p2: "ThumbGrabber follows a standard procedure of using log files. These files log visitors when they visit websites.",
    h3: "Data Storage",
    p3: "We do not store any user-submitted URLs or downloaded images on our servers. All processing is done via proxy for the duration of the session only."
  },
  es: {
    title: "Política de Privacidad",
    h1: "Política de Privacidad",
    date: "Última actualización: Enero 2026",
    p1: "En ThumbGrabber, una de nuestras principales prioridades es la privacidad de nuestros visitantes.",
    h2: "Archivos de Registro",
    p2: "ThumbGrabber sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web.",
    h3: "Almacenamiento de Datos",
    p3: "No almacenamos URLs enviadas por los usuarios ni imágenes descargadas en nuestros servidores."
  }
};

const Privacy: React.FC<PageProps> = ({ lang }) => {
  const t = content[lang] || content['en'];

  return (
    <div className="page-content">
      <Helmet><title>{t.title} | ThumbGrabber</title></Helmet>
      <h1>{t.h1}</h1>
      <p>{t.date}</p>
      <p>{t.p1}</p>
      <h3>{t.h2}</h3>
      <p>{t.p2}</p>
      <h3>{t.h3}</h3>
      <p>{t.p3}</p>
    </div>
  );
};

export default Privacy;
