export interface Thumbnail {
  id: string;
  name: string;
  url: string;
  file: string;
}

export interface AnalyzeResponse {
  videoId: string;
  thumbnails: Thumbnail[];
}

export interface Translation {
  title: string;
  subtitle: string;
  placeholder: string;
  btn: string;
  res: string;
  faq: string;
  dl: string;
  downloading: string;
  scanning: string;
  paste: string;
  clear: string;
}
