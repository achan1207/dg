const ball = document.getElementById('ball');
const playerPaddle = document.getElementById('playerPaddle');
const aiPaddle = document.getElementById('aiPaddle');
const gameContainer = document.querySelector('.game-container');

let ballX = 290;
let ballY = 190;
let ballSpeedX = 3;
let ballSpeedY = 3;

let playerPaddleY = 160;
let aiPaddleY = 160;

// Player paddle movement
document.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    playerPaddleY = Math.max(0, Math.min(mouseY - playerPaddle.offsetHeight / 2, gameContainer.offsetHeight - playerPaddle.offsetHeight));
    playerPaddle.style.top = `${playerPaddleY}px`;
});

// Update game frame
function update() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with walls
    if (ballY <= 0 || ballY + ball.offsetHeight >= gameContainer.offsetHeight) {
        ballSpeedY *= -1;
    }

    // Ball collision with paddles
    if (
        (ballX <= playerPaddle.offsetLeft + playerPaddle.offsetWidth &&
            ballY + ball.offsetHeight >= playerPaddleY &&
            ballY <= playerPaddleY + playerPaddle.offsetHeight) ||
        (ballX + ball.offsetWidth >= aiPaddle.offsetLeft &&
            ballY + ball.offsetHeight >= aiPaddleY &&
            ballY <= aiPaddleY + aiPaddle.offsetHeight)
    ) {
        ballSpeedX *= -1;
    }

    // AI paddle movement
    const aiCenter = aiPaddleY + aiPaddle.offsetHeight / 2;
    if (aiCenter < ballY) aiPaddleY += 2;
    else if (aiCenter > ballY) aiPaddleY -= 2;
    aiPaddleY = Math.max(0, Math.min(aiPaddleY, gameContainer.offsetHeight - aiPaddle.offsetHeight));
    aiPaddle.style.top = `${aiPaddleY}px`;

    // Reset ball if it goes out
    if (ballX <= 0 || ballX + ball.offsetWidth >= gameContainer.offsetWidth) {
        ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
        ballY = gameContainer.offsetHeight / 2 - ball.offsetHeight / 2;
        ballSpeedX *= -1; // Reverse direction
    }

    // Update ball position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(update);
}

update();
