import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  weirdnessScore: number;
  attentionRating: number;
  tags: string[];
  hook: string;
  source?: string;
  thumbnail?: string;
  content: string;
  htmlContent?: string;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const fileContents = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      date: data.date,
      weirdnessScore: data.weirdnessScore,
      attentionRating: data.attentionRating,
      tags: data.tags || [],
      hook: data.hook || '',
      source: data.source,
      thumbnail: data.thumbnail,
      content,
    };
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
  const file = files.find(f => f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '') === slug);
  if (!file) return undefined;
  const fileContents = fs.readFileSync(path.join(postsDirectory, file), 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title,
    date: data.date,
    weirdnessScore: data.weirdnessScore,
    attentionRating: data.attentionRating,
    tags: data.tags || [],
    hook: data.hook || '',
    source: data.source,
    thumbnail: data.thumbnail,
    content,
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
