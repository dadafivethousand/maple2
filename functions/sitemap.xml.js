export async function onRequest() {
  const res = await fetch(
    "https://worker-consolidated.maxli5004.workers.dev/sitemap/maple"
  );

  if (!res.ok) {
    return new Response("Sitemap not found", { status: 404 });
  }

  const xml = await res.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
