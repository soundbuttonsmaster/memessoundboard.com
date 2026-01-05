import type { APIRoute } from 'astro';
import { fetchCategories } from '../../lib/api';

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
  const baseUrl = 'https://memessoundboard.com';

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  try {
    const categories = await fetchCategories();

    // Flatten categories (including children)
    const flattenCategories = (cats: typeof categories): typeof categories => {
      const result: typeof categories = [];
      const traverse = (items: typeof categories) => {
        items.forEach((cat) => {
          result.push(cat);
          if (cat.children && cat.children.length > 0) {
            traverse(cat.children);
          }
        });
      };
      traverse(cats);
      return result;
    };

    const allCategories = flattenCategories(categories);

    allCategories.forEach((category) => {
      const slug = slugify(category.name);
      // Category interface doesn't include updated_at, but API may return it
      const lastMod = (category as any).updated_at ? new Date((category as any).updated_at).toISOString() : new Date().toISOString();

      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${slug}/${category.id}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += '    <changefreq>daily</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
  } catch (error) {
    console.error('Sitemap error fetching categories:', error);
    xml += `  <!-- Error: ${error instanceof Error ? error.message : 'Unknown error'} -->\n`;
  }

  xml += '</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=21600, s-maxage=21600, stale-while-revalidate=43200',
    },
  });
};

