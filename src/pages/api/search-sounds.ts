import type { APIRoute } from 'astro';
import { searchSounds } from '../../lib/api';

export const GET: APIRoute = async ({ url }) => {
  const name = url.searchParams.get('name');
  const page = url.searchParams.get('page');
  const pageSize = url.searchParams.get('page_size');

  if (!name) {
    return new Response(JSON.stringify({ error: 'Missing name parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const pageNum = page ? parseInt(page, 10) : 1;
    const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 55; // Default to 55 as in search.astro

    const results = await searchSounds(name, pageNum, pageSizeNum);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API search-sounds error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch sounds' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};