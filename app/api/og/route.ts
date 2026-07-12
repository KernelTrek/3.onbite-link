import { NextRequest, NextResponse } from 'next/server';

interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
}

async function extractOGData(url: string): Promise<OGData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    const descriptionMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
    const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

    let title = titleMatch?.[1] || '';
    let description = descriptionMatch?.[1] || '';
    let image = imageMatch?.[1] || '';

    // Fallback to standard meta tags if OG tags not found
    if (!title) {
      const titleTagMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      title = titleTagMatch?.[1] || new URL(url).hostname;
    }

    if (!description) {
      const descTagMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
      description = descTagMatch?.[1] || '';
    }

    return {
      title: title.trim(),
      description: description.trim(),
      image,
      url,
    };
  } catch (error) {
    console.error('Error extracting OG data:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      );
    }

    const ogData = await extractOGData(url);

    return NextResponse.json(ogData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to extract OG data' },
      { status: 500 }
    );
  }
}
