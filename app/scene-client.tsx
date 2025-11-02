'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  sceneNumber: number;
  scriptSentence: string;
  prompt: string;
};

export default function SceneClient({ sceneNumber, scriptSentence, prompt }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const placeholder = useMemo(
    () => `https://placehold.co/1024x768/0b0b12/ffffff?text=${encodeURIComponent('Cinematic scene loading?')}`,
    []
  );

  useEffect(() => {
    let canceled = false;
    async function run() {
      try {
        setLoading(true);
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = (await res.json()) as { imageUrl: string };
        if (!canceled) setImageUrl(data.imageUrl);
      } catch (e) {
        console.error(e);
        if (!canceled) {
          setError('Could not generate image. Showing placeholder.');
          setImageUrl(placeholder);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    run();
    return () => {
      canceled = true;
    };
  }, [prompt, placeholder]);

  return (
    <main className="container">
      <header className="header">
        <div className="badge">Scene {sceneNumber}</div>
        <h1 className="title">Gowrie Intrigue</h1>
      </header>

      <section className="script">
        <p className="script-line">{scriptSentence}</p>
      </section>

      <section className="image-wrap">
        <div className="image-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl ?? placeholder}
            alt="Generated cinematic scene"
            onError={(e) => {
              if ((e.currentTarget as HTMLImageElement).src !== placeholder) {
                (e.currentTarget as HTMLImageElement).src = placeholder;
                setError('Primary image failed. Showing placeholder.');
              }
            }}
          />
          {loading && <div className="overlay">Generating?</div>}
        </div>
        {error && <p className="error" role="alert">{error}</p>}
      </section>

      <section className="prompt">
        <h2>Prompt</h2>
        <p>{prompt}</p>
      </section>

      <footer className="footer">
        <span>Built for Vercel ? Next.js App Router</span>
      </footer>
    </main>
  );
}
