import ouibounce from 'ouibounce';
import { Calendar } from 'meeting-js';

// Wait for DOM to load before initializing
window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('booking-root');
  if (!root) return;

  // Apply overrides from data attributes
  const { primary, accent, coralCoverage } = root.dataset;
  if (primary) document.documentElement.style.setProperty('--clr-navy', primary);
  if (accent) document.documentElement.style.setProperty('--clr-coral', accent);

  // Enforce brand rules
  const invalidPrimary = primary && primary !== 'var(--navy)' && primary !== 'var(--clr-navy)';
  const invalidAccent = accent && accent !== 'var(--coral)' && accent !== 'var(--clr-coral)';
  if (invalidPrimary && invalidAccent) {
    console.error('Brand colors must include --navy or --coral');
    return;
  }
  if (parseFloat(coralCoverage) > 12) {
    console.warn('Coral accent over recommended 12% coverage');
  }

  // Render limited calendar using meeting-js
  const cal = new Calendar({ range: 14 });
  cal.render(root);

  // Book Now handler → create Stripe session
  const btn = root.querySelector('[data-book-now]');
  if (btn) {
    btn.addEventListener('click', async () => {
      try {
        const res = await fetch('/api/createStripeSession', { method: 'POST' });
        const { url } = await res.json();
        if (url) window.location.href = url;
      } catch (err) {
        console.error('Checkout error', err);
      }
    });
  }

  // Trigger MailerLite popup on exit intent
  ouibounce(null, {
    aggressive: true,
    callback: () => window.MailerLite?.showPopup?.(),
  });
});

export {};
