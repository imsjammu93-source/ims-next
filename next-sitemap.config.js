/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://imsjammu.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/*', '/api', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
  additionalPaths: async (config) => {
    const paths = [];
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ghatiwebsolutions.com/ims-server/api';
    const baseUrl = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;

    const parseDate = (dateStr) => {
      try {
        if (!dateStr) return new Date().toISOString();
        const d = new Date(dateStr.replace(' ', 'T'));
        if (isNaN(d.getTime())) return new Date().toISOString();
        return d.toISOString();
      } catch (_) {
        return new Date().toISOString();
      }
    };

    // 1. Fetch Dynamic Blogs
    try {
      const blogsRes = await fetch(`${baseUrl}/blogs/get.php?all=0`);
      const blogsJson = await blogsRes.json();
      if (blogsJson.success && Array.isArray(blogsJson.data)) {
        for (const blog of blogsJson.data) {
          if (blog.slug) {
            paths.push({
              loc: `/blogs/${blog.slug}`,
              changefreq: 'daily',
              priority: 0.8,
              lastmod: parseDate(blog.updated_at || blog.published_at),
            });
          }
        }
      }
    } catch (err) {
      console.error('Error fetching blogs for sitemap:', err.message);
    }

    // 2. Fetch Dynamic Events
    try {
      const eventsRes = await fetch(`${baseUrl}/events/get.php?all=0`);
      const eventsJson = await eventsRes.json();
      if (eventsJson.success && Array.isArray(eventsJson.data)) {
        for (const event of eventsJson.data) {
          if (event.slug) {
            paths.push({
              loc: `/news-events/${event.slug}`,
              changefreq: 'daily',
              priority: 0.8,
              lastmod: parseDate(event.created_date),
            });
          }
        }
      }
    } catch (err) {
      console.error('Error fetching events for sitemap:', err.message);
    }

    return paths;
  },
};

