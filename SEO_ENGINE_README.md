# Neti Academy SEO Scoring Engine

This document explains the logic behind the automated SEO Analysis Engine built into the Neti Academy platform. The engine evaluates static content (such as Mind Blogs and Daily Current Affairs) to ensure they are optimized for search engines like Google.

## What is an "Excerpt"?

An **excerpt** is a short, descriptive summary of your blog post or article. 

In the context of SEO, the excerpt acts as the **Meta Description**. When someone searches for a topic on Google, the search results display a blue clickable title and a small block of text underneath it. That small block of text is the excerpt.

### Why is the Excerpt Important?
1. **Click-Through Rate (CTR):** It serves as your "elevator pitch." A compelling excerpt convinces the user to click on your link instead of a competitor's.
2. **Search Indexing:** Search engines read the meta description to understand what your page is about to serve it to the right audiences.
3. **Social Media Previews:** When you paste your blog link into WhatsApp, Telegram, or Twitter, the preview card that pops up uses the excerpt as the summary text.

---

## How the Scoring Engine Works

The analyzer function (located in `src/utils/seoAnalyzer.ts`) begins with a perfect score of **100**. It runs your content through a series of heuristic checks. If your content violates SEO best practices, points are deducted, and a specific feedback message is tied to the blog.

### The Metrics Analyzed

#### 1. Title Length
Search engines truncate (cut off with `...`) titles that are too long, and titles that are too short often lack keyword focus.
- **Ideal:** Between 40 and 60 characters.
- **Scoring:** 
  - If `< 40` characters: `-10 points` (Warning)
  - If `> 60` characters: `-10 points` (Warning)
  - If `40-60` characters: No penalty (Success)

#### 2. Excerpt / Meta Description Length
Search engines typically display about 155-160 characters of a meta description. 
- **Ideal:** Between 120 and 160 characters.
- **Scoring:**
  - If missing entirely: `-20 points` (Error)
  - If `< 120` characters: `-10 points` (Warning)
  - If `> 160` characters: `-10 points` (Warning)
  - If `120-160` characters: No penalty (Success)

#### 3. Word Count (Content Depth)
Google ranks "thin content" poorly. Comprehensive, authoritative content generally performs better in search algorithms.
- **Ideal:** A minimum of 300 words is standard, though 600+ is preferred for long-form content.
- **Scoring:**
  - If `< 300` words: `-15 points` (Error: Content is too thin)
  - If `300 - 600` words: `-5 points` (Warning: Acceptable but could be longer)
  - If `> 600` words: No penalty (Success)

#### 4. Subheadings (Formatting)
Search engine crawler bots look for `H2` and `H3` tags to understand the hierarchical structure of a document. It also vastly improves human readability.
- **Ideal:** The presence of at least one subheading (e.g., Markdown `##` or `###`).
- **Scoring:**
  - If no subheadings are detected via Regex: `-10 points` (Warning)
  - If detected: No penalty (Success)

#### 5. Keyword Density (Optional Schema)
If the data objects in your codebase incorporate a `keywords: ["string"]` array, the engine will extract the primary (first) keyword and verify its presence.
- **Ideal:** The primary keyword should exist in both the Title and the Excerpt.
- **Scoring:**
  - If the primary keyword is missing from the title: `-5 points`
  - If the primary keyword is missing from the excerpt: `-5 points`

---

## The Dashboard Interface

The UI (`SEODashboard.tsx`) utilizes the output of this engine to give you visual feedback:

- 🟢 **Green (Score 80-100):** Excellent. The content is well-optimized.
- 🟡 **Yellow (Score 50-79):** Needs improvement. Likely suffering from short content or missing formatting.
- 🔴 **Red (Score < 50):** Poor optimization. Missing critical elements like excerpts.

By utilizing this internal dashboard, you can audit your static files before deploying, ensuring maximum visibility on the web.
