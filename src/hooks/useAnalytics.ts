'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type EventOptions = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export const useAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views when the route changes
  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  }, [pathname, searchParams]);

  // Function to track custom events
  const trackEvent = ({ category, action, label, value }: EventOptions) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Function to track user interactions
  const trackInteraction = (elementId: string, interactionType: string) => {
    trackEvent({
      category: 'User Interaction',
      action: interactionType,
      label: elementId,
    });
  };

  // Function to track ecommerce events
  const trackEcommerce = (
    action: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase',
    products: any[],
    value?: number
  ) => {
    if (window.gtag) {
      window.gtag('event', action, {
        currency: 'USD',
        value: value || products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0),
        items: products.map(p => ({
          item_id: p.id,
          item_name: p.name,
          price: p.price,
          quantity: p.quantity || 1,
          item_category: p.category,
        })),
      });
    }
  };

  return {
    trackEvent,
    trackInteraction,
    trackEcommerce,
  };
};
