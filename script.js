// ========== التمرير السلس للروابط ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== تفعيل الرابط النشط في القائمة ==========
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function activateNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
}

window.addEventListener('scroll', activateNavLink);
activateNavLink();

// ========== تأثير الظهور عند التمرير ==========
const animatedSelectors = [
    '.solution-card',
    '.step',
    '.metric-card',
    '.pricing-card',
    '.testimonial-card',
    '.faq-item',
    '.stat',
    '.detail'
];

const animatedElements = document.querySelectorAll(animatedSelectors.join(', '));

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(35px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// ========== شريط التنقل عند التمرير ==========
const header = document.querySelector('header');
function toggleHeaderShadow() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', toggleHeaderShadow);
toggleHeaderShadow();

// ========== الأسئلة الشائعة ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            }
        });

        if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        } else {
            item.classList.remove('active');
            answer.style.maxHeight = null;
        }
    });
});

// افتراض فتح السؤال الأول بشكل افتراضي
if (faqItems.length) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstAnswer = firstItem.querySelector('.faq-answer');
    if (firstAnswer) {
        firstAnswer.style.maxHeight = `${firstAnswer.scrollHeight}px`;
    }
}

// ========== معالجة إرسال نموذج التواصل ==========
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = {
            name: contactForm.querySelector('#name')?.value || '',
            company: contactForm.querySelector('#company')?.value || '',
            email: contactForm.querySelector('#email')?.value || '',
            phone: contactForm.querySelector('#phone')?.value || '',
            goal: contactForm.querySelector('#goal')?.value || '',
            message: contactForm.querySelector('#message')?.value || ''
        };

        console.groupCollapsed('%c📬 GamsGo Contact Form', 'color: #5B21B6; font-weight: bold;');
        console.log(formData);
        console.groupEnd();

        alert('شكرًا لاهتمامك بـ GamsGo! سيتواصل معك فريقنا خلال 24 ساعة.');
        contactForm.reset();
    });
}

// ========== معلومات المطور ==========
console.log('%c⚡ GamsGo', 'font-size: 18px; color: #5B21B6; font-weight: bold;');
console.log('%cWebsite crafted with focus on growth experiences.', 'font-size: 14px; color: #64748B;');

