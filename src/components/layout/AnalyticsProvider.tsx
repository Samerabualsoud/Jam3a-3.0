'use client';

import { useEffect, useState } from 'react';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analyticsConfig, setAnalyticsConfig] = useState<{
    trackingId: string;
    active: boolean;
    ipAnonymization: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchAnalyticsConfig = async () => {
      try {
        const response = await fetch('/api/analytics/config');
        if (!response.ok) throw new Error('Failed to fetch analytics config');
        
        const data = await response.json();
        setAnalyticsConfig(data);
      } catch (error) {
        console.error('Error loading analytics configuration:', error);
        // Fallback to environment variable
        setAnalyticsConfig({
          trackingId: process.env.NEXT_PUBLIC_GA_ID || 'G-G3N8DYCLBM',
          active: true,
          ipAnonymization: true
        });
      }
    };

    fetchAnalyticsConfig();
  }, []);

  if (!analyticsConfig) return <>{children}</>;

  return (
    <>
      {analyticsConfig.active && (
        <GoogleAnalytics 
          trackingId={analyticsConfig.trackingId} 
          ipAnonymization={analyticsConfig.ipAnonymization} 
        />
      )}
      {children}
    </>
  );
}
