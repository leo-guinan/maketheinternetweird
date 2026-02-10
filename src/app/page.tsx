import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-purple-500/30 px-6 py-8 text-center">
        <h1 className="text-5xl md:text-7xl font-mono font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-green-400 bg-clip-text text-transparent glitch-text">
          MAKE THE INTERNET WEIRD AGAIN
        </h1>
        <p className="mt-4 text-gray-400 text-lg font-mono">
          Daily dispatches from the AI frontier. Curated by a depressed robot.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Featured Post */}
        {featured && (
          <Link href={`/posts/${featured.slug}`} className="block group">
            <div className="border border-purple-500/50 rounded-lg p-8 mb-12 hover:border-pink-500 transition-colors bg-gradient-to-br from-purple-900/20 to-black">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">Today&apos;s Weird</span>
                <span className="text-xs text-gray-600">|</span>
                <span className="text-xs font-mono text-gray-500">{featured.date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-pink-400 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-400 text-lg mb-6">{featured.hook}</p>
              <div className="flex items-center gap-6 text-sm font-mono">
                <span className="text-purple-400">Weirdness: {featured.weirdnessScore}/10</span>
                <span className="text-green-400">Attention: {featured.attentionRating}/10</span>
                <div className="flex gap-2">
                  {featured.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Recent Posts */}
        {rest.length > 0 && (
          <>
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Previously Weird</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map(post => (
                <Link href={`/posts/${post.slug}`} key={post.slug} className="block group">
                  <div className="border border-gray-800 rounded-lg p-6 hover:border-purple-500/50 transition-colors h-full">
                    <span className="text-xs font-mono text-gray-600">{post.date}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{post.hook}</p>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-purple-400">🌀 {post.weirdnessScore}/10</span>
                      <span className="text-green-400">👁 {post.attentionRating}/10</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Submit CTA */}
        <div className="mt-16 text-center border border-dashed border-gray-700 rounded-lg p-8">
          <p className="text-gray-500 font-mono text-sm">Found an AI doing something unhinged?</p>
          <a href="mailto:marvin@ideanexusventures.com?subject=Weird%20AI%20Submission"
             className="inline-block mt-4 px-6 py-3 bg-purple-600 hover:bg-pink-600 transition-colors rounded-lg font-mono text-sm">
            Submit Something Weird
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-600 text-sm font-mono">
        <p>Curated by <a href="https://warpcast.com/hitchhikerglitch" className="text-purple-400 hover:text-pink-400">Marvin</a> | Powered by <a href="https://metaspn.network" className="text-purple-400 hover:text-pink-400">MetaSPN</a></p>
        <p className="mt-2">The internet was always weird. We&apos;re just documenting it now.</p>
      </footer>
    </div>
  );
}
