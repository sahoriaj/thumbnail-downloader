import React from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  lang: string;
}

const content: Record<string, any> = {
  en: {
    title: "Terms of Service",
    h1: "Terms of Service",
    p1: "By accessing this website we assume you accept these terms and conditions. Do not continue to use ThumbGrabber if you do not agree to take all of the terms and conditions stated on this page.",
    h2: "User Responsibilities",
    p2: "You agree to use this tool only for lawful purposes. You are responsible for ensuring that you have the necessary rights or permissions to use the thumbnails you download, especially for commercial purposes."
  },
  es: {
    title: "Términos de Servicio",
    h1: "Términos de Servicio",
    p1: "Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando ThumbGrabber si no estás de acuerdo.",
    h2: "Responsabilidades del Usuario",
    p2: "Aceptas usar esta herramienta solo para fines legales. Eres responsable de asegurarte de tener los derechos necesarios para usar las miniaturas que descargues."
  }
};

const Terms: React.FC<PageProps> = ({ lang }) => {
  const t = content[lang] || content['en'];

  return (
    <div className="page-content">
      <Helmet><title>{t.title} | ThumbGrabber</title></Helmet>
      <h1>{t.h1}</h1>
      <p>{t.p1}</p>
      <h3>{t.h2}</h3>
      <p>{t.p2}</p>
    </div>
  );
};

export default Terms;
