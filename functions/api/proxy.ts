export const onRequestGet = async (context: any) => {
  const url = new URL(context.request.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) return new Response('Missing URL', { status: 400 });

  const imageResponse = await fetch(targetUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const newHeaders = new Headers(imageResponse.headers);
  newHeaders.set('Access-Control-Allow-Origin', '*');

  return new Response(imageResponse.body, {
    status: imageResponse.status,
    headers: newHeaders
  });
}
