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
  const [inter, bg] = await Promise.all([
    fetch(String(new URL('../../assets/inter-bold.ttf', import.meta.url))).then(
      (res) => res.arrayBuffer(),
    ),
    fetch(String(new URL('../../assets/og-bg.jpg', import.meta.url))).then(
      (res) => res.arrayBuffer(),
    ),
  ]);

  return [
    [
      {
        name: 'Inter',
        data: inter,
        weight: 700 as const,
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            backgroundImage: `url(data:image/jpeg;base64,${bg})`,
            backgroundSize: '1200px 630px',
            color: '#fff',
            paddingTop: '60px',
          }}
        >
          <div
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              textAlign: 'center',
              padding: '8px 24px 6px 24px',
              borderRadius: '100px',
              backgroundColor: 'rgba(72, 207, 173, 0.07)',
              color: 'rgba(72, 207, 173, 1)',
              fontSize: 18,
              letterSpacing: '2px',
              flexShrink: 0,
            }}
          >
            AVO DOCUMENTATION
          </div>
          <div
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 80,
              padding: '15px 100px 30px',
              textAlign: 'center',
              maxHeight: '320px',
              overflow: 'hidden',
              flexShrink: 1,
            }}
          >
            {title}
          </div>
          <div style={{ height: 100, flexShrink: 0, flexGrow: 0 }} />
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
