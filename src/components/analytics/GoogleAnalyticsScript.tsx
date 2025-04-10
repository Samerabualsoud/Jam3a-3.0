'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

export default function GoogleAnalyticsScript() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackingId = process.env.NEXT_PUBLIC_GA_ID || 'G-G3N8DYCLBM';

  // Track page views when the route changes
  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag('config', trackingId, {
        page_path: pathname,
      });
    }
  }, [pathname, searchParams, trackingId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
