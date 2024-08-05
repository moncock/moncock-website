const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 10;
let gameActive = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImage = new Image();
playerImage.src = 'player.png'; // default image

const leftPunchImage = new Image();
leftPunchImage.src = 'left_punch.png';

const rightPunchImage = new Image();
rightPunchImage.src = 'right_punch.png';

const sandbagImages = [
    { rest: new Image(), hit: new Image() },
    { rest: new Image(), hit: new Image() },
    { rest: new Image(), hit: new Image() },
    { rest: new Image(), hit: new Image() },
    { rest: new Image(), hit: new Image() },
    { rest: new Image(), hit: new Image() },
];

sandbagImages[0].rest.src = 'sandbag_stage_0.png';
sandbagImages[0].hit.src = 'sandbag_stage_0_hit.png';
sandbagImages[1].rest.src = 'sandbag_stage_1.png';
sandbagImages[1].hit.src = 'sandbag_stage_1_hit.png';
sandbagImages[2].rest.src = 'sandbag_stage_2.png';
sandbagImages[2].hit.src = 'sandbag_stage_2_hit.png';
sandbagImages[3].rest.src = 'sandbag_stage_3.png';
sandbagImages[3].hit.src = 'sandbag_stage_3_hit.png';
sandbagImages[4].rest.src = 'sandbag_stage_4.png';
sandbagImages[4].hit.src = 'sandbag_stage_4_hit.png';
sandbagImages[5].rest.src = 'sandbag_stage_5.png';
sandbagImages[5].hit.src = 'sandbag_stage_5_hit.png';

let currentPunch = 'left';
let currentSandbagStage = 0;
let currentSandbagImage = sandbagImages[currentSandbagStage].rest;

const player = {
    x: 400,
    y: canvas.height / 2 - 150,
    width: 400,
    height: 400
};

const sandbag = {
    x: 700,
    y: canvas.height / 2 - 50,
    width: 200,
    height: 300
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.y = canvas.height / 2 - 150;
    sandbag.x = canvas.width - 300;
    sandbag.y = canvas.height / 2 - 150;
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        e.preventDefault();
        if (!gameActive) {
            startGame();
        } else {
            punch();
        }
    }
});

function punch() {
    playPunchSound();

    if (currentPunch === 'left') {
        playerImage.src = 'left_punch.png';
        currentPunch = 'right';
    } else {
        playerImage.src = 'right_punch.png';
        currentPunch = 'left';
    }

    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    updateSandbagImage();

    setTimeout(() => {
        currentSandbagImage = sandbagImages[currentSandbagStage].rest;
    }, 100);
}

function playPunchSound() {
    const punchSound = new Audio('punch.mp3');
    punchSound.play();
}

function updateSandbagImage() {
    if (score % 10 === 0 && score <= 50) {
        currentSandbagStage = Math.min(score / 10, 5);
    }
    currentSandbagImage = sandbagImages[currentSandbagStage].hit;
}

function draw() {
    // Fill background with black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Draw sandbag
    ctx.drawImage(currentSandbagImage, sandbag.x, sandbag.y, sandbag.width, sandbag.height);
}

function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 10;
    currentSandbagStage = 0; // Reset sandbag stage
    currentSandbagImage = sandbagImages[currentSandbagStage].rest;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            gameActive = false;
            alert(`Time's up! Your score is ${score}`);
            window.location.reload(); // Refresh the page after the alert
        }
    }, 1000);
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Preload all images to prevent blinking issue
let imagesLoaded = 0;
const totalImages = sandbagImages.length * 2 + 3; // 2 images per stage + 3 player images

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        gameLoop();
    }
}

playerImage.onload = imageLoaded;
leftPunchImage.onload = imageLoaded;
rightPunchImage.onload = imageLoaded;

sandbagImages.forEach(stage => {
    stage.rest.onload = imageLoaded;
    stage.hit.onload = imageLoaded;
});
