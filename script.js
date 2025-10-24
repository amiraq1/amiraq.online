// ========== التمرير السلس للروابط ==========
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

// ========== تفعيل الرابط النشط في القائمة ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function activateNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ========== معالجة إرسال النموذج ==========
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع البيانات
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // هنا يمكنك إضافة كود لإرسال البيانات إلى خادم أو خدمة
        console.log('Form submitted:', formData);
        
        // عرض رسالة نجاح
        alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
        
        // إعادة تعيين النموذج
        this.reset();
    });
}

// ========== تأثير الظهور عند التمرير ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// تطبيق التأثير على العناصر
document.querySelectorAll('.card, .service-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== تحسين الأداء - Lazy Loading للصور ==========
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback للمتصفحات القديمة
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========== عداد للأرقام (إذا أضفت قسم إحصائيات) ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========== حماية من النسخ (اختياري) ==========
// يمكنك تفعيل هذا إذا أردت حماية المحتوى
/*
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('عذراً، النسخ غير مسموح');
});
*/

// ========== تحسين تجربة المستخدم ==========
// إضافة تأثير التحميل
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// إخفاء شاشة التحميل إذا وجدت
const loader = document.querySelector('.loader');
if (loader) {
    window.addEventListener('load', function() {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });
}

// ========== معلومات المطور ==========
console.log('%c🌐 amiraq.online', 'font-size: 20px; color: #4F46E5; font-weight: bold;');
console.log('%cWebsite developed with ❤️', 'font-size: 14px; color: #6B7280;');
console.log('%c© 2025 All rights reserved', 'font-size: 12px; color: #9CA3AF;');

