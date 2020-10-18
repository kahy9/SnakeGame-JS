const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const SnakeSize = 50;
const SnakePosX = 0;
const SnakePosY = canvas.height / 2 - SnakeSize / 2;

function gameLoop() {
    gameDraw();
}

function gameDraw() {
    rectangle("white", 0, 0, canvas.width, canvas.height);
    rectangle("black", SnakePosX, SnakePosY, SnakeSize, SnakeSize);
}

function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

gameLoop();