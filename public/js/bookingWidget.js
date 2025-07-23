// @ts-check
/*───────────────────────────────────────────────────────────────
  BRAND-SAFE BOOKING WIDGET – 4 Step Wizard
────────────────────────────────────────────────────────────────*/
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('booking-root');
  if (!root) return;

  const css = document.documentElement.style;
  css.setProperty('--bw-primary', root.dataset.bwPrimary || '#243044');
  css.setProperty('--bw-accent', root.dataset.bwAccent || '#FF6A4D');

  root.innerHTML = `
    <div id="bw-card" class="max-w-lg w-[90vw] md:w-full mx-auto rounded-2xl shadow-xl bg-[var(--porcelain)] p-8 relative">
      <nav id="bw-steps" class="grid grid-cols-2 sm:flex sm:justify-between text-sm mb-6">
        <span data-step="0" class="step-label font-semibold text-[var(--bw-accent)]">Service</span>
        <span data-step="1" class="step-label opacity-50">Date &amp; Time</span>
        <span data-step="2" class="step-label opacity-50">Basic Details</span>
        <span data-step="3" class="step-label opacity-50">Summary</span>
      </nav>
      <div id="bw-stage"></div>
      <div id="bw-footer" class="sticky bottom-0 left-0 right-0 bg-[var(--porcelain)] pb-2 pt-4 flex justify-between gap-2">
        <button id="bw-back" class="btn-main hidden px-4">Go Back</button>
        <button id="bw-next" class="btn-main flex-grow">Next</button>
      </div>
    </div>`;

  const stage = /** @type {HTMLDivElement} */(document.getElementById('bw-stage'));
  const next = /** @type {HTMLButtonElement} */(document.getElementById('bw-next'));
  const back = /** @type {HTMLButtonElement} */(document.getElementById('bw-back'));
  const labels = /** @type {NodeListOf<HTMLSpanElement>} */(document.querySelectorAll('.step-label'));

  let step = 0;
  let date = '';
  let slot = '';
  const details = { name: '', email: '', phone: '' };

  function updateNav() {
    labels.forEach(l => {
      const active = +l.dataset.step === step;
      l.classList.toggle('font-semibold', active);
      l.classList.toggle('text-[var(--bw-accent)]', active);
      l.classList.toggle('opacity-50', !active);
    });
    back.classList.toggle('hidden', step === 0);
    next.textContent = step === 3 ? 'Pay now' :
      step === 2 ? 'Next: Summary' :
      step === 1 ? 'Next: Basic Details' : 'Next: Date & Time';
  }

  function buildService() {
    stage.innerHTML = `
      <h2 class="text-xl font-bold mb-4">${root.dataset.bwHeadline || 'Invest in Your Future'}</h2>
      <ul class="mb-4 list-disc pl-4 text-sm">
        <li>1-hour private coaching</li>
        <li>Actionable growth plan</li>
        <li>Follow-up resources</li>
      </ul>
      <p class="mb-6">Price: <b>AED ${root.dataset.bwPrice || '149'}</b></p>`;
    next.disabled = false;
  }

  function buildDateTime() {
    stage.innerHTML = `
      <h2 class="text-xl font-bold mb-4">Select date &amp; time</h2>
      <div class="flex flex-col md:flex-row gap-4">
        <div id="cal" class="flex-grow"></div>
        <div id="slots" class="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow"></div>
      </div>`;
    const today = new Date();
    const max = new Date();
    max.setMonth(today.getMonth() + 3);
    flatpickr('#cal', {
      inline: true,
      minDate: today,
      maxDate: max,
      onChange: ([d]) => {
        date = d.toISOString().split('T')[0];
        populateSlots();
      }
    });
    next.disabled = true;
  }

  function populateSlots() {
    const wrap = document.getElementById('slots');
    if (!wrap) return;
    const times = ['09:00', '11:30', '13:00', '15:00'];
    wrap.innerHTML = times.map(t => `<button data-t="${t}" class="btn-slot">${t}</button>`).join('');
    wrap.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('button').forEach(b => b.classList.remove('bg-[var(--bw-accent)]', 'text-white'));
        btn.classList.add('bg-[var(--bw-accent)]', 'text-white');
        slot = btn.dataset.t || '';
        next.disabled = false;
      });
    });
  }

  function buildDetails() {
    stage.innerHTML = `
      <h2 class="text-xl font-bold mb-4">Your details</h2>
      <input id="fn" class="input-field mb-3" placeholder="Full name" />
      <input id="em" class="input-field mb-3" placeholder="Email" />
      <input id="ph" class="input-field" placeholder="Phone" />`;
    next.disabled = true;
    stage.querySelectorAll('input').forEach(i => {
      i.addEventListener('input', () => {
        const values = [...stage.querySelectorAll('input')].map(inp => inp.value.trim());
        next.disabled = values.some(v => !v);
      });
    });
  }

  function buildSummary() {
    details.name = /** @type {HTMLInputElement} */(document.getElementById('fn')).value;
    details.email = /** @type {HTMLInputElement} */(document.getElementById('em')).value;
    details.phone = /** @type {HTMLInputElement} */(document.getElementById('ph')).value;
    stage.innerHTML = `
      <h2 class="text-xl font-bold mb-4">Summary</h2>
      <p class="mb-2"><b>Date:</b> ${date}</p>
      <p class="mb-2"><b>Time:</b> ${slot}</p>
      <p class="mb-6"><b>Total:</b> AED ${root.dataset.bwPrice || '149'}</p>`;
    next.disabled = false;
  }

  function render() {
    updateNav();
    if (step === 0) buildService();
    if (step === 1) buildDateTime();
    if (step === 2) buildDetails();
    if (step === 3) buildSummary();
  }

  async function pay() {
    const res = await fetch('/api/createStripeSession.js', {
      method: 'POST',
      body: JSON.stringify({ date, time: slot, ...details })
    });
    const { sessionId } = await res.json();
    window.location.assign(`https://checkout.stripe.com/pay/${sessionId}`);
  }

  next.addEventListener('click', () => {
    if (step === 3) pay();
    else if (!next.disabled) { step++; render(); }
  });

  back.addEventListener('click', () => { if (step > 0) { step--; render(); } });

  render();

  import('ouibounce').then(({ default: ouibounce }) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div id="bw-popup" class="fixed inset-0 bg-black/60 flex items-center justify-center hidden">
        <div class="bg-[var(--porcelain)] p-6 rounded-2xl max-w-sm text-center shadow-xl">
          <h3 class="text-lg font-bold mb-2">Wait! 50 % Off</h3>
          <p class="mb-4">Complete your booking now for just AED ${root.dataset.bwDiscount || '75'}.</p>
          <button id="bw-discount" class="btn-main px-8">Claim discount</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    const popup = document.getElementById('bw-popup');
    if (!popup) return;
    ouibounce(popup, { aggressive: true });
    document.getElementById('bw-discount')?.addEventListener('click', () => {
      window.location.assign('/discount-link');
    });
  });
});
