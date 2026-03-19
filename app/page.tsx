"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setImages([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setImages(data.images);
      }
    } catch {
      setError("Request failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Image Generator
          </h1>
          <p className="text-gray-400 text-lg">
            Describe anything, generate in seconds
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-8">
          <textarea
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500 transition-colors"
            rows={3}
            placeholder="A futuristic city at sunset, cyberpunk style..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-colors self-end"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-700 rounded-xl text-red-300">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="w-full aspect-square bg-gray-800 rounded-2xl animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">Generating your image...</div>
          </div>
        )}

        {/* Images */}
        {images.length > 0 && (
          <div className="grid gap-4">
            {images.map((url, i) => (
              <div key={i} className="relative group rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Generated image ${i + 1}`}
                  className="w-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={url}
                    download={`ai-image-${i + 1}.webp`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
