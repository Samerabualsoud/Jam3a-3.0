import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  trackingId: string;
  ipAnonymization?: boolean;
}

export default function GoogleAnalytics({ 
  trackingId, 
  ipAnonymization = true 
}: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize GA when component mounts
    if (typeof window !== 'undefined' && trackingId) {
      // Send initial pageview
      window.gtag?.('config', trackingId, {
        anonymize_ip: ipAnonymization,
        page_path: window.location.pathname,
      });
    }
  }, [trackingId, ipAnonymization]);

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
              anonymize_ip: ${ipAnonymization},
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
