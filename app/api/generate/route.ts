import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    const safePrompt = (prompt ?? 'Cinematic scene').slice(0, 500);

    // Primary: public prompt-to-image service (no auth). May be slow/unreliable sometimes.
    const primary = `https://image.pollinations.ai/prompt/${encodeURIComponent(safePrompt)}?nologo=true&size=1024x768`;

    // Fallback: static placeholder that always works.
    const fallback = `https://placehold.co/1024x768/0b0b12/ffffff?text=${encodeURIComponent('Cinematic placeholder')}`;

    // We simply return the primary; client swaps to fallback on error.
    return Response.json({ imageUrl: primary, fallbackUrl: fallback }, { status: 200 });
  } catch (e) {
    return Response.json(
      { error: 'Invalid request', imageUrl: `https://placehold.co/1024x768?text=Placeholder` },
      { status: 400 }
    );
  }
}
