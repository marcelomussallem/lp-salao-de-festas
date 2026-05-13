const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const galeriaItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0;
const todasImagens = [];

galeriaItems.forEach((item, index) => {
    const img = item.querySelector('img');
    todasImagens.push({ src: img.src, alt: img.alt });

    item.addEventListener('click', () => {
        abrirLightbox(index);
    });
});

function abrirLightbox(index) {
    currentIndex = index;
    lightboxImg.src = todasImagens[index].src;
    lightboxImg.alt = todasImagens[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function proximaImagem() {
    currentIndex++;
    if (currentIndex >= todasImagens.length) currentIndex = 0;
    lightboxImg.src = todasImagens[currentIndex].src;
    lightboxImg.alt = todasImagens[currentIndex].alt;
}

function imagemAnterior() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = todasImagens.length - 1;
    lightboxImg.src = todasImagens[currentIndex].src;
    lightboxImg.alt = todasImagens[currentIndex].alt;
}

lightboxClose.addEventListener('click', fecharLightbox);

// fecha só se clicar no fundo escuro, não na imagem
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    proximaImagem();
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    imagemAnterior();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowRight') proximaImagem();
    if (e.key === 'ArrowLeft') imagemAnterior();
});