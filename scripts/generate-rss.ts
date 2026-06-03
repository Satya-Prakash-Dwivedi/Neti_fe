import fs from 'fs';
import path from 'path';
import { dailyDigests } from '../src/data/currentAffairs.js';
import { mindBlogs } from '../src/data/mindBlogs.js';

// Configuration
const BASE_URL = 'https://netiacademy.com';
const RSS_PATH = path.join(process.cwd(), 'public', 'rss.xml');

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss() {
  console.log('Generating RSS feed...');

  const items: any[] = [];

  // 1. Process Daily Digests
  dailyDigests.forEach((digest) => {
    const pubDate = new Date(digest.id).toUTCString();
    const link = `${BASE_URL}/current-affairs/${digest.id}`;
    
    // Create a rich description
    let description = '';
    if (digest.announcement) {
      description += `<p><strong>Announcement:</strong> ${digest.announcement}</p>`;
    }
    
    description += `<p>${digest.tagline}</p><ul>`;
    digest.topics.forEach((topic) => {
      description += `<li><strong>${topic.title}</strong>: ${topic.subtitle}</li>`;
    });
    description += `</ul><p><a href="${link}">Read the full daily analysis here.</a></p>`;

    items.push({
      title: `Daily Update: ${digest.date}`,
      link,
      pubDate,
      description: escapeHtml(description),
      guid: link
    });
  });

  // 2. Process Mind Blogs
  mindBlogs.forEach((blog) => {
    // Convert "April 8, 2026" to Date object
    const dateStr = blog.date.replace(/(\d+)(st|nd|rd|th)/, '$1'); // Clean "1st" to "1"
    const pubDate = new Date(dateStr).toUTCString();
    const link = `${BASE_URL}/mind/${blog.id}`;

    items.push({
      title: `Mind Blog: ${blog.title}`,
      link,
      pubDate,
      description: escapeHtml(blog.excerpt + `<p><a href="${link}">Read more...</a></p>`),
      guid: link
    });
  });

  // 3. Sort items by date (descending)
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // 4. Build XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Neti Academy Updates</title>
  <link>${BASE_URL}</link>
  <description>Daily Current Affairs and Mind Frameworks for focused UPSC preparation.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${items.map(item => `
  <item>
    <title>${item.title}</title>
    <link>${item.link}</link>
    <guid isPermaLink="true">${item.guid}</guid>
    <pubDate>${item.pubDate}</pubDate>
    <description>${item.description}</description>
  </item>`).join('')}
</channel>
</rss>`;

  // 5. Write to file
  if (!fs.existsSync(path.dirname(RSS_PATH))) {
    fs.mkdirSync(path.dirname(RSS_PATH), { recursive: true });
  }
  fs.writeFileSync(RSS_PATH, rssXml);
  console.log(`RSS feed generated successfully at ${RSS_PATH}`);
}

generateRss();
