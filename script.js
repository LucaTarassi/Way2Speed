const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

// Header + mobile menu
const header = qs('.site-header');
const toggle = qs('.mobile-toggle');
const mobile = qs('.mobile-menu');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 35), { passive: true });
toggle?.addEventListener('click', () => {
  const open = mobile.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
qsa('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  mobile.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('in'));
}, { threshold: .13 });
qsa('.reveal').forEach(el => io.observe(el));

// Section mouse-reactive light
qsa('.section').forEach(section => {
  section.addEventListener('pointermove', e => {
    const r = section.getBoundingClientRect();
    section.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    section.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  });
});

// Procedural spiral path
const path = qs('#spiral-path');
if (path) {
  const pts = [];
  const cx = 250, cy = 250;
  for (let t = 0; t < Math.PI * 16; t += .06) {
    const r = 3.2 * t;
    pts.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]);
  }
  path.setAttribute('d', pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' '));
}

// Subtle 3D tilt
qsa('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', e => {
    if (matchMedia('(pointer:coarse)').matches) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(1000px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

// Glitchy text scramble
const glyphs = 'W2S#%&<>/\\01∆◌⌁';
qsa('[data-scramble]').forEach(el => {
  const original = el.textContent;
  el.addEventListener('mouseenter', () => {
    let f = 0;
    const timer = setInterval(() => {
      el.textContent = original.split('').map((c, i) => {
        if (c === ' ') return ' ';
        return i < f ? c : glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join('');
      f += .65;
      if (f >= original.length) {
        clearInterval(timer);
        el.textContent = original;
      }
    }, 35);
  });
});

// Cursor plasma trail
const canvas = qs('#fx');
const ctx = canvas.getContext('2d');
let dpr = Math.min(devicePixelRatio || 1, 2);
let w = 0, h = 0;
let particles = [];
function resize() {
  w = innerWidth; h = innerHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener('resize', resize);
window.addEventListener('pointermove', e => {
  if (matchMedia('(pointer:coarse)').matches) return;
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: e.clientX + (Math.random() - .5) * 8,
      y: e.clientY + (Math.random() - .5) * 8,
      vx: (Math.random() - .5) * .7,
      vy: (Math.random() - .5) * .7,
      life: 1,
      r: 2 + Math.random() * 7,
      hue: Math.random() > .5 ? 180 : 350
    });
  }
});
function tick() {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  particles = particles.filter(p => p.life > .02);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.life *= .94;
    p.r *= .992;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue} 95% 60% / ${p.life * .12})`;
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tick();
