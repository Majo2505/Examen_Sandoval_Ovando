document.addEventListener('DOMContentLoaded', () => {
    setupServiceFilter();
    setupContactFormValidation();
    setupMobileMenu();
    setupBackToTop();
});

function setupServiceFilter() {
    const buttons = document.querySelectorAll('.btn--filter');
    const cards = document.querySelectorAll('.service-card');
    const countText = document.getElementById('services-count');

    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedFilter = button.dataset.category;

            buttons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            let visibleCount = 0;
            cards.forEach((card) => {
                const category = card.dataset.category;
                const shouldShow = selectedFilter === 'all' || selectedFilter === category;
                card.classList.toggle('hidden', !shouldShow);
                if (shouldShow) visibleCount++;
            });

            if (countText) {
                countText.textContent = `Mostrando ${visibleCount} servicio(s)`;
            }
        });
    });
}

function setupContactFormValidation() {
    const form = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('close-success');

    if (!form || !successModal) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const servicio = document.getElementById('servicio');
        const mensaje = document.getElementById('mensaje');

        let isValid = true;

        [nombre, email, servicio, mensaje].forEach(input => {
            if (input) input.style.borderColor = '';
        });

        if (nombre.value.trim().length < 3) {
            isValid = false;
            nombre.style.borderColor = '#e74c3c';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            isValid = false;
            email.style.borderColor = '#e74c3c';
        }

        if (servicio.value === "") {
            isValid = false;
            servicio.style.borderColor = '#e74c3c';
        }

        if (mensaje.value.trim().length < 10) {
            isValid = false;
            mensaje.style.borderColor = '#e74c3c';
        }

        if (isValid) {
            successModal.classList.remove('hidden');
            successModal.style.display = 'flex';
            form.reset();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            successModal.classList.add('hidden');
            successModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.add('hidden');
            successModal.style.display = 'none';
        }
    });
}

function setupMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

function setupBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}