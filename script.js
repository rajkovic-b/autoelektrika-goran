// ── COOKIE BANNER ──────────────────────────────
(function() {
    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    
    // Proveri da li je korisnik već prihvatio kolačiće
    if (!localStorage.getItem('cookiesAccepted')) {
        // Prikaži banner sa malim zakašnjenjem
        setTimeout(() => {
            banner.classList.add('show');
        }, 500);
    }
    
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.classList.remove('show');
    });
})();

// ── HAMBURGER MENI ────────────────────────────
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    toggle.textContent = navLinks?.classList.contains('open') ? '✕' : '☰';
});
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.textContent = '☰';
    });
});

// ── FAQ (ISPRAVLJENO: Klik na otvoreno pitanje ga zatvara) ──
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isOpening = !faqItem.classList.contains('open');
        
        // Zatvori sve ostale FAQ stavke
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        
        // Otvori trenutni samo ako prethodno nije bio otvoren
        if (isOpening) {
            faqItem.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ── SCROLL PROGRESS BAR ───────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (window.scrollY / total * 100) + '%';
}, { passive: true });

// ── NAV SHRINK ON SCROLL ──────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── SCROLL REVEAL — ponavlja se svaki put ─────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── RIPPLE EFEKAT NA KARTICAMA ────────────────
document.querySelectorAll('.service-card, .contact-card, .counter-item').forEach(card => {
    card.classList.add('ripple-container');
    card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const wave = document.createElement('div');
        wave.className = 'ripple-wave';
        wave.style.left = (e.clientX - rect.left) + 'px';
        wave.style.top  = (e.clientY - rect.top) + 'px';
        card.appendChild(wave);
        setTimeout(() => wave.remove(), 700);
    });
});

// ── ANIMIRANI BROJAČI ──────────────────────────
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.querySelector('.counter-suffix')?.outerHTML || '';
    let current = 0;
    const increment = target / 60;
    const tick = () => {
        current += increment;
        if (current < target) {
            el.innerHTML = Math.floor(current) + suffix;
            requestAnimationFrame(tick);
        } else {
            el.innerHTML = target + suffix;
        }
    };
    tick();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.counter-number').forEach(animateCounter);
        }
    });
}, { threshold: 0.4 });

const counterSection = document.querySelector('.counter-section');
if (counterSection) counterObserver.observe(counterSection);

// ── STATUS RADNOG VREMENA ──────────────────────
function updateStatus() {
    const now = new Date();
    const day = now.getDay();
    const h = now.getHours();
    const m = now.getMinutes();
    const time = h + m / 60;
    let isOpen = false, text = '';
    if (day >= 1 && day <= 5) {
        if (time >= 8 && time < 17) {
            isOpen = true;
            text = `OTVORENO · Radi još ${Math.round((17 - h) * 60 - m)} min`;
        } else {
            text = 'ZATVORENO · Otvaramo u 08:00';
        }
    } else if (day === 6) {
        text = 'ZATVORENO · Subotom ne radimo';
    } else {
        text = 'ZATVORENO · Otvaramo u ponedeljak';
    }
    const ind = document.getElementById('statusIndicator');
    const txt = document.getElementById('statusText');
    if (!ind || !txt) return;
    ind.className = 'status-indicator ' + (isOpen ? 'status-open' : 'status-closed');
    txt.textContent = text;
}
updateStatus();
setInterval(updateStatus, 60000);

// ── DARK / LIGHT MODE ─────────────────────────
const themeBtn = document.getElementById('themeToggleBtn');
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
}
themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeBtn.textContent = isLight ? '☀️' : '🌓';
});