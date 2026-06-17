// ── MENÚ: marcar el link activo según la sección visible ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// ── APARECER AL HACER SCROLL ────────────────────────────
// IntersectionObserver avisa cuando un elemento entra en pantalla
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // ya apareció, no hace falta seguir mirándolo
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── CONTADORES (años de experiencia, proyectos, etc.) ──
function animateCounter(el) {
  const target = +el.dataset.target; // número final, ej: 30
  let current = 0;
  const timer = setInterval(() => {
    current++;
    el.textContent = current + (target >= 10 ? '+' : '');
    if (current >= target) clearInterval(timer);
  }, 60);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.num[data-target]').forEach(el => counterObserver.observe(el));

// ── BARRAS DE PROGRESO (sección "Aprendiendo") ──────────
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.pct + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bar-fill').forEach(b => barObserver.observe(b));

// ── CARRUSEL DE FOTOS DE BÁSQUET ─────────────────────────
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.cdot');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

let current = 0;
const total = track.children.length;

function goTo(index) {
  current = (index + total) % total; // si te pasás del límite, vuelve al principio/final
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

// Avanza sola cada 4 segundos
setInterval(() => goTo(current + 1), 4000);

// ── FORMULARIO DE CONTACTO ───────────────────────────────
function handleSend() {
  const btn = document.getElementById('sendBtn');
  const msg = document.getElementById('successMsg');

  btn.classList.add('loading'); // muestra los 3 puntitos de "cargando"

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.textContent = 'Mensaje enviado ✓';
    btn.disabled = true;
    msg.style.display = 'block';
  }, 1600);
}