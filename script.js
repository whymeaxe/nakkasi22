// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Cart & Account
let cartCount = 0;
function toggleCart() {
    showToast(`Cart: ${cartCount} item(s). Cart feature coming soon.`);
}
function toggleAccount() {
    showToast('Sign in feature coming soon.');
}

// Carousel
function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    carousel.scrollBy({ left: direction * 340, behavior: 'smooth' });
}

// Newsletter
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showToast(`Thank you! ${email} added to our inner circle.`);
    e.target.reset();
}

// Bespoke request
function requestBespoke(product) {
    showToast(`Bespoke request initiated for: ${product}`);
    setTimeout(() => window.location.href = 'bespoke.html', 1500);
}

// Bespoke form
function handleBespoke(e) {
    e.preventDefault();
    showToast('Your private consultation request has been received. Our concierge will contact you within 24 hours.');
    e.target.reset();
}

// Filter products
function filterProducts() {
    showToast('Filters applied to collection.');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add subtle fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .product-card, .testi, .artisan').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all .6s ease';
    observer.observe(el);
});