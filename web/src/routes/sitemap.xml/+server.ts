import * as env from "$env/static/public";

const host = (env as Record<string, string | undefined>)["WEB_HOST"];

const pages = [
    { path: "/",               priority: "1.0", changefreq: "weekly"  },
    { path: "/about",          priority: "0.8", changefreq: "monthly" },
    { path: "/about/general",  priority: "0.7", changefreq: "monthly" },
    { path: "/about/privacy",  priority: "0.7", changefreq: "monthly" },
    { path: "/about/terms",    priority: "0.7", changefreq: "monthly" },
    { path: "/about/credits",  priority: "0.5", changefreq: "monthly" },
    { path: "/about/community",priority: "0.6", changefreq: "monthly" },
    { path: "/donate",         priority: "0.6", changefreq: "monthly" },
    { path: "/updates",        priority: "0.7", changefreq: "weekly"  },
];

const buildSitemap = (baseUrl: string) => {
    const today = new Date().toISOString().split("T")[0];

    const urls = pages.map(({ path, priority, changefreq }) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
};

export const GET = () => {
    const baseUrl = host ? `https://${host}` : "https://api.cobalt.tools";

    return new Response(buildSitemap(baseUrl), {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
        }
    });
};

export const prerender = true;
