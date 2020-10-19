document.addEventListener("keydown", keyPush);
const canvas = document.querySelector("canvas");
const scr = document.querySelector("h1");
const ctx = canvas.getContext("2d");

const tileSize = 50;
const fps = 10;
let SnakePosX = 0;
let SnakeSpeed = tileSize;
let SnakePosY = canvas.height / 2;
let VelocityX = 1;
let VelocityY = 0;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let foodPosX = 0;
let foodPosY = 0;

let score = 0;

let tail = [];

let snakeLength = 3;

let gameIsRunning = true;

function gameLoop() {
    if (gameIsRunning) {
        gameDraw();
        move();
        setTimeout(gameLoop, 1000 / fps);
    } else {
        location.reload();
    }
}

resetFood();
gameLoop();

function move() {
    SnakePosX += SnakeSpeed * VelocityX;
    SnakePosY += SnakeSpeed * VelocityY;

    if (SnakePosX > canvas.width - tileSize) {
        SnakePosX = 0;
    }
    if (SnakePosX < 0) {
        SnakePosX = canvas.width;
    }
    if (SnakePosY > canvas.height - tileSize) {
        SnakePosY = 0;
    }
    if (SnakePosY < 0) {
        SnakePosY = canvas.height;
    }

    snakeCollision();

    tail.push({
        x: SnakePosX,
        y: SnakePosY
    });

    tail = tail.slice(-1 * snakeLength);

    if (SnakePosX == foodPosX && SnakePosY == foodPosY) {
        scr.innerText = ++score;
        snakeLength++;
        resetFood();
    }
}

function snakeCollision() {
    tail.forEach(snakePart => {
        if (SnakePosX === snakePart.x && SnakePosY === snakePart.y) gameIsRunning = false;
    });
}

function drawGrid() {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            rectangle(
                "#CDF692",
                tileSize * i,
                tileSize * j,
                tileSize - 1,
                tileSize - 1
            );
        }
    }
}

function gameDraw() {
    rectangle("green", 0, 0, canvas.width, canvas.height);

    drawGrid();

    tail.forEach(snakePart => {
        rectangle("#48FB00", snakePart.x, snakePart.y, tileSize, tileSize);
    });

    rectangle("#198908", SnakePosX, SnakePosY, tileSize, tileSize);


    rectangle("red", foodPosX, foodPosY, tileSize, tileSize);
}

function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height, tileSize - 1, tileSize - 1);
}

function resetFood() {
    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

    tail.forEach(snakePart => {
        if (snakePart.x === foodPosX && snakePart.y === foodPosY) resetFood();
    });
}

function keyPush(event) {
    switch (event.key) {
        case "w":
            if (VelocityY != 1) {
                VelocityX = 0;
                VelocityY = -1;
            }
            break;
        case "s":
            if (VelocityY != -1) {
                VelocityX = 0;
                VelocityY = 1;
            }
            break;
        case "d":
            if (VelocityX != -1) {
                VelocityX = 1;
                VelocityY = 0;
            }
            break;
        case "a":
            if (VelocityX != 1) {
                VelocityX = -1;
                VelocityY = 0;
            }
            break;
    }
}