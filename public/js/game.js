'use client';

(function () {
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
    playerImage.src = './images/player.png'; // default image

    const leftPunchImage = new Image();
    leftPunchImage.src = './images/left_punch.png';

    const rightPunchImage = new Image();
    rightPunchImage.src = './images/right_punch.png';

    const sandbagImages = [
        {
            rest: './images/sandbag_stage_0.png',
            hit: './images/sandbag_stage_0_hit.png'
        },
        {
            rest: './images/sandbag_stage_1.png',
            hit: './images/sandbag_stage_1_hit.png'
        },
        {
            rest: './images/sandbag_stage_2.png',
            hit: './images/sandbag_stage_2_hit.png'
        },
        {
            rest: './images/sandbag_stage_3.png',
            hit: './images/sandbag_stage_3_hit.png'
        },
        {
            rest: './images/sandbag_stage_4.png',
            hit: './images/sandbag_stage_4_hit.png'
        },
        {
            rest: './images/sandbag_stage_5.png',
            hit: './images/sandbag_stage_5_hit.png'
        }
    ];

    let currentPunch = 'left';
    let currentSandbagStage = 0;
    let currentSandbagImage = new Image();
    currentSandbagImage.src = sandbagImages[currentSandbagStage].rest;

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
        player.y = canvas.height / 2;
        sandbag.x = canvas.width - 300;
        sandbag.y = canvas.height / 2;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
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
            playerImage.src = './images/left_punch.png';
            currentPunch = 'right';
        } else {
            playerImage.src = './images/right_punch.png';
            currentPunch = 'left';
        }

        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        updateSandbagImage();

        setTimeout(() => {
            currentSandbagImage.src = sandbagImages[currentSandbagStage].rest;
        }, 100);
    }

    function playPunchSound() {
        const punchSound = new Audio('./audio/punch.mp3');
        punchSound.play();
    }

    function updateSandbagImage() {
        if (score % 10 === 0 && score <= 50) {
            currentSandbagStage = Math.min(score / 10, 5);
        }
        currentSandbagImage.src = sandbagImages[currentSandbagStage].hit;
    }

    function draw() {
        // Fill background with black
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw player
        ctx.drawImage(
            playerImage,
            player.x,
            player.y,
            player.width,
            player.height
        );

        // Draw sandbag
        ctx.drawImage(
            currentSandbagImage,
            sandbag.x,
            sandbag.y,
            sandbag.width,
            sandbag.height
        );
    }

    function startGame() {
        gameActive = true;
        score = 0;
        timeLeft = 10;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        const countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                gameActive = false;
                alert(`Time's up! Your score is ${score}`);
                playerImage.src = './images/player.png'; // Reset to default image
            }
        }, 1000);
    }

    function gameLoop() {
        draw();
        requestAnimationFrame(gameLoop);
    }

    playerImage.onload = () => {
        gameLoop();
    };
})();
