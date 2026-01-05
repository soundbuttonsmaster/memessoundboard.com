import type { APIRoute } from 'astro';
import { fetchSounds } from '../lib/api';

// Helper function to create URL-friendly slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const GET: APIRoute = async () => {
  console.log('===== SITEMAP SOUNDS GENERATION START =====');

  const baseUrl = 'https://memessoundboard.com';

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  try {
    let page = 1;
    let hasMore = true;
    const pageSize = 100;
    let totalSounds = 0;

    while (hasMore && page <= 100) {
      const response = await fetchSounds({ page, page_size: pageSize });
      const sounds = response.results || [];

      if (sounds.length === 0) {
        hasMore = false;
        break;
      }

      sounds.forEach((sound) => {
        const slug = slugify(sound.name);
        const lastMod = sound.updated_at ? new Date(sound.updated_at).toISOString() : new Date().toISOString();

        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/instant/${slug}-${sound.id}</loc>\n`;
        xml += `    <lastmod>${lastMod}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.7</priority>\n';
        xml += '  </url>\n';

        totalSounds++;
      });

      hasMore = !!response.next;
      page++;
    }

    console.log(`SUCCESS: Found ${totalSounds} sounds`);
  } catch (error) {
    console.error('ERROR:', error);
    xml += `  <!-- Error: ${error instanceof Error ? error.message : 'Unknown error'} -->\n`;
  }

  xml += '</urlset>';

  console.log('===== SITEMAP SOUNDS GENERATION END =====');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=21600, s-maxage=21600, stale-while-revalidate=43200',
    },
  });
};

