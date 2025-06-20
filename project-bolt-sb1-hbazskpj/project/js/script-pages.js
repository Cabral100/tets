// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Phone mask
    const phoneInput = document.querySelector('input[name="telefone"]');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            if (value.length < 14) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
        }
        e.target.value = value;
    });

    // Set minimum date to today
    const dateInput = document.querySelector('input[name="data"]');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.nome || !data.telefone || !data.email) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(data.telefone)) {
            showMessage('Por favor, insira um telefone válido.', 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showMessage('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.', 'success');
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Optional: redirect to WhatsApp with pre-filled message
            const whatsappMessage = `Olá! Gostaria de agendar uma visita ao showroom.
Nome: ${data.nome}
Telefone: ${data.telefone}
E-mail: ${data.email}
${data.data ? `Data preferida: ${data.data}` : ''}
${data.horario ? `Horário: ${data.horario}` : ''}
${data.tipo_projeto ? `Tipo de projeto: ${data.tipo_projeto}` : ''}
${data.mensagem ? `Mensagem: ${data.mensagem}` : ''}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);

            setTimeout(() => {
                if (confirm('Deseja ser redirecionado para o WhatsApp para finalizar o agendamento?')) {
                    window.open(`https://wa.me/5511947280000?text=${encodedMessage}`, '_blank');
                }
            }, 2000);

        }, 2000);
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});