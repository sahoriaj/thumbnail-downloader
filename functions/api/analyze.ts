interface Env {}

interface RequestBody {
  url: string;
}

export const onRequestPost = async (context: any) => {
  const { request } = context;
  
  let body: RequestBody;
  try { 
    body = await request.json(); 
  } catch (e) { 
    return new Response('Bad JSON', { status: 400 }); 
  }

  const { url } = body;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[7].length === 11) ? match[7] : false;

  if (!videoId) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const qualities = [
    { id: 'max', name: 'Max Resolution (8K/4K)', filename: 'maxresdefault.jpg' },
    { id: 'sd', name: 'Standard (SD)', filename: 'sddefault.jpg' },
    { id: 'hq', name: 'High Quality (HQ)', filename: 'hqdefault.jpg' },
    { id: 'mq', name: 'Medium (MQ)', filename: 'mqdefault.jpg' }
  ];

  const available: any[] = [];

  // Parallel check
  await Promise.all(qualities.map(async (q) => {
    const imgUrl = `https://i.ytimg.com/vi/${videoId}/${q.filename}`;
    try {
      const res = await fetch(imgUrl, { method: 'HEAD' });
      if (res.status === 200) available.push({ ...q, url: imgUrl });
    } catch (err) {}
  }));

  return new Response(JSON.stringify({ videoId, thumbnails: available }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
