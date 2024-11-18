var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
const GAME_WIDTH = 256;
const GAME_HEIGHT = 256;
const PADDLE_WIDTH = 40;
const PADDLE_HEIGHT = 8;
const PADDLE_SPEED = 20;
var gameStart = false;
var lastTime = 0;
var gameOver = false;
var score = 0;
var paddle = {
    x: GAME_WIDTH/2 - PADDLE_WIDTH/2,
    y: GAME_HEIGHT - PADDLE_HEIGHT,
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    speed: 0,
    movL: 0,
    movR: 0
};

/************* SUPPORT FUNCTIONS *************/


/************* MAIN FUNCTIONS *************/

function input() {
    document.addEventListener("keydown", (event)=> {
        if (!gameOver) {
            if (event.key == 'ArrowRight') {
                paddle.movR = PADDLE_SPEED;
            }
            if (event.key == 'ArrowLeft') {
                paddle.movL = -PADDLE_SPEED;
            }
        }
    })

    document.addEventListener("keyup", (event)=> {
        if (!gameOver) {
            if (event.key == 'ArrowRight') {
                paddle.movR = 0;
            }
            if (event.key == 'ArrowLeft') {
                paddle.movL = 0;
            }
        }
    })
}

function update(deltaTime) {
    paddle.speed = 0;
    paddle.speed = paddle.movR + paddle.movL;
    paddle.x += paddle.speed * deltaTime;

}

function draw(deltaTime) {
    //ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'white'
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function gameLoop(timestamp) {
    var deltaTime = (timestamp - lastTime)/100; 
    lastTime = timestamp;
    input();
    update(deltaTime);
    draw(deltaTime);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);