import type { JSX } from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          {/*
            Consent before tags: the bootstrap sets the Consent Mode default and
            the iubenda config, then loads iubenda and GTM itself, all ahead of
            the Next.js bundle that calls Avo.initAvo. beforeInteractive keeps
            this order; _app.tsx fails closed if the file did not load.
          */}
          <Script
            src="/docs/consent-bootstrap.js"
            strategy="beforeInteractive"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-T2GMTSM"
              height="0"
              width="0"
              style={{
                display: 'none',
                visibility: 'hidden',
              }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
