const track = document.querySelector('.carousel-track');
const setaEsquerda = document.querySelector('.carousel-arrow-left');
const setaDireita = document.querySelector('.carousel-arrow-right');
const cards = document.querySelectorAll('.service-card');

let posicao = 0;
const totalCards = cards.length;

let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

// pega o gap do CSS pra o cálculo não desincronizar se o layout mudar
function getCardWidth() {
    const gap = parseInt(window.getComputedStyle(track).gap);
    return cards[0].offsetWidth + gap;
}

function getCardsVisiveis() {
    return window.innerWidth <= 1024 ? 1 : 3;
}

function atualizarSetas() {
    const maxPosicao = (totalCards - getCardsVisiveis()) * getCardWidth();
    const noInicio = posicao <= 0;
    const noFim = posicao >= maxPosicao;

    setaEsquerda.style.opacity = noInicio ? '0.5' : '1';
    setaEsquerda.style.cursor = noInicio ? 'not-allowed' : 'pointer';
    setaEsquerda.disabled = noInicio;

    setaDireita.style.opacity = noFim ? '0.5' : '1';
    setaDireita.style.cursor = noFim ? 'not-allowed' : 'pointer';
    setaDireita.disabled = noFim;
}

function moverCarrossel(direcao) {
    const cardWidth = getCardWidth();
    const maxPosicao = (totalCards - getCardsVisiveis()) * cardWidth;

    if (direcao === 'direita' && posicao < maxPosicao) {
        posicao += cardWidth;
    } else if (direcao === 'esquerda' && posicao > 0) {
        posicao -= cardWidth;
    }

    track.style.transform = `translateX(-${posicao}px)`;
    atualizarSetas();
}

setaDireita.addEventListener('click', () => moverCarrossel('direita'));
setaEsquerda.addEventListener('click', () => moverCarrossel('esquerda'));

track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
}, { passive: true });

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    touchEndX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', () => {
    if (!isDragging) return;

    const diferencaX = touchStartX - touchEndX;

    // 50px mínimo pra não confundir com scroll vertical
    if (diferencaX > 50) moverCarrossel('direita');
    if (diferencaX < -50) moverCarrossel('esquerda');

    isDragging = false;
    touchStartX = 0;
    touchEndX = 0;
});

window.addEventListener('resize', () => {
    posicao = 0;
    track.style.transform = 'translateX(0)';
    atualizarSetas();
});

atualizarSetas();