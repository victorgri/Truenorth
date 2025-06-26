const navLinks = document.getElementById('nav-links');

document.getElementById('menu-open').addEventListener('click', () => {
    navLinks.classList.add('active');
});

document.getElementById('menu-close').addEventListener('click', () => {
    navLinks.classList.remove('active');
});
