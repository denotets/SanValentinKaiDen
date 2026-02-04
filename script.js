/**
 * CONFIGURACIÓN 
 */
const finalImageSrc = 'assets/image.png'; // Imagen de la propuesta
const questionText = '¿Quieres ser mi San Valentín?'; // Pregunta principal
const yesFinalText = 'Te Amo Sabia que Aceptarías'; // Mensaje exacto según requerimiento
const noPhrases = [
    "¿estás segura?",
    "me pondré triste si no aceptas",
    "😔",
    "Piénsalo bien... 🥺",
    "¡No me hagas esto! 💔",
    "¿De verdad? 🧐",
    "Anda, di que sí... ✨"
];

// Estado del juego
let placedPieces = 0;
const totalPieces = 5;
let noClickCount = 0;
let isAccepted = false;

// Elementos del DOM
const pieces = document.querySelectorAll('.puzzle-piece');
const puzzleSection = document.getElementById('puzzle-section');
const proposalSection = document.getElementById('proposal-section');
const successSection = document.getElementById('success-section');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionEl = document.getElementById('question-text');
const successEl = document.getElementById('success-text');
const finalImg = document.getElementById('final-image');
const monitoImg = document.getElementById('monito-image');

// Variables para el rebote del monito
let monitoX = 50;
let monitoY = 50;
let monitoVX = 3;
let monitoVY = 3;
let animationFrameId;

function init() {
    scatterPieces();
    setupEventListeners();
    createFloatingHearts();
}

function scatterPieces() {
    pieces.forEach(piece => {
        // Generar posiciones aleatorias
        const randomX = (Math.random() - 0.5) * 150;
        const randomY = (Math.random() - 0.5) * 150;
        const randomRotate = (Math.random() - 0.5) * 90;

        piece.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        piece.dataset.placed = "false";
    });
}

function setupEventListeners() {
    pieces.forEach(piece => {
        piece.addEventListener('click', () => {
            if (piece.dataset.placed === "false") {
                placePiece(piece);
            }
        });
    });

    // Lógica evasiva para el botón NO
    document.addEventListener('mousemove', (e) => {
        if (proposalSection.classList.contains('active')) {
            const noBtnRect = noBtn.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Centro del botón
            const btnCenterX = noBtnRect.left + noBtnRect.width / 2;
            const btnCenterY = noBtnRect.top + noBtnRect.height / 2;

            // Distancia entre el mouse y el centro del botón
            const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

            // Radio de evasión (80px-140px)
            const escapeRadius = 120;

            if (distance < escapeRadius) {
                moveNoButton();
            }
        }
    });

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Lógica para el botón SÍ
    yesBtn.addEventListener('click', showSuccess);
}

function moveNoButton() {
    // Cambiar texto cíclicamente
    noBtn.textContent = noPhrases[noClickCount % noPhrases.length];
    noClickCount++;

    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    let randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    let randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Evitar que el botón aparezca justo bajo el mouse
    // (Aproximación simple, si está muy cerca de la posición actual, forzar otra)
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';
}

function showSuccess() {
    isAccepted = true;
    proposalSection.classList.remove('active');
    proposalSection.classList.add('hidden');
    
    setTimeout(() => {
        successSection.classList.remove('hidden');
        successSection.classList.add('active');
        successEl.textContent = yesFinalText;
        startConfetti();
        initMonitoBounce();
    }, 500);
}

function placePiece(piece) {
    piece.style.transform = 'translate(0, 0) rotate(0deg)';
    piece.dataset.placed = "true";
    piece.classList.add('placed');
    placedPieces++;

    if (placedPieces === totalPieces) {
        setTimeout(showProposal, 800);
    }
}

function showProposal() {
    puzzleSection.classList.remove('active');
    puzzleSection.classList.add('hidden');
    
    // Configurar contenido
    finalImg.src = finalImageSrc;
    questionEl.textContent = questionText;
    
    setTimeout(() => {
        proposalSection.classList.remove('hidden');
        proposalSection.classList.add('active');
    }, 500);
}

function createFloatingHearts() {
    const container = document.getElementById('background-hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(heart);
    }
}

function startConfetti() {
    const emojis = ['❤️', '💖', '✨', '🌹', '🎉', '🌸', '💘'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

/**
 * Lógica del Monito Rebotando (DVD Bounce)
 */
function initMonitoBounce() {
    // Posición inicial aleatoria
    monitoX = Math.random() * (window.innerWidth - 150);
    monitoY = Math.random() * (window.innerHeight - 150);

    // Velocidades iniciales
    monitoVX = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2);
    monitoVY = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2);

    monitoImg.style.position = 'fixed';
    monitoImg.style.zIndex = '999';
    monitoImg.style.width = '150px'; // Tamaño razonable

    animateMonito();
}

function animateMonito() {
    if (!isAccepted) return;

    monitoX += monitoVX;
    monitoY += monitoVY;

    const imgWidth = monitoImg.offsetWidth;
    const imgHeight = monitoImg.offsetHeight;

    // Colisión con bordes derecho/izquierdo
    if (monitoX + imgWidth >= window.innerWidth || monitoX <= 0) {
        monitoVX *= -1;
        // Ajustar posición para que no se quede pegado
        monitoX = monitoX <= 0 ? 0 : window.innerWidth - imgWidth;
    }

    // Colisión con bordes superior/inferior
    if (monitoY + imgHeight >= window.innerHeight || monitoY <= 0) {
        monitoVY *= -1;
        // Ajustar posición
        monitoY = monitoY <= 0 ? 0 : window.innerHeight - imgHeight;
    }

    monitoImg.style.left = monitoX + 'px';
    monitoImg.style.top = monitoY + 'px';

    animationFrameId = requestAnimationFrame(animateMonito);
}

window.addEventListener('DOMContentLoaded', init);
