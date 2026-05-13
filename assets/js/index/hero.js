const slides = document.querySelectorAll('.hero-slide');
let slideAtual = 0;

// troca o slide a cada 5 segundos
setInterval(() => {
    slides[slideAtual].classList.remove('active');
    slideAtual = (slideAtual + 1) % slides.length;
    slides[slideAtual].classList.add('active');
}, 5000);