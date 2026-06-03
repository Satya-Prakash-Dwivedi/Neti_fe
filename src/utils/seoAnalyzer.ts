export interface SEOFeedback {
  id: string;
  type: 'success' | 'warning' | 'error';
  message: string;
}

export interface SEOResult {
  score: number;
  feedback: SEOFeedback[];
}

export interface SEOAnalyzeable {
  title: string;
  excerpt?: string;
  content: string;
  keywords?: string[];
}

export function analyzeSEO(blog: SEOAnalyzeable): SEOResult {
  let score = 100;
  const feedback: SEOFeedback[] = [];

  // 1. Title Length
  const titleLength = blog.title.length;
  if (titleLength < 40) {
    score -= 10;
    feedback.push({ id: 'title-short', type: 'warning', message: `Title is too short (${titleLength} chars). Optimal is 40-60 characters.` });
  } else if (titleLength > 60) {
    score -= 10;
    feedback.push({ id: 'title-long', type: 'warning', message: `Title is too long (${titleLength} chars). Optimal is 40-60 characters.` });
  } else {
    feedback.push({ id: 'title-good', type: 'success', message: 'Title length is optimal (40-60 characters).' });
  }

  // 2. Excerpt / Meta Description Length
  if (!blog.excerpt || blog.excerpt.trim() === '') {
    score -= 20;
    feedback.push({ id: 'excerpt-missing', type: 'error', message: 'Missing excerpt/meta description.' });
  } else {
    const excerptLength = blog.excerpt.length;
    if (excerptLength < 120) {
      score -= 10;
      feedback.push({ id: 'excerpt-short', type: 'warning', message: `Excerpt is too short (${excerptLength} chars). Optimal is 120-160 characters.` });
    } else if (excerptLength > 160) {
      score -= 10;
      feedback.push({ id: 'excerpt-long', type: 'warning', message: `Excerpt is too long (${excerptLength} chars). Optimal is 120-160 characters.` });
    } else {
       feedback.push({ id: 'excerpt-good', type: 'success', message: 'Excerpt length is optimal (120-160 characters).' });
    }
  }

  // 3. Word Count
  const words = blog.content.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  if (wordCount < 300) {
    score -= 15;
    feedback.push({ id: 'content-short', type: 'error', message: `Content is too short (${wordCount} words). Minimum recommended is 300 words.` });
  } else if (wordCount >= 300 && wordCount < 600) {
    score -= 5;
    feedback.push({ id: 'content-ok', type: 'warning', message: `Content is acceptable (${wordCount} words), but >600 words preferred.` });
  } else {
    feedback.push({ id: 'content-good', type: 'success', message: `Great content length (${wordCount} words).` });
  }

  // 4. Subheadings (H2 / H3 checking)
  const hasSubheadings = /^###? \w+/m.test(blog.content);
  if (!hasSubheadings) {
    score -= 10;
    feedback.push({ id: 'subheadings-missing', type: 'warning', message: 'No subheadings (H2/H3/Markdown) found. Breaking up text improves readability.' });
  } else {
    feedback.push({ id: 'subheadings-good', type: 'success', message: 'Content uses subheadings to break up text.' });
  }

  // 5. Keyword Usage (Optional)
  if (blog.keywords && blog.keywords.length > 0) {
    const primaryKeyword = blog.keywords[0].toLowerCase();
    
    // Title check
    if (!blog.title.toLowerCase().includes(primaryKeyword)) {
      score -= 5;
      feedback.push({ id: 'keyword-title', type: 'warning', message: `Primary keyword "${primaryKeyword}" not found in title.` });
    } else {
      feedback.push({ id: 'keyword-title-good', type: 'success', message: `Primary keyword found in title.` });
    }

    // Excerpt check
    if (blog.excerpt && !blog.excerpt.toLowerCase().includes(primaryKeyword)) {
      score -= 5;
      feedback.push({ id: 'keyword-excerpt', type: 'warning', message: `Primary keyword "${primaryKeyword}" not found in excerpt.` });
    } else if (blog.excerpt) {
      feedback.push({ id: 'keyword-excerpt-good', type: 'success', message: `Primary keyword found in excerpt.` });
    }
  } else {
    feedback.push({ id: 'keyword-missing', type: 'warning', message: 'No focus keywords defined for this blog.' });
  }

  // Score clamping
  score = Math.max(0, Math.min(100, score));

  return { score, feedback };
}
