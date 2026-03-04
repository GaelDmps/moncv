// Révélation au scroll des éléments avec .reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Gestion du thème (clair par défaut, sombre en option)
const rootEl = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'cv-theme';

function applyTheme(theme) {
  rootEl.setAttribute('data-theme', theme);
  if (toggleBtn) {
    const label = theme === 'dark' ? 'Thème clair' : 'Thème sombre';
    const emoji = theme === 'dark' ? '☀️' : '🌙';
    toggleBtn.innerHTML = emoji + ' <span class="theme-toggle__label">' + label + '</span>';
    toggleBtn.setAttribute('title', theme === 'dark' ? 'Basculer en mode clair' : 'Basculer en mode sombre');
    toggleBtn.setAttribute('aria-label', toggleBtn.getAttribute('title'));
    toggleBtn.setAttribute('aria-pressed', theme === 'dark');
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = saved || 'light';
  applyTheme(preferred);
}

function toggleTheme() {
  const current = rootEl.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', toggleTheme);
}

initTheme();

// Calcul automatique de l'âge
function calculerAge(dateNaissance) {
  const aujourdHui = new Date();
  let age = aujourdHui.getFullYear() - dateNaissance.getFullYear();
  const mois = aujourdHui.getMonth() - dateNaissance.getMonth();
  const jour = aujourdHui.getDate() - dateNaissance.getDate();

  if (mois < 0 || (mois === 0 && jour < 0)) {
    age--;
  }

  return age;
}

const dateNaissance = new Date(2002, 7, 30); // 30/08/2002 (mois = 7 car janvier = 0)
const age = calculerAge(dateNaissance);

const ageLeftEl = document.getElementById('age-left');
const ageRightEl = document.getElementById('age-right');

if (ageLeftEl) ageLeftEl.textContent = age;
if (ageRightEl) ageRightEl.textContent = age;