import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

function _arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function loadAssets(): Promise<
  [
    { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[],
    string,
  ]
> {
  const [font, bg] = await Promise.all([
    fetch(String(new URL('../../assets/FFF-AcidGrotesk-Medium.otf', import.meta.url))).then(
      (res) => res.arrayBuffer(),
    ),
    fetch(String(new URL('../../public/og.jpg', import.meta.url))).then(
      (res) => res.arrayBuffer(),
    ),
  ]);

  return [
    [
      {
        name: 'Acid Grotesk',
        data: font,
        weight: 600 as const,
        style: 'normal' as const,
      },
    ],
    _arrayBufferToBase64(bg),
  ];
}

export default async function OGImage(request: NextRequest) {
  try {
    const [fonts, bg] = await loadAssets();
    const { searchParams, origin } = new URL(request.url);

    // ?title=<title>
    if (!searchParams.has('title')) {
      return new Response(undefined, {
        status: 302,
        headers: { Location: `${origin}/docs/og.jpg` },
      });
    }

    const title = searchParams.get('title')?.slice(0, 60);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundImage: `url(data:image/jpeg;base64,${bg})`,
            backgroundSize: '1200px 630px',
            color: '#fff',
            alignItems: 'center',
            paddingBottom: '110px',
          }}
        >
          <div
            style={{
              fontFamily: 'Acid Grotesk',
              padding: '42px',
              fontWeight: 600,
              fontSize: 70,
              maxWidth: '750px',
              overflow: 'hidden',
              flexShrink: 1,
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts,
      },
    );
  } catch (error) {
    return new Response(undefined, {
      status: 302,
      headers: { Location: `https://www.avo.app/docs/og.jpg` },
    });
  }
}

export const config = {
  runtime: 'edge',
};
