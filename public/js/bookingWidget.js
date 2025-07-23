// @ts-check
/*───────────────────────────────────────────────────────────────
  BRAND-SAFE BOOKING WIDGET – 4 Step Wizard
────────────────────────────────────────────────────────────────*/
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('booking-root');
  if (!root) return;
  root.className = 'min-h-screen flex items-center justify-center bg-[var(--bw-primary)]';

  const css = document.documentElement.style;
  css.setProperty('--bw-primary', root.dataset.bwPrimary || '#243044');
  css.setProperty('--bw-accent', root.dataset.bwAccent || '#FF6A4D');

  root.innerHTML = `
    <div id="bw-card" class="max-w-lg w-[90vw] bg-[var(--porcelain)] rounded-2xl shadow-xl p-8 relative">
      <nav id="bw-steps" class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm font-semibold mb-6"></nav>
      <div id="bw-stage" class="min-h-[200px]"></div>
      <div class="sticky bottom-0 left-0 pb-2 pt-4 bg-[var(--porcelain)]">
        <button id="bw-cta" class="btn-main w-full">Next</button>
      </div>
    </div>`;

  const cta = /** @type {HTMLButtonElement} */(document.getElementById('bw-cta'));
  const stage = document.getElementById('bw-stage');
  const steps = ['Service','Date & Time','Details','Summary'];
  let step = 0;
  const data = { service:'', date:'', time:'', name:'', email:'', phone:'' };

  function renderSteps() {
    const nav = document.getElementById('bw-steps');
    if (!nav) return;
    nav.innerHTML = steps.map((s,i) => `<div class="py-1 ${step===i?'text-[var(--bw-accent)]':'text-gray-500'}">${s}</div>`).join('');
  }

  function loadSlots(date) {
    const wrap = document.getElementById('bw-slots');
    if (!wrap) return;
    wrap.innerHTML = '';
    ['10:00','14:00','18:00'].forEach(t => {
      const b = document.createElement('button');
      b.className = 'btn-slot';
      b.textContent = t;
      b.addEventListener('click', () => {
        data.date = date.toISOString().split('T')[0];
        data.time = t;
        step++;
        render();
      });
      wrap.appendChild(b);
    });
  }

  function renderStage() {
    if (!stage) return;
    switch(step) {
      case 0:
        stage.innerHTML = `
          <div class="space-y-2">
            <button class="btn-slot w-full" data-val="Coaching Session">Coaching Session</button>
            <button class="btn-slot w-full" data-val="Consultation Call">Consultation Call</button>
          </div>`;
        stage.querySelectorAll('.btn-slot').forEach(btn => {
          btn.addEventListener('click', e => {
            const val = /** @type {HTMLElement} */(e.currentTarget).dataset.val || '';
            data.service = val;
            step++;
            render();
          });
        });
        break;
      case 1:
        stage.innerHTML = `
          <div class="grid sm:grid-cols-2 gap-4">
            <div id="bw-calendar"></div>
            <div id="bw-slots" class="grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
          </div>`;
        flatpickr('#bw-calendar', {
          inline: true,
          minDate: new Date(),
          onChange: sel => loadSlots(sel[0])
        });
        break;
      case 2:
        stage.innerHTML = `
          <div class="space-y-4">
            <input id="bw-name" class="input-field" type="text" placeholder="Name" />
            <input id="bw-email" class="input-field" type="email" placeholder="Email" />
            <input id="bw-phone" class="input-field" type="tel" placeholder="Phone" />
          </div>`;
        break;
      case 3:
        stage.innerHTML = `
          <div class="space-y-2">
            <p>Service: ${data.service}</p>
            <p>Date: ${data.date}</p>
            <p>Time: ${data.time}</p>
          </div>`;
        break;
    }
    cta.textContent = step===3 ? 'Pay now' : 'Next';
  }

  function render() {
    renderSteps();
    renderStage();
  }

  function next() {
    if (step===2) {
      data.name  = /** @type {HTMLInputElement} */(document.getElementById('bw-name')).value;
      data.email = /** @type {HTMLInputElement} */(document.getElementById('bw-email')).value;
      data.phone = /** @type {HTMLInputElement} */(document.getElementById('bw-phone')).value;
    }
    if (step < 3) { step++; render(); } else { pay(); }
  }

  cta.addEventListener('click', next);
  render();

  async function pay() {
    const res = await fetch('/api/createStripeSession.js', { method: 'POST' });
    const { sessionId } = await res.json();
    window.location.assign(`https://checkout.stripe.com/pay/${sessionId}`);
  }

  import('ouibounce').then(({ default: ouibounce }) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div id="bw-popup" class="fixed inset-0 bg-black/60 flex items-center justify-center hidden">
        <div class="bg-[var(--porcelain)] text-black p-6 rounded-lg max-w-sm text-center">
          <h3 class="text-lg font-bold mb-2">Wait! 50 % Off</h3>
          <p class="mb-4">Complete your booking now for just AED ${root.dataset.bwDiscount || '75'}.</p>
          <button id="bw-discount" class="btn-main">Claim Discount</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    const popup = document.getElementById('bw-popup');
    if (!popup) return;
    ouibounce(popup, { aggressive: true });
    document.getElementById('bw-discount').addEventListener('click', () => {
      window.location.assign('/discount-link');
    });
  });
});
