import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://memessoundboard.com';
  const currentDate = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  const staticPages = [
    { url: '', changefreq: 'hourly', priority: '1.0' },
    { url: '/new', changefreq: 'hourly', priority: '0.9' },
    { url: '/trending', changefreq: 'hourly', priority: '0.9' },
    { url: '/about', changefreq: 'monthly', priority: '0.6' },
    { url: '/contact', changefreq: 'monthly', priority: '0.6' },
    { url: '/upload', changefreq: 'weekly', priority: '0.6' },
    { url: '/favorites', changefreq: 'weekly', priority: '0.5' },
    { url: '/login', changefreq: 'monthly', priority: '0.5' },
    { url: '/signup', changefreq: 'monthly', priority: '0.5' },
    { url: '/play-random', changefreq: 'daily', priority: '0.7' },
    { url: '/privacy-policy', changefreq: 'monthly', priority: '0.4' },
    { url: '/terms-and-conditions', changefreq: 'monthly', priority: '0.4' },
    { url: '/disclaimer', changefreq: 'monthly', priority: '0.4' },
    { url: '/dmca', changefreq: 'monthly', priority: '0.4' },
  ];

  staticPages.forEach((page) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=21600, s-maxage=21600, stale-while-revalidate=43200',
    },
  });
};

