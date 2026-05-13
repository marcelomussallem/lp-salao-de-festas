const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuLinks = document.querySelectorAll('.nav-menu ul li a');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// fecha o menu ao clicar em link para não travar a navegação no mobile
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});