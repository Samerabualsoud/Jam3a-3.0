'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

type AnalyticsContextType = {
  isInitialized: boolean;
  isEnabled: boolean;
  trackingId: string;
  enableAnalytics: () => void;
  disableAnalytics: () => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  isInitialized: false,
  isEnabled: false,
  trackingId: '',
  enableAnalytics: () => {},
  disableAnalytics: () => {},
});

export const useAnalyticsContext = () => useContext(AnalyticsContext);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  useEffect(() => {
    const fetchAnalyticsConfig = async () => {
      try {
        const response = await fetch('/api/analytics/config');
        if (!response.ok) throw new Error('Failed to fetch analytics config');
        
        const data = await response.json();
        
        setTrackingId(data.trackingId);
        setIsEnabled(data.active);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading analytics configuration:', error);
        // Fallback to environment variable
        setTrackingId(process.env.NEXT_PUBLIC_GA_ID || 'G-G3N8DYCLBM');
        setIsEnabled(true);
        setIsInitialized(true);
      }
    };

    fetchAnalyticsConfig();
  }, []);

  const enableAnalytics = () => {
    setIsEnabled(true);
    // Save preference to API
    fetch('/api/analytics/config', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: true }),
    }).catch(error => console.error('Error updating analytics config:', error));
  };

  const disableAnalytics = () => {
    setIsEnabled(false);
    // Save preference to API
    fetch('/api/analytics/config', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: false }),
    }).catch(error => console.error('Error updating analytics config:', error));
  };

  return (
    <AnalyticsContext.Provider
      value={{
        isInitialized,
        isEnabled,
        trackingId,
        enableAnalytics,
        disableAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
