import { base44 } from '@/api/base44Client';

// Fire-and-forget phone click tracking. Must never block or break the call itself.
export function trackPhoneClick(source, number) {
  try {
    base44.entities.PhoneClick.create({
      source,
      number: number || '',
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    }).catch(() => {});
  } catch (e) {
    // swallow: analytics must never interfere with the user action
  }
}
