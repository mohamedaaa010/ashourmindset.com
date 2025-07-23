/*───────────────────────────────────────────────────────────────
  BRAND-SAFE BOOKING WIDGET  (vanilla JS + Tailwind)
  Uses flatpickr for the date picker
────────────────────────────────────────────────────────────────*/

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';   // bundler will inline this

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('booking-root');
  if (!root) return;

  /* ─── 1. Theme overrides ─── */
  const css = document.documentElement.style;
  css.setProperty('--bw-primary', root.dataset.bwPrimary || '#243044');
  css.setProperty('--bw-accent',  root.dataset.bwAccent  || '#FF6A4D');

  /* ─── 2. Inject widget markup ─── */
  root.innerHTML = `
    <section class="text-center text-white p-6 rounded-lg"
             style="background: var(--bw-primary)">
      <h2 class="text-2xl font-bold mb-2">
        ${root.dataset.bwHeadline || 'Invest in Your Future'}
      </h2>
      <p class="mb-4">Only AED ${root.dataset.bwPrice || '149'}</p>

      <input id="bw-date"
             type="text"
             class="w-full text-black mb-4 p-2 rounded"
             placeholder="Select a date" />

      <button id="bw-pay"
              class="bg-[var(--bw-accent)] text-white px-4 py-2 rounded">
        Book Now
      </button>
    </section>
  `;

  /* ─── 3. Initialise flatpickr (next 14 days) ─── */
  const today   = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14);

  flatpickr('#bw-date', {
    minDate: today,
    maxDate,
    disableMobile: true,
    dateFormat: 'Y-m-d',
  });

  /* ─── 4. Stripe skeleton ─── */
  document.getElementById('bw-pay').addEventListener('click', async () => {
    const res = await fetch('/api/createStripeSession.js', { method: 'POST' });
    const { sessionId } = await res.json();
    window.location = `https://checkout.stripe.com/pay/${sessionId}`;
  });

  /* ─── 5. Exit-intent popup via ouibounce ─── */
  import('ouibounce').then(({ default: ouibounce }) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div id="bw-popup"
           class="fixed inset-0 bg-black/60 flex items-center justify-center hidden">
        <div class="bg-white p-6 rounded-lg max-w-sm text-center">
          <h3 class="text-lg font-bold mb-2">Wait! 50 % Off</h3>
          <p class="mb-4">
            Complete your booking now for just AED
            ${root.dataset.bwDiscount || '75'}.
          </p>
          <button id="bw-discount"
                  class="bg-[var(--bw-accent)] text-white px-4 py-2 rounded">
            Claim Discount
          </button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    ouibounce(document.getElementById('bw-popup'), { aggressive: true });

    document.getElementById('bw-discount').addEventListener('click', () => {
      window.location = '/discount-link'; // TODO: replace with real link
    });
  });
});
