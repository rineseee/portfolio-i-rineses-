// Fade-in animation on scroll
const faders = document.querySelectorAll('.section');

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

const icons = ['</>', '{ }', '#', '<>', '()', '&&', '!==', 'let', 'const', 'import', 'return', 'class', '[ ]', '=>{}'];
const container = document.querySelector('.floating-icons-services');

for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.textContent = icons[Math.floor(Math.random() * icons.length)];

    span.style.top = Math.random() * 100 + '%';
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = (8 + Math.random() * 8).toFixed(1) + 's';
    span.style.fontSize = (1.5 + Math.random() * 2) + 'rem';

    container.appendChild(span);
}
//again skills bacground 
const iconsSkills = ['</>', '{}', '#', '()', '<>', '!==', 'let', 'const', 'import', 'sql', '&&', 'api', 'auth'];
const containerSkills = document.querySelector('.floating-icons-skills');

for (let i = 0; i < 25; i++) {
    const span = document.createElement('span');
    span.textContent = iconsSkills[Math.floor(Math.random() * iconsSkills.length)];

    span.style.top = Math.random() * 100 + '%';
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = (6 + Math.random() * 6).toFixed(1) + 's';
    span.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';

    containerSkills.appendChild(span);
}

