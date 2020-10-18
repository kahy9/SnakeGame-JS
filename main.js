document.addEventListener("keydown", keyPush);


const canvas = document.querySelector("canvas");
const scr = document.querySelector("h1");
const ctx = canvas.getContext("2d");
const tileSize = 50;
const fps = 15;
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

function gameLoop() {
    gameDraw();
    move();
    setTimeout(gameLoop, 1000 / fps);
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

    tail.push({
        x: SnakePosX,
        y: SnakePosY
    });

    if (SnakePosX == foodPosX && SnakePosY == foodPosY) {
        scr.innerText = ++score;
        resetFood();
    }



}

function drawGrid() {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            rectangle(
                "blue",
                tileSize * i,
                tileSize * j,
                tileSize - 1,
                tileSize - 1
            );
        }
    }
}

function gameDraw() {
    rectangle("white", 0, 0, canvas.width, canvas.height);

    drawGrid();

    tail.forEach(snakePart => {
        rectangle("gray", snakePart.x, snakePart.y, tileSize, tileSize);
    });

    rectangle("black", SnakePosX, SnakePosY, tileSize, tileSize);


    rectangle("red", foodPosX, foodPosY, tileSize, tileSize);

    //if(tail.length > snakeLength) tail.pop();
}

function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height, tileSize - 1, tileSize - 1);
}

function resetFood() {
    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
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