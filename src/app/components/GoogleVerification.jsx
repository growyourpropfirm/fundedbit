// Create a new component: components/GoogleVerification.jsx
'use client';

import Script from 'next/script';

export default function GoogleVerification() {
  return (
    <Script
      id="google-verification"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var meta = document.createElement('meta');
            meta.name = 'google-site-verification';
            meta.content = '6hae6Nulsu85ZtPPvT9re1wq3PSeubVJpb9iWkGATek';
            document.getElementsByTagName('head')[0].appendChild(meta);
          })();
        `,
      }}
    />
  );
}