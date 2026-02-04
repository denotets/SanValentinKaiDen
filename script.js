/**
 * INSTRUCCIONES DE PERSONALIZACIÓN:
 * 1. finalImageSrc: Cambia la URL por una foto tuya y de tu pareja.
 * 2. questionText: Puedes cambiar la pregunta (ej. "¿Quieres ser mi novia?").
 * 3. yesFinalText: El mensaje que aparece tras aceptar.
 * 4. noPhrases: Lista de frases que rotarán en el botón "No".
 */

/**
 * CONFIGURACIÓN 
 */
// Cambiamos la imagen final por la foto proporcionada en la carpeta del proyecto
// Usamos una ruta relativa para que el navegador la cargue correctamente.
const finalImageSrc = 'assets/image.png'; // Imagen de la propuesta
const questionText = '¿Quieres ser mi San Valentín?'; // Pregunta principal
const yesFinalText = 'Te Amo Sabía que Aceptarías'; // Mensaje al decir que SÍ
const noPhrases = [
    "¿Estás segura? 🥺",
    "Piénsalo bien... 😔",
    "Me pondré triste... 😭",
    "¡No me hagas esto! 💔",
    "Mira el perrito triste: 🐶",
    "¿De verdad? 🧐",
    "Anda, di que sí... ✨"
];

// Estado del juego
let placedPieces = 0;
const totalPieces = 5;
let noClickCount = 0;

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

function init() {
    scatterPieces();
    setupEventListeners();
    createFloatingHearts();
}

function scatterPieces() {
    pieces.forEach(piece => {
        // Generar posiciones aleatorias
        // Como el viewBox es 100x100, nos movemos en un rango que los disperse
        const randomX = (Math.random() - 0.5) * 150; // -75 a 75
        const randomY = (Math.random() - 0.5) * 150; // -75 a 75
        const randomRotate = (Math.random() - 0.5) * 90; // -45 a 45 grados

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

    // Lógica para el botón NO
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Lógica para el botón SÍ
    yesBtn.addEventListener('click', showSuccess);
}

function moveNoButton() {
    // Cambiar texto
    noBtn.textContent = noPhrases[noClickCount % noPhrases.length];
    noClickCount++;

    // Calcular posición aleatoria
    // Obtener dimensiones de la ventana y el botón
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    // Generar coordenadas aleatorias dentro del viewport
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Aplicar posición fija para que se mueva por toda la pantalla
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';
}

function showSuccess() {
    proposalSection.classList.remove('active');
    proposalSection.classList.add('hidden');
    
    setTimeout(() => {
        successSection.classList.remove('hidden');
        successSection.classList.add('active');
        successEl.textContent = yesFinalText;
        startConfetti();
        startBouncing();
    }, 500);
}

function startBouncing() {
    const monito = document.querySelector('.monito-wrapper');
    if (!monito) return;

    monito.style.position = 'fixed';
    monito.style.margin = '0';

    let monitoX = Math.random() * (window.innerWidth - 200);
    let monitoY = Math.random() * (window.innerHeight - 200);
    let monitoVX = 4;
    let monitoVY = 4;

    function animate() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            monito.style.position = 'relative';
            monito.style.margin = '20px auto';
            return;
        }

        monitoX += monitoVX;
        monitoY += monitoVY;

        // Colisión con bordes derecho/izquierdo
        if (monitoX + monito.offsetWidth >= window.innerWidth || monitoX <= 0) {
            monitoVX *= -1;
            monitoX = monitoX <= 0 ? 0 : window.innerWidth - monito.offsetWidth;
        }

        // Colisión con bordes superior/inferior
        if (monitoY + monito.offsetHeight >= window.innerHeight || monitoY <= 0) {
            monitoVY *= -1;
            monitoY = monitoY <= 0 ? 0 : window.innerHeight - monito.offsetHeight;
        }

        monito.style.left = monitoX + 'px';
        monito.style.top = monitoY + 'px';

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function placePiece(piece) {
    piece.style.transform = 'translate(0, 0) rotate(0deg)';
    piece.dataset.placed = "true";
    piece.classList.add('placed');
    placedPieces++;

    if (placedPieces === totalPieces) {
        setTimeout(showProposal, 1000);
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

        // Limpiar el DOM después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

window.addEventListener('DOMContentLoaded', init);

