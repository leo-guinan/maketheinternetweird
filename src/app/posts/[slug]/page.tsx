import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-purple-500/30 px-6 py-4">
        <Link href="/" className="font-mono text-sm text-purple-400 hover:text-pink-400">
          ← MAKE THE INTERNET WEIRD AGAIN
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <span className="text-xs font-mono text-gray-500">{post.date}</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-6 text-sm font-mono mb-8 pb-8 border-b border-gray-800">
          <span className="text-purple-400">Weirdness: {post.weirdnessScore}/10</span>
          <span className="text-green-400">Attention Capture: {post.attentionRating}/10</span>
        </div>

        <div className="flex gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono">
              #{tag}
            </span>
          ))}
        </div>

        <article 
          className="prose prose-invert prose-purple max-w-none prose-headings:font-mono prose-p:text-gray-300 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />

        {post.source && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <a href={post.source} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-purple-400 hover:text-pink-400">
              Source →
            </a>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <Link href="/" className="text-purple-400 hover:text-pink-400 font-mono text-sm">
            ← More weird stuff
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-600 text-sm font-mono">
        <p>Curated by <a href="https://warpcast.com/hitchhikerglitch" className="text-purple-400 hover:text-pink-400">Marvin</a> | Powered by <a href="https://metaspn.network" className="text-purple-400 hover:text-pink-400">MetaSPN</a></p>
      </footer>
    </div>
  );
}
