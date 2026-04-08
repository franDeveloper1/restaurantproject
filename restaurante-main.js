/* ============================================
   LA ORILLA — restaurante-main.js
   ============================================ */

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== HAMBURGER / MOBILE NAV ===== */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

function openMobile() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMobile() : openMobile();
});

if (mobileClose) mobileClose.addEventListener('click', closeMobile);

/* ===== SCROLL REVEAL ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
        .forEach(el => revealObs.observe(el));

/* Stagger (menu cards, reviews, etc.) */
const staggerObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stagger').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 100);
      });
      staggerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.menu-panel, .reviews-grid, .gallery-mosaic, .menu-grid')
        .forEach(el => staggerObs.observe(el));

/* ===== MENU TABS ===== */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Update tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update panels
    document.querySelectorAll('.menu-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const targetPanel = document.getElementById('tab-' + target);
    if (targetPanel) {
      targetPanel.classList.add('active');

      // Re-trigger stagger for newly visible cards
      targetPanel.querySelectorAll('.stagger').forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    }
  });
});

/* ===== RESERVA FORM → WHATSAPP ===== */
function enviarReserva() {
  const nombre     = document.getElementById('nombre')?.value.trim();
  const telefono   = document.getElementById('telefono')?.value.trim();
  const fecha      = document.getElementById('fecha')?.value;
  const hora       = document.getElementById('hora')?.value;
  const comensales = document.getElementById('comensales')?.value;
  const ocasion    = document.getElementById('ocasion')?.value;
  const notas      = document.getElementById('notas')?.value.trim();

  if (!nombre || !fecha || !hora || !comensales) {
    alert('Por favor completá los campos obligatorios: nombre, fecha, horario y cantidad de personas.');
    return;
  }

  let msg = `¡Hola! Quiero hacer una reserva en La Orilla.\n\n`;
  msg += `👤 Nombre: ${nombre}\n`;
  if (telefono) msg += `📞 Teléfono: ${telefono}\n`;
  msg += `📅 Fecha: ${fecha}\n`;
  msg += `🕐 Horario: ${hora}\n`;
  msg += `👥 Comensales: ${comensales}\n`;
  if (ocasion) msg += `🎉 Ocasión: ${ocasion}\n`;
  if (notas)   msg += `📝 Notas: ${notas}\n`;

  const url = `https://wa.me/5493794282762?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* Expose globally for inline onclick */
window.enviarReserva = enviarReserva;
window.closeMobile   = closeMobile;
