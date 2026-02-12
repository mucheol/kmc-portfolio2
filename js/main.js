// ========== Dark Mode ==========
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

function setDarkMode(isDark) {
  if (isDark) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Initialize: check localStorage, then system preference
function initDarkMode() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    setDarkMode(true);
  } else if (stored === 'light') {
    setDarkMode(false);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkMode(true);
  }
}

initDarkMode();

darkModeToggle.addEventListener('click', () => {
  setDarkMode(!html.classList.contains('dark'));
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setDarkMode(e.matches);
  }
});


// ========== Mobile Menu ==========
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

mobileMenuToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');

  if (isOpen) {
    mobileMenu.classList.add('hidden');
    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  } else {
    mobileMenu.classList.remove('hidden');
    menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  });
});


// ========== Active Navigation on Scroll ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);
highlightNav();


// ========== Header Shadow on Scroll ==========
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('shadow-sm');
  } else {
    header.classList.remove('shadow-sm');
  }
});
