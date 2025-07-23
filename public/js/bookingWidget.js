// @ts-check
/*───────────────────────────────────────────────────────────────
  BRAND-SAFE BOOKING WIDGET – Enhanced 4 Step Wizard
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
      <nav id="bw-steps" class="grid grid-cols-4 gap-2 text-center text-sm font-semibold mb-6"></nav>
      <div id="bw-stage" class="min-h-[220px]"></div>
      <div class="sticky bottom-0 left-0 pb-2 pt-4 bg-[var(--porcelain)]">
        <button id="bw-cta" class="btn-main w-full" disabled>Next</button>
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
    nav.innerHTML = steps.map((s,i) => {
      return `<div class="bw-step${step===i?' active':''}">${s}</div>`;
    }).join('');
  }

  function setCTAState(enabled) {
    cta.disabled = !enabled;
  }

  function selectService(val) {
    data.service = val;
    setCTAState(true);
  }

  function loadSlots(date) {
    const m = document.getElementById('bw-morning');
    const a = document.getElementById('bw-afternoon');
    if (!m || !a) return;
    m.innerHTML = '';
    a.innerHTML = '';
    const morning = ['09:00','09:30','10:00','10:30','11:00'];
    const afternoon = ['14:00','14:30','15:00','15:30','16:00'];
    const add = (wrap,t) => {
      const b = document.createElement('button');
      b.className = 'btn-slot';
      b.textContent = t;
      b.addEventListener('click', () => {
        data.date = date.toISOString().split('T')[0];
        data.time = t;
        setCTAState(true);
      });
      wrap.appendChild(b);
    };
    morning.forEach(t => add(m,t));
    afternoon.forEach(t => add(a,t));
  }

  function renderStage() {
    if (!stage) return;
    setCTAState(false);
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
            selectService(val);
          });
        });
        break;
      case 1:
        stage.innerHTML = `
          <div class="grid sm:grid-cols-2 gap-4">
            <div id="bw-calendar"></div>
            <div>
              <div class="slot-group"><h4 class="slot-heading">Morning</h4><div id="bw-morning" class="slot-wrap"></div></div>
              <div class="slot-group mt-4"><h4 class="slot-heading">Afternoon</h4><div id="bw-afternoon" class="slot-wrap"></div></div>
            </div>
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
            <input id="bw-name" class="input-field" type="text" placeholder="Name" required />
            <input id="bw-email" class="input-field" type="email" placeholder="Email" required />
            <input id="bw-phone" class="input-field" type="tel" placeholder="Phone" required />
          </div>`;
        stage.querySelectorAll('input').forEach(inp => {
          inp.addEventListener('input', validateForm);
        });
        validateForm();
        break;
      case 3:
        stage.innerHTML = `
          <table class="bw-summary w-full mb-4 text-left text-sm">
            <tr><th class="pr-2">Service:</th><td>${data.service}</td></tr>
            <tr><th class="pr-2">Date:</th><td>${data.date}</td></tr>
            <tr><th class="pr-2">Time:</th><td>${data.time}</td></tr>
            <tr><th class="pr-2">Name:</th><td>${data.name}</td></tr>
            <tr><th class="pr-2">Email:</th><td>${data.email}</td></tr>
            <tr><th class="pr-2">Phone:</th><td>${data.phone}</td></tr>
            <tr><th class="pr-2">Redeem Package:</th>
              <td><select id="bw-package" class="input-field mt-1">
                    <option value="">None</option>
                    <option>5 Sessions</option>
                    <option>10 Sessions</option>
                  </select></td></tr>
            <tr class="font-semibold"><th>Total Price:</th><td id="bw-price">${root.dataset.bwPrice || 'AED 150'}</td></tr>
          </table>`;
        setCTAState(true);
        cta.textContent = 'Book Appointment';
        break;
    }
    if(step<3) cta.textContent='Next';
  }

  function validateForm() {
    const name  = /** @type {HTMLInputElement} */(document.getElementById('bw-name'));
    const email = /** @type {HTMLInputElement} */(document.getElementById('bw-email'));
    const phone = /** @type {HTMLInputElement} */(document.getElementById('bw-phone'));
    if(!name || !email || !phone) return;
    const valid = name.value.trim() && email.checkValidity() && phone.value.trim();
    setCTAState(valid);
  }

  function collectForm() {
    data.name  = /** @type {HTMLInputElement} */(document.getElementById('bw-name')).value.trim();
    data.email = /** @type {HTMLInputElement} */(document.getElementById('bw-email')).value.trim();
    data.phone = /** @type {HTMLInputElement} */(document.getElementById('bw-phone')).value.trim();
  }

  function render() {
    renderSteps();
    renderStage();
  }

  function next() {
    if(step===0 && data.service){ step++; render(); return; }
    if(step===1 && data.date && data.time){ step++; render(); return; }
    if(step===2){ collectForm(); if(cta.disabled) return; step++; render(); return; }
    if(step===3){ pay(); }
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
