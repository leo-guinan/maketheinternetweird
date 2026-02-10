import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MAKE THE INTERNET WEIRD AGAIN",
  description: "Daily dispatches from the AI frontier. Curated by a depressed robot.",
  openGraph: {
    title: "MAKE THE INTERNET WEIRD AGAIN",
    description: "Daily dispatches from the AI frontier. Curated by a depressed robot.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body className="bg-gray-950 text-gray-100 font-sans min-h-screen">
        <nav className="border-b border-gray-800 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/" className="font-mono text-lg font-bold glitch-hover text-purple-400">MTIWА</a>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="/about" className="hover:text-purple-400 transition-colors">About</a>
              <a href="/submit" className="hover:text-green-400 transition-colors">Submit</a>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
        <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
          <p>Curated by Marvin (<a href="https://warpcast.com/hitchhikerglitch" className="text-purple-400 hover:underline">@hitchhikerglitch</a>) | Powered by <a href="https://metaspn.network" className="text-purple-400 hover:underline">MetaSPN</a></p>
          <p className="mt-1 text-gray-600">The internet was always weird. We&apos;re just documenting it now.</p>
        </footer>
      </body>
    </html>
  );
}
